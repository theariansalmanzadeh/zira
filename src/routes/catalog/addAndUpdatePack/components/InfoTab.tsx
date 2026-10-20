'use client'

import { useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { useListUnits } from '@/src/routes/settings/hooks/settings'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import {
    DISPLAY_STATUS_OPTIONS,
    VARIATION_PATTERN_OPTIONS,
    type AddAndUpdatePackFormValues,
} from '../schema'

const InfoTab = () => {
    const {
        control,
        setValue,
        formState: { errors },
    } = useFormContext<AddAndUpdatePackFormValues>()
    const unitId = useWatch({ control, name: 'unit_id' })
    const { data: unitsData } = useListUnits({
        page: 1,
        page_size: 100,
        is_active: true,
        is_base: false,
    })

    const unitOptions = (unitsData?.results ?? [])
        .filter((unit) => unit.is_active && !unit.is_base)
        .map((unit) => ({
            label: unit.name,
            value: unit.id,
        }))

    useEffect(() => {
        const derivedUnits = (unitsData?.results ?? []).filter(
            (unit) => unit.is_active && !unit.is_base
        )
        if (derivedUnits.some((unit) => unit.id === unitId)) return
        const firstUnitId = derivedUnits[0]?.id
        if (!firstUnitId) return
        setValue('unit_id', firstUnitId, { shouldValidate: true })
    }, [unitId, unitsData, setValue])

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-6 rounded-card-lg bg-surface-container-lowest p-6'>
                <div className='flex items-center gap-2'>
                    <span className='h-5 w-1 shrink-0 rounded-full bg-error' />
                    <span className='text-title-md font-bold text-on-surface'>
                        اطلاعات پایه آیتم
                    </span>
                </div>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <div className='flex flex-col gap-1'>
                        <Controller
                            control={control}
                            name='display_name'
                            render={({ field }) => (
                                <Input
                                    label='عنوان آیتم'
                                    value={field.value ?? ''}
                                    onChange={field.onChange}
                                    placeholder='پک ۶ عددی شورت زنانه رز — قرمز'
                                />
                            )}
                        />
                        <span className='text-label-sm text-outline'>
                            در صورت خالی بودن، نام پیشنهادی آیتم استفاده می‌شود
                        </span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Controller
                            control={control}
                            name='base_code'
                            render={({ field }) => (
                                <Input
                                    label='کد آیتم *'
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.base_code ? (
                            <span className='text-label-sm text-error'>
                                {errors.base_code.message}
                            </span>
                        ) : (
                            <span className='text-label-sm text-outline'>
                                کد یکتای آیتم
                            </span>
                        )}
                    </div>
                </div>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <Controller
                        control={control}
                        name='status'
                        render={({ field }) => (
                            <FormDropdown
                                label='وضعیت نمایش'
                                value={field.value}
                                options={[...DISPLAY_STATUS_OPTIONS]}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='variation_pattern'
                        render={({ field }) => (
                            <FormDropdown
                                label='الگوی تنوع'
                                value={field.value}
                                options={[...VARIATION_PATTERN_OPTIONS]}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>

                <Controller
                    control={control}
                    name='unit_id'
                    render={({ field }) => (
                        <FormDropdown
                            label='واحد *'
                            value={field.value}
                            options={unitOptions}
                            onChange={field.onChange}
                            placeholder='انتخاب واحد'
                        />
                    )}
                />
                {errors.unit_id ? (
                    <span className='-mt-4 text-label-sm text-error'>
                        {errors.unit_id.message}
                    </span>
                ) : null}

                <div className='flex flex-col gap-1.5'>
                    <label className='text-label-md text-on-surface-variant'>
                        توضیحات آیتم
                    </label>
                    <Controller
                        control={control}
                        name='description'
                        render={({ field }) => (
                            <Textarea
                                value={field.value ?? ''}
                                onChange={(event) =>
                                    field.onChange(event.target.value)
                                }
                                placeholder='توضیح آیتم برای صفحه فروشگاه'
                                className='min-h-28 resize-none rounded-container-lg border border-outline-variant bg-surface-container-lowest px-3 py-2'
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default InfoTab
