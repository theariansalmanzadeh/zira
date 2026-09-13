'use client'

import IconButton from '@/src/shared/components/ui/IconButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import AddressForm from './components/AddressForm'
import DocumentsForm from './components/DocumentsForm'
import EmergencyForm from './components/EmergencyForm'
import IdentityForm from './components/IdentityForm'
import {
    NEW_USER_DEFAULT_VALUES,
    newUserFormSchema,
    type NewUserFormValues,
} from './schema'

enum FormSteps {
    identity,
    ADDRESS,
    emergencyContact,
    documents,
}

const CreateNewUser = () => {
    const { back } = useRouter()
    const [formStep, setFormStep] = useState<FormSteps>(FormSteps.identity)

    const methods = useForm<NewUserFormValues>({
        resolver: zodResolver(newUserFormSchema),
        defaultValues: NEW_USER_DEFAULT_VALUES,
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    })

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
                className="mx-auto flex w-full max-w-[700px] flex-col gap-6"
                dir="rtl"
            >
                <div className="flex flex-row items-center gap-2">
                    <IconButton
                        icon="rightArrow"
                        variant="ghost"
                        iconClassName="size-6"
                        onClick={navigationHandler}
                    />
                    <span>ایجاد کاربر جدید</span>
                </div>
                <div className="mx-auto max-w-[700px] pt-3">
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
                            onContinue={() => setFormStep(FormSteps.documents)}
                        />
                    )}
                    {formStep === FormSteps.documents && <DocumentsForm />}
                </div>
            </div>
        </FormProvider>
    )
}

export default CreateNewUser
