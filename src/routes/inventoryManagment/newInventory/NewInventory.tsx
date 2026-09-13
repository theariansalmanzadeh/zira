'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import IconButton from '@/src/shared/components/ui/IconButton'
import DefineInventory from './components/DefineInventory'
import {
    NEW_INVENTORY_STEPS,
    type NewInventoryStep,
} from './constants'
import {
    DEFINE_INVENTORY_DEFAULT_VALUES,
    defineInventorySchema,
    type DefineInventoryFormValues,
} from './schema'

const NewInventory = () => {
    const { back } = useRouter()
    const [activeStep, setActiveStep] = useState<NewInventoryStep>(
        NEW_INVENTORY_STEPS.define
    )

    const methods = useForm<DefineInventoryFormValues>({
        resolver: zodResolver(defineInventorySchema),
        defaultValues: DEFINE_INVENTORY_DEFAULT_VALUES,
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    })

    const handleBack = () => {
        if (activeStep === NEW_INVENTORY_STEPS.define) {
            back()
            return
        }

        setActiveStep(NEW_INVENTORY_STEPS.define)
    }

    return (
        <FormProvider {...methods}>
            <div className="mx-auto flex w-full max-w-[700px] flex-col gap-6" dir="rtl">
                <div className="flex flex-row items-center gap-2">
                    <IconButton
                        icon="rightArrow"
                        variant="ghost"
                        iconClassName="size-6"
                        onClick={handleBack}
                    />
                    <span className="text-title-lg font-bold text-on-surface">
                        تعریف انبار جدید
                    </span>
                </div>

                {activeStep === NEW_INVENTORY_STEPS.define && (
                    <DefineInventory
                        onContinue={() => setActiveStep(NEW_INVENTORY_STEPS.details)}
                    />
                )}
                {activeStep === NEW_INVENTORY_STEPS.details && (
                    <div className="rounded-card-md bg-surface-container-lowest p-6" />
                )}
            </div>
        </FormProvider>
    )
}

export default NewInventory
