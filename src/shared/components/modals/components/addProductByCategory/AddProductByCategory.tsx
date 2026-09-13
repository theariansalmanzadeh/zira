'use client'

import { useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import StepperStatus from '@/src/shared/components/StepperStatus/StepperStatus'
import { Button } from '@/src/shared/components/ui/button'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import type { BaseModalProps } from '../../types'
import {
    ADD_PRODUCT_STEPS,
    MAIN_GROUP_OPTIONS,
    MIDDLE_GROUP_OPTIONS,
    PRODUCT_OPTIONS,
    STEP_PROMPTS,
    SUB_GROUP_OPTIONS,
    buildStepperSteps,
    type CategoryOption,
    type ProductOption,
} from './constants'
import {
    ADD_PRODUCT_BY_CATEGORY_DEFAULT_VALUES,
    addProductByCategorySchema,
    type AddProductByCategoryFormValues,
    type AddProductByCategoryModalData,
} from './schema'

export type {
    AddProductByCategoryModalData,
    AddProductByCategoryPayload,
} from './schema'

const AddProductByCategory = ({ closeModal, data }: BaseModalProps) => {
    const modalData =
        (data as AddProductByCategoryModalData | null | undefined) ?? {}

    const { setValue, control } = useForm<AddProductByCategoryFormValues>({
        resolver: zodResolver(addProductByCategorySchema),
        defaultValues: ADD_PRODUCT_BY_CATEGORY_DEFAULT_VALUES,
        mode: 'onChange',
    })

    const [step, mainGroupId, middleGroupId, subGroupId, productId] = useWatch({
        control,
        name: [
            'step',
            'mainGroupId',
            'middleGroupId',
            'subGroupId',
            'productId',
        ],
    })

    const activeStepIndex = step ?? 0
    const stepId = ADD_PRODUCT_STEPS[activeStepIndex]?.id ?? 'main-group'
    const stepperSteps = useMemo(
        () => buildStepperSteps(activeStepIndex),
        [activeStepIndex]
    )

    const options: Array<CategoryOption | ProductOption> = useMemo(() => {
        if (stepId === 'main-group') return MAIN_GROUP_OPTIONS
        if (stepId === 'middle-group') {
            return MIDDLE_GROUP_OPTIONS[mainGroupId] ?? []
        }
        if (stepId === 'sub-group') {
            return SUB_GROUP_OPTIONS[middleGroupId] ?? []
        }
        return PRODUCT_OPTIONS[subGroupId] ?? []
    }, [stepId, mainGroupId, middleGroupId, subGroupId])

    const selectedId =
        stepId === 'main-group'
            ? mainGroupId
            : stepId === 'middle-group'
                ? middleGroupId
                : stepId === 'sub-group'
                    ? subGroupId
                    : productId

    const finish = (nextProductId: string) => {
        modalData.onSubmit?.({
            mainGroupId: mainGroupId ?? '',
            middleGroupId: middleGroupId ?? '',
            subGroupId: subGroupId ?? '',
            productId: nextProductId,
        })
        closeModal()
    }

    const handleSelect = (id: string) => {
        if (stepId === 'main-group') {
            setValue('mainGroupId', id, { shouldDirty: true })
            setValue('middleGroupId', '', { shouldDirty: true })
            setValue('subGroupId', '', { shouldDirty: true })
            setValue('productId', '', { shouldDirty: true })
            setValue('step', 1, { shouldDirty: true })
            return
        }

        if (stepId === 'middle-group') {
            setValue('middleGroupId', id, { shouldDirty: true })
            setValue('subGroupId', '', { shouldDirty: true })
            setValue('productId', '', { shouldDirty: true })
            setValue('step', 2, { shouldDirty: true })
            return
        }

        if (stepId === 'sub-group') {
            setValue('subGroupId', id, { shouldDirty: true })
            setValue('productId', '', { shouldDirty: true })
            setValue('step', 3, { shouldDirty: true })
            return
        }

        setValue('productId', id, { shouldDirty: true })
        finish(id)
    }

    return (
        <div className="flex w-full justify-start flex-col gap-5" dir="rtl">
            <StepperStatus
                steps={stepperSteps}
                indexBased
                className="bg-transparent p-0"
            />

            <div className="flex flex-col gap-3">
                <h3 className="text-title-md font-bold text-on-surface">
                    {STEP_PROMPTS[stepId]}
                </h3>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {options.map((option) => {
                        const isSelected = selectedId === option.id
                        const count =
                            'count' in option ? option.count : undefined

                        return (
                            <Button
                                key={option.id}
                                type="button"
                                variant={isSelected ? 'primary-outline' : 'outline'}
                                className={cn(
                                    'h-12 justify-between gap-3 px-4',
                                    isSelected &&
                                    'border-primary bg-primary/8 text-primary hover:bg-primary/12!'
                                )}
                                onClick={() => handleSelect(option.id)}
                            >
                                <span
                                    className={cn(
                                        'text-label-lg font-semibold',
                                        isSelected
                                            ? 'text-primary'
                                            : 'text-on-surface'
                                    )}
                                >
                                    {option.label}
                                </span>
                                {typeof count === 'number' ? (
                                    <span className="text-label-md text-outline">
                                        {formatFaNumber(count)} کالا
                                    </span>
                                ) : null}
                            </Button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AddProductByCategory
