'use client'

import IconButton from '@/src/shared/components/ui/IconButton'
import { Button } from '@/src/shared/components/ui/button'
import { Spinner } from '@/src/shared/components/ui/spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useCreateStaffUser } from '@/src/routes/userManagment/hooks/user'
import AddressForm from './components/AddressForm'
import BankInfo from './components/BankInfo'
import DocumentsForm from './components/DocumentsForm'
import EmergencyForm from './components/EmergencyForm'
import IdentityForm from './components/IdentityForm'
import OccupationInfo from './components/OccupationInfo'
import SecurityAndRole from './components/SecurityAndRole'
import {
    NEW_USER_DEFAULT_VALUES,
    newUserFormSchema,
    type NewUserFormValues,
} from './schema'
import { toCreateStaffUserRequest } from './utils/toCreateStaffUserRequest'

enum FormSteps {
    identity,
    ADDRESS,
    emergencyContact,
    bankInfo,
    securityAndRole,
    occupationInfo,
    documents,
}

const CreateNewUser = () => {
    const { back, push } = useRouter()
    const { mutate: createStaffUser, isPending } = useCreateStaffUser()
    const [formStep, setFormStep] = useState<FormSteps>(FormSteps.securityAndRole)

    const methods = useForm<NewUserFormValues>({
        resolver: zodResolver(newUserFormSchema),
        defaultValues: NEW_USER_DEFAULT_VALUES,
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    })

    const onSubmit = (values: NewUserFormValues) => {
        createStaffUser(toCreateStaffUserRequest(values), {
            onSuccess: () => {
                toast.success('کاربر ایجاد شد')
                push('/admin/user-management?sub=user')
            },
            onError: () => {
                toast.error('ایجاد کاربر انجام نشد')
            },
        })
    }

    const navigationHandler = () => {
        if (formStep === FormSteps.identity) {
            back()
            return
        }
        setFormStep((prev) => prev - 1)
    }

    return (
        <FormProvider {...methods}>
            <div
                className='mx-auto flex w-full max-w-[900px] flex-col gap-6'
                dir='rtl'
            >
                <div className='flex flex-row items-center gap-2'>
                    <IconButton
                        icon='rightArrow'
                        variant='ghost'
                        iconClassName='size-6'
                        onClick={navigationHandler}
                    />
                    <span>ایجاد کاربر جدید</span>
                </div>
                <div className='mx-auto w-full max-w-[900px] pt-3'>
                    {formStep === FormSteps.identity && (
                        <IdentityForm
                            onContinue={() => setFormStep(FormSteps.ADDRESS)}
                        />
                    )}
                    {formStep === FormSteps.ADDRESS && (
                        <AddressForm
                            onContinue={() =>
                                setFormStep(FormSteps.emergencyContact)
                            }
                        />
                    )}
                    {formStep === FormSteps.emergencyContact && (
                        <EmergencyForm
                            onContinue={() => setFormStep(FormSteps.bankInfo)}
                        />
                    )}
                    {formStep === FormSteps.bankInfo && (
                        <BankInfo
                            onContinue={() =>
                                setFormStep(FormSteps.securityAndRole)
                            }
                        />
                    )}
                    {formStep === FormSteps.securityAndRole && (
                        <SecurityAndRole
                            onContinue={() =>
                                setFormStep(FormSteps.occupationInfo)
                            }
                        />
                    )}
                    {formStep === FormSteps.occupationInfo && (
                        <OccupationInfo
                            onContinue={() => setFormStep(FormSteps.documents)}
                        />
                    )}
                    {formStep === FormSteps.documents && (
                        <>
                            <DocumentsForm />
                            <Button
                                type='button'
                                variant='primary'
                                size='lg'
                                className='w-full text-label-lg'
                                disabled={isPending}
                                onClick={methods.handleSubmit(onSubmit)}
                            >
                                {isPending ? (
                                    <Spinner className='size-4' />
                                ) : (
                                    'ثبت کاربر'
                                )}
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </FormProvider>
    )
}

export default CreateNewUser
