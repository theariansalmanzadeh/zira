'use client'

import { useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { Button } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/Input'
import { Pill } from '@/src/shared/components/ui/Pill'
import { Switch } from '@/src/shared/components/ui/Switch'
import type { AddAndUpdateVariableFormValues } from '../schema'

const switchRowClassName =
    'flex items-center justify-between gap-3 rounded-card-lg bg-surface-container-high px-4 py-3'

const VariableSettings = () => {
    const { control, setValue } = useFormContext<AddAndUpdateVariableFormValues>()
    const [draftValue, setDraftValue] = useState('')
    const values = useWatch({ control, name: 'values' }) ?? []

    const addValue = () => {
        const next = draftValue.trim()
        if (!next || values.includes(next)) return
        setValue('values', [...values, next], { shouldDirty: true })
        setDraftValue('')
    }

    const removeValue = (value: string) => {
        setValue(
            'values',
            values.filter((item) => item !== value),
            { shouldDirty: true }
        )
    }

    return (
        <div className="flex flex-col gap-3 rounded-card-lg bg-surface-container-lowest p-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Controller
                    control={control}
                    name="required"
                    render={({ field }) => (
                        <div className={switchRowClassName}>
                            <span className="text-label-lg text-on-surface">
                                تکمیل این ویژگی الزامی باشد
                            </span>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="showInStoreFilters"
                    render={({ field }) => (
                        <div className={switchRowClassName}>
                            <span className="text-label-lg text-on-surface">
                                در فیلترهای فروشگاه نمایش داده شود
                            </span>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="showOnPublicProductPage"
                    render={({ field }) => (
                        <div className={`${switchRowClassName} sm:col-span-2`}>
                            <span className="text-label-lg text-on-surface">
                                در صفحه محصول پابلیک نمایش داده شود
                            </span>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </div>
                    )}
                />
            </div>
            <div className="flex items-end gap-2">
                <div className="min-w-0 flex-1">
                    <Input
                        label="مقدار"
                        value={draftValue}
                        onChange={setDraftValue}
                        placeholder="مقدار جدید"
                        onKeyDown={(event) => {
                            if (event.key !== 'Enter') return
                            event.preventDefault()
                            addValue()
                        }}
                    />
                </div>
                <Button
                    type="button"
                    variant="primary"
                    className="h-12"
                    onClick={addValue}
                >
                    افزودن
                </Button>
            </div>
            {values.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {values.map((value) => (
                        <Pill
                            key={value}
                            variant="primary"
                            text={value}
                            onClose={() => removeValue(value)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default VariableSettings
