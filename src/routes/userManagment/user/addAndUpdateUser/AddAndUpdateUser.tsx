'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm, type FieldErrors } from 'react-hook-form'
import { toast } from 'sonner'
import {
    useCreateStaffUser,
    useGetUser,
    useUpdateUser,
} from '@/src/routes/userManagment/hooks/user'
import StepperStatus from '@/src/shared/components/StepperStatus/StepperStatus'
import type { StepperStatusStep } from '@/src/shared/components/StepperStatus/types'
import { Button } from '@/src/shared/components/ui/button'
import { Spinner } from '@/src/shared/components/ui/spinner'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/src/shared/components/ui/Tabs'
import AddressForm from '../createNewUser/components/AddressForm'
import BankInfo from '../createNewUser/components/BankInfo'
import DocumentsForm from '../createNewUser/components/DocumentsForm'
import EmergencyForm from '../createNewUser/components/EmergencyForm'
import IdentityForm from '../createNewUser/components/IdentityForm'
import OccupationInfo from '../createNewUser/components/OccupationInfo'
import SecurityAndRole from '../createNewUser/components/SecurityAndRole'
import { NewUserProvider } from '../createNewUser/provider/NewUserProvider'
import {
    NEW_USER_DEFAULT_VALUES,
    editUserFormSchema,
    newUserFormSchema,
    type NewUserFormValues,
} from '../createNewUser/schema'
import { toCreateStaffUserRequest } from '../createNewUser/utils/toCreateStaffUserRequest'
import {
    toInitialDocuments,
    toUpdateUserRequest,
    toUserFormValues,
} from './utils/toUserFormValues'

const FormSteps = {
    identity: 'identity',
    ADDRESS: 'address',
    emergencyContact: 'emergencyContact',
    bankInfo: 'bankInfo',
    securityAndRole: 'securityAndRole',
    occupationInfo: 'occupationInfo',
    documents: 'documents',
} as const

type FormStep = (typeof FormSteps)[keyof typeof FormSteps]

const CREATE_USER_STEPS: StepperStatusStep[] = [
    { id: FormSteps.identity, label: 'اطلاعات هویتی', status: 'pending' },
    { id: FormSteps.ADDRESS, label: 'آدرس', status: 'not_reached' },
    {
        id: FormSteps.emergencyContact,
        label: 'تماس اضطراری',
        status: 'not_reached',
    },
    { id: FormSteps.bankInfo, label: 'اطلاعات بانکی', status: 'not_reached' },
    {
        id: FormSteps.securityAndRole,
        label: 'امنیت و نقش',
        status: 'not_reached',
    },
    {
        id: FormSteps.occupationInfo,
        label: 'اطلاعات شغلی',
        status: 'not_reached',
    },
    { id: FormSteps.documents, label: 'مدارک', status: 'not_reached' },
]

const STEP_ORDER: FormStep[] = [
    FormSteps.identity,
    FormSteps.ADDRESS,
    FormSteps.emergencyContact,
    FormSteps.bankInfo,
    FormSteps.securityAndRole,
    FormSteps.occupationInfo,
    FormSteps.documents,
]

const collectErrorMessages = (errors: FieldErrors): string[] => {
    const messages: string[] = []

    const walk = (value: unknown) => {
        if (!value || typeof value !== 'object') return

        const record = value as Record<string, unknown>
        if (typeof record.message === 'string' && record.message) {
            messages.push(record.message)
        }

        Object.entries(record).forEach(([key, entry]) => {
            if (key === 'ref' || key === 'message' || key === 'type') return
            walk(entry)
        })
    }

    walk(errors)
    return [...new Set(messages)]
}

const toFormSteps = (activeStep: FormStep): StepperStatusStep[] => {
    const activeIndex = CREATE_USER_STEPS.findIndex(
        (step) => step.id === activeStep
    )

    return CREATE_USER_STEPS.map((step, index) => ({
        ...step,
        status:
            index < activeIndex
                ? 'complete'
                : index === activeIndex
                  ? 'pending'
                  : 'not_reached',
    }))
}

type AddAndUpdateUserProps = {
    id?: string
}

const AddAndUpdateUser = ({ id }: AddAndUpdateUserProps) => {
    const { push } = useRouter()
    const isEdit = Boolean(id)
    const { data: user, isPending: isLoadingUser } = useGetUser(
        id ?? '',
        isEdit
    )
    const { mutate: createStaffUser, isPending: isCreating } =
        useCreateStaffUser()
    const { mutate: updateUser, isPending: isUpdating } = useUpdateUser()
    const isPending = isCreating || isUpdating

    const [formStep, setFormStep] = useState<StepperStatusStep[]>(() =>
        toFormSteps(FormSteps.identity)
    )

    const activeStep = formStep.find((step) => step.status === 'pending')?.id

    const goBack = () => {
        const index = STEP_ORDER.indexOf(activeStep as FormStep)
        if (index <= 0) return
        setFormStep(toFormSteps(STEP_ORDER[index - 1]))
    }

    const methods = useForm<NewUserFormValues>({
        resolver: zodResolver(isEdit ? editUserFormSchema : newUserFormSchema),
        defaultValues: NEW_USER_DEFAULT_VALUES,
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    })

    useEffect(() => {
        if (!user) return
        methods.reset(toUserFormValues(user))
    }, [user, methods])

    const validationErrors = collectErrorMessages(methods.formState.errors)

    const onSubmit = (values: NewUserFormValues) => {
        if (isEdit && id) {
            updateUser(
                {
                    userId: id,
                    body: toUpdateUserRequest(values),
                },
                {
                    onSuccess: () => {
                        toast.success('کاربر به‌روزرسانی شد')
                        push(
                            `/admin/user-management/user-details/${encodeURIComponent(id)}`
                        )
                    },
                }
            )
            return
        }

        createStaffUser(toCreateStaffUserRequest(values), {
            onSuccess: () => {
                toast.success('کاربر ایجاد شد')
                push('/admin/user-management?sub=user')
            },
        })
    }

    if (isEdit && isLoadingUser) {
        return (
            <div className='flex justify-center py-16'>
                <Spinner className='size-6' />
            </div>
        )
    }

    if (isEdit && !user) {
        return (
            <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                دریافت اطلاعات کاربر با خطا مواجه شد.
            </div>
        )
    }

    return (
        <NewUserProvider
            userId={id}
            initialDocuments={user ? toInitialDocuments(user) : []}
        >
            <FormProvider {...methods}>
                {isEdit ? (
                    <form
                        className='mx-auto flex w-full flex-col gap-6 rounded-card-lg bg-surface-container-lowest p-4 sm:max-w-[1000px]'
                        dir='rtl'
                        onSubmit={methods.handleSubmit(onSubmit)}
                    >
                        <Tabs defaultValue='identity' dir='rtl' className='w-full'>
                            <TabsList className='w-full justify-start overflow-x-auto overflow-y-hidden'>
                                <TabsTrigger value='identity'>
                                    اطلاعات هویتی
                                </TabsTrigger>
                                <TabsTrigger value='address'>نشانی</TabsTrigger>
                                <TabsTrigger value='emergency'>
                                    مخاطبین ضروری
                                </TabsTrigger>
                                <TabsTrigger value='bank'>اطلاعات بانکی</TabsTrigger>
                                <TabsTrigger value='security'>امنیت و نقش</TabsTrigger>
                                <TabsTrigger value='occupation'>
                                    اطلاعات شغلی
                                </TabsTrigger>
                                <TabsTrigger value='documents'>مدارک</TabsTrigger>
                            </TabsList>

                            <TabsContent value='identity' className='pt-4'>
                                <IdentityForm />
                            </TabsContent>
                            <TabsContent value='address' className='pt-4'>
                                <AddressForm />
                            </TabsContent>
                            <TabsContent value='emergency' className='pt-4'>
                                <EmergencyForm />
                            </TabsContent>
                            <TabsContent value='bank' className='pt-4'>
                                <BankInfo />
                            </TabsContent>
                            <TabsContent value='security' className='pt-4'>
                                <SecurityAndRole />
                            </TabsContent>
                            <TabsContent value='occupation' className='pt-4'>
                                <OccupationInfo />
                            </TabsContent>
                            <TabsContent value='documents' className='pt-4'>
                                <DocumentsForm />
                            </TabsContent>
                        </Tabs>

                        <Button
                            type='submit'
                            variant='primary'
                            size='lg'
                            className='w-full text-label-lg'
                            isLoading={isPending}
                            disabled={isPending}
                        >
                            ذخیره تغییرات
                        </Button>
                    </form>
                ) : (
                    <div
                        className='mx-auto flex w-full max-w-7/8 flex-col gap-6'
                        dir='rtl'
                    >
                        <StepperStatus steps={formStep} indexBased />

                        <div className='mx-auto w-full pt-3'>
                            {activeStep === FormSteps.identity && (
                                <IdentityForm
                                    onContinue={() =>
                                        setFormStep(
                                            toFormSteps(FormSteps.ADDRESS)
                                        )
                                    }
                                />
                            )}
                            {activeStep === FormSteps.ADDRESS && (
                                <AddressForm
                                    onBack={goBack}
                                    onContinue={() =>
                                        setFormStep(
                                            toFormSteps(
                                                FormSteps.emergencyContact
                                            )
                                        )
                                    }
                                />
                            )}
                            {activeStep === FormSteps.emergencyContact && (
                                <EmergencyForm
                                    onBack={goBack}
                                    onContinue={() =>
                                        setFormStep(
                                            toFormSteps(FormSteps.bankInfo)
                                        )
                                    }
                                />
                            )}
                            {activeStep === FormSteps.bankInfo && (
                                <BankInfo
                                    onBack={goBack}
                                    onContinue={() =>
                                        setFormStep(
                                            toFormSteps(
                                                FormSteps.securityAndRole
                                            )
                                        )
                                    }
                                />
                            )}
                            {activeStep === FormSteps.securityAndRole && (
                                <SecurityAndRole
                                    onBack={goBack}
                                    onContinue={() =>
                                        setFormStep(
                                            toFormSteps(
                                                FormSteps.occupationInfo
                                            )
                                        )
                                    }
                                />
                            )}
                            {activeStep === FormSteps.occupationInfo && (
                                <OccupationInfo
                                    onBack={goBack}
                                    onContinue={() =>
                                        setFormStep(
                                            toFormSteps(FormSteps.documents)
                                        )
                                    }
                                />
                            )}
                            {activeStep === FormSteps.documents && (
                                <>
                                    <DocumentsForm />
                                    {validationErrors.length > 0 && (
                                        <ul className='mb-3 list-disc rounded-container-lg bg-warning-container px-6 py-3 text-warning'>
                                            {validationErrors.map((message) => (
                                                <li
                                                    key={message}
                                                    className='text-label-md text-warning'
                                                >
                                                    {message}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <div className='flex flex-row-reverse gap-3'>
                                        <Button
                                            type='button'
                                            variant='primary'
                                            size='lg'
                                            className='w-full text-label-lg'
                                            disabled={isPending}
                                            onClick={methods.handleSubmit(
                                                onSubmit
                                            )}
                                        >
                                            {isPending ? (
                                                <Spinner className='size-4' />
                                            ) : (
                                                'ثبت کاربر'
                                            )}
                                        </Button>
                                        <Button
                                            type='button'
                                            variant='outline'
                                            size='lg'
                                            className='text-label-lg'
                                            disabled={isPending}
                                            onClick={goBack}
                                        >
                                            بازگشت
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </FormProvider>
        </NewUserProvider>
    )
}

export default AddAndUpdateUser
