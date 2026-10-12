'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { Switch } from '@/src/shared/components/ui/Switch'
import type { AddAndUpdateVariableFormValues } from '../schema'

const switchRowClassName =
    'flex items-center justify-between gap-3 rounded-card-lg bg-surface-container-high px-4 py-3'

const VariableSettings = () => {
    const { control } = useFormContext<AddAndUpdateVariableFormValues>()

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
        </div>
    )
}

export default VariableSettings
