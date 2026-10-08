'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import IconButton from '@/src/shared/components/ui/IconButton'
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
    ACCOUNT_FIELDS,
    CONTACT_FIELDS,
    CREDIT_FIELDS,
    IDENTITY_FIELDS,
    NEW_CUSTOMER_DEFAULT_VALUES,
    newCustomerFormSchema,
    type NewCustomerFormValues,
} from './schema'

const NewCustomer = () => {
    const { back } = useRouter()
    const [activeStep, setActiveStep] = useState<NewCustomerStep>(
        NEW_CUSTOMER_STEPS.addressAndContact
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

    const onSubmit = async () => {
        const isValid = await methods.trigger([...ACCOUNT_FIELDS])
        if (!isValid) return
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
                <div className="flex flex-row items-center gap-2">
                    <IconButton
                        icon="arrorwRight300Linear"
                        onClick={handleBack}
                        iconClassName="size-6 text-on-surface-variant"
                        variant="ghost"
                    />
                    <span className="text-title-lg font-medium text-on-surface">
                        مشتری جدید
                    </span>
                </div>

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
                />
            </form>
        </FormProvider>
    )
}

export default NewCustomer
