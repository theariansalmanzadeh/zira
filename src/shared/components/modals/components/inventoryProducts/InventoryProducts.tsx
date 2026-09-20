'use client'

import { useState } from 'react'
import { Button } from '@/src/shared/components/ui/button'
import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import { Pill } from '@/src/shared/components/ui/Pill'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import type { BaseModalProps } from '../../types'
import {
    INVENTORY_PRODUCTS_DUMMY,
    INVENTORY_PRODUCT_COLUMNS,
    INVENTORY_PRODUCT_GRID_CLASS,
} from './constants'
import type {
    InventoryProductsModalData,
} from './types'

const InventoryProducts = ({ closeModal, data }: BaseModalProps) => {
    const modalData = data as InventoryProductsModalData | null | undefined
    const [selectedIds, setSelectedIds] = useState(
        () => new Set(modalData?.selectedIds ?? [])
    )

    const toggleProduct = (id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    const handleConfirm = () => {
        const selected = INVENTORY_PRODUCTS_DUMMY.filter((item) =>
            selectedIds.has(item.id)
        )
        modalData?.onConfirm?.(selected)
        closeModal()
    }

    return (
        <div className='flex w-full flex-col gap-4' dir='rtl'>
            <p className='text-label-md text-outline'>
                {formatFaNumber(INVENTORY_PRODUCTS_DUMMY.length)} کالا از موجودی
                این انبار — روی ردیف‌ها کلیک کنید (چند انتخابی) و مقدار هر کالا را
                وارد نمایید.
            </p>

            <div className='overflow-x-auto rounded-card-lg bg-surface-container-high p-2'>
                <div
                    className={cn(
                        INVENTORY_PRODUCT_GRID_CLASS,
                        'min-w-[1200px] px-3 py-3 text-label-lg font-normal text-outline'
                    )}
                >
                    {INVENTORY_PRODUCT_COLUMNS.map((column) => (
                        <div key={column.id}>{column.label}</div>
                    ))}
                </div>

                <div className='flex min-w-[1200px] flex-col gap-1'>
                    {INVENTORY_PRODUCTS_DUMMY.map((item) => {
                        const isSelected = selectedIds.has(item.id)

                        return (
                            <button
                                key={item.id}
                                type='button'
                                onClick={() => toggleProduct(item.id)}
                                className={cn(
                                    INVENTORY_PRODUCT_GRID_CLASS,
                                    'rounded-card-md bg-surface-container-lowest px-3 py-3 text-right text-label-lg text-on-surface-variant transition-colors',
                                    isSelected && 'ring-1 ring-primary/40'
                                )}
                            >
                                <div
                                    className='flex items-center justify-center'
                                    onClick={(event) => event.stopPropagation()}
                                    onKeyDown={(event) =>
                                        event.stopPropagation()
                                    }
                                >
                                    <Checkbox
                                        checked={isSelected}
                                        onCheckedChange={() =>
                                            toggleProduct(item.id)
                                        }
                                        variant='primary-outline'
                                    />
                                </div>
                                <div dir='ltr' className='text-right'>
                                    {item.productCode}
                                </div>
                                <div>{item.productType}</div>
                                <div className='flex min-w-0 flex-col gap-0.5'>
                                    <span className='font-semibold text-on-surface'>
                                        {item.productName}
                                    </span>
                                    <span className='text-label-sm text-outline'>
                                        {item.categoryPath}
                                    </span>
                                </div>
                                <div>{item.size}</div>
                                <div className='flex items-center gap-1.5'>
                                    <span
                                        className='size-3 shrink-0 rounded-[3px]'
                                        style={{
                                            backgroundColor: item.colorHex,
                                        }}
                                    />
                                    <Pill
                                        text={item.colorName}
                                        variant='tonal'
                                        size='sm'
                                        className='border-0'
                                    />
                                </div>
                                <div>{item.material}</div>
                                <div>{item.model}</div>
                                <div>{item.unit}</div>
                                <div>
                                    {formatFaNumber(item.stock)} {item.unit}
                                </div>
                                <div dir='ltr' className='text-right'>
                                    {item.warehouseAddress}
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className='flex flex-row items-center justify-between gap-3 pt-1'>
                <Button type='button' variant='ghost' onClick={closeModal}>
                    انصراف
                </Button>
                <Button
                    type='button'
                    variant='primary'
                    onClick={handleConfirm}
                    disabled={selectedIds.size === 0}
                >
                    تایید انتخاب ({formatFaNumber(selectedIds.size)})
                </Button>
            </div>
        </div>
    )
}

export type { InventoryProductItem, InventoryProductsModalData } from './types'
export default InventoryProducts
