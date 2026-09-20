'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import {
    SELECTED_ITEMS_COLUMNS,
    SELECTED_ITEMS_GRID_CLASS,
    type ChangeAddressFormValues,
} from '../schema'

const SelectedItemsTable = () => {
    const {
        control,
        watch,
        formState: { errors },
    } = useFormContext<ChangeAddressFormValues>()
    const items = watch('items')

    if (items.length === 0) {
        return (
            <div className='min-h-14 rounded-container-lg bg-surface-container-high px-4 py-3 text-label-lg text-on-surface-variant'>
                -
            </div>
        )
    }

    return (
        <div className='overflow-x-auto rounded-card-md bg-surface-container-high/50'>
            <div
                className={cn(
                    SELECTED_ITEMS_GRID_CLASS,
                    'min-w-[900px] px-3 py-3 text-label-md font-medium text-outline'
                )}
            >
                {SELECTED_ITEMS_COLUMNS.map((column) => (
                    <div key={column.id}>{column.label}</div>
                ))}
            </div>

            <div className='flex min-w-[900px] flex-col'>
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className={cn(
                            SELECTED_ITEMS_GRID_CLASS,
                            'border-t border-outline-variant/40 bg-surface-container-lowest px-3 py-3 text-label-lg text-on-surface-variant'
                        )}
                    >
                        <div dir='ltr' className='text-right'>
                            {item.productCode}
                        </div>
                        <div className='flex min-w-0 flex-col gap-0.5'>
                            <span className='font-semibold text-on-surface'>
                                {item.productName}
                            </span>
                            <span className='text-label-sm text-outline'>
                                {item.categoryPath}
                            </span>
                        </div>
                        <div>{item.model}</div>
                        <div>{item.unit}</div>
                        <div>
                            {formatFaNumber(item.stock)} {item.unit}
                        </div>
                        <div dir='ltr' className='text-right'>
                            {item.warehouseAddress}
                        </div>
                        <div>
                            <Controller
                                control={control}
                                name={`items.${index}.transferQty`}
                                render={({ field }) => (
                                    <Input
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder='۰'
                                        inputMode='numeric'
                                        error={
                                            !!errors.items?.[index]
                                                ?.transferQty
                                        }
                                        msg={
                                            errors.items?.[index]?.transferQty
                                                ?.message
                                        }
                                        wrapperClassName='border border-outline-variant bg-surface-container-lowest'
                                    />
                                )}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectedItemsTable
