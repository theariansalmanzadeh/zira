'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useCreateRegistrationRequest } from '@/src/routes/customers/hooks/customers'
import StepperStatus from '@/src/shared/components/StepperStatus/StepperStatus'
import type { StepperStatusStep } from '@/src/shared/components/StepperStatus/types'
import ActionButton from './components/ActionButton'
import AddressAndContact from './components/AddressAndContact'
import Credit from './components/Credit'
import CustomerAccount from './components/CustomerAccount'
import IdentityInfo from './components/IdentityInfo'
import {
    CREATE_CUSTOMER_STEPS,
    NEW_CUSTOMER_STEPS,
    type NewCustomerStep,
} from './constants'
import {
    CONTACT_FIELDS,
    CREDIT_FIELDS,
    IDENTITY_FIELDS,
    NEW_CUSTOMER_DEFAULT_VALUES,
    newCustomerFormSchema,
    type NewCustomerFormValues,
} from './schema'
import { toCreateRegistrationRequest } from './utils/toCreateRegistrationRequest'

const NewCustomer = () => {
    const { back, push } = useRouter()
    const { mutate: createRegistrationRequest, isPending } =
        useCreateRegistrationRequest()
    const [activeStep, setActiveStep] = useState<NewCustomerStep>(
        NEW_CUSTOMER_STEPS.identity
    )

    const methods = useForm<NewCustomerFormValues>({
        resolver: zodResolver(newCustomerFormSchema),
        defaultValues: NEW_CUSTOMER_DEFAULT_VALUES,
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    })

    const activeStepIndex = CREATE_CUSTOMER_STEPS.findIndex(
        (step) => step.id === activeStep
    )

    const steps: StepperStatusStep[] = CREATE_CUSTOMER_STEPS.map((step, index) => ({
        id: step.id,
        label: step.label,
        status:
            index < activeStepIndex
                ? 'complete'
                : index === activeStepIndex
                    ? 'pending'
                    : 'not_reached',
    }))

    const onSubmit = (values: NewCustomerFormValues) => {
        createRegistrationRequest(toCreateRegistrationRequest(values), {
            onSuccess: () => {
                toast.success('درخواست ثبت‌نام ثبت شد')
                push('/admin/customers?sub=requests')
            },
        })
    }

    const handleContinue = async () => {
        if (activeStep === NEW_CUSTOMER_STEPS.identity) {
            const isValid = await methods.trigger([...IDENTITY_FIELDS])
            if (isValid) setActiveStep(NEW_CUSTOMER_STEPS.addressAndContact)
            return
        }

        if (activeStep === NEW_CUSTOMER_STEPS.addressAndContact) {
            const isValid = await methods.trigger([...CONTACT_FIELDS])
            if (isValid) setActiveStep(NEW_CUSTOMER_STEPS.credit)
            return
        }

        if (activeStep === NEW_CUSTOMER_STEPS.credit) {
            const isValid = await methods.trigger([...CREDIT_FIELDS])
            if (isValid) setActiveStep(NEW_CUSTOMER_STEPS.customerAccount)
        }
    }

    const handleBack = () => {
        if (activeStep === NEW_CUSTOMER_STEPS.identity) {
            back()
            return
        }

        if (activeStep === NEW_CUSTOMER_STEPS.addressAndContact) {
            setActiveStep(NEW_CUSTOMER_STEPS.identity)
            return
        }

        if (activeStep === NEW_CUSTOMER_STEPS.credit) {
            setActiveStep(NEW_CUSTOMER_STEPS.addressAndContact)
            return
        }

        setActiveStep(NEW_CUSTOMER_STEPS.credit)
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="mx-auto flex w-full max-w-[900px] flex-col gap-6"
                dir="rtl"
            >

                <StepperStatus steps={steps} indexBased />

                {activeStep === NEW_CUSTOMER_STEPS.identity && <IdentityInfo />}
                {activeStep === NEW_CUSTOMER_STEPS.addressAndContact && (
                    <AddressAndContact />
                )}
                {activeStep === NEW_CUSTOMER_STEPS.credit && <Credit />}
                {activeStep === NEW_CUSTOMER_STEPS.customerAccount && (
                    <CustomerAccount />
                )}

                <ActionButton
                    activeStep={activeStep}
                    onContinue={handleContinue}
                    onBack={handleBack}
                    onCancel={() => back()}
                    isSubmitting={isPending}
                />
            </form>
        </FormProvider>
    )
}

export default NewCustomer
