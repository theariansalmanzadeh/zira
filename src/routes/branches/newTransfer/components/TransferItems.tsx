'use client'

import { useMemo } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Icon } from '@/src/shared/components/Icons/Icon'
import type { AddProductItem } from '@/src/shared/components/modals/components/addProduct'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { Button } from '@/src/shared/components/ui/button'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import { useModalStore } from '@/src/shared/store/modal-store'
import { SAMPLE_TRANSFER_PRODUCT } from '../constants'
import type { NewTransferFormValues } from '../schema'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

const mapAddProductToTransferItem = (product: AddProductItem) => ({
    id: product.id,
    productCode: product.sku,
    productName: product.productName,
    unitPrice: SAMPLE_TRANSFER_PRODUCT.unitPrice,
    unit: SAMPLE_TRANSFER_PRODUCT.unit,
    sourceStock: SAMPLE_TRANSFER_PRODUCT.sourceStock,
    quantity: product.quantity ?? 1,
})

const TransferItems = () => {
    const { openModal } = useModalStore()
    const { control, watch } = useFormContext<NewTransferFormValues>()
    const { fields, replace, remove, update } = useFieldArray({
        control,
        name: 'items',
    })
    const items = watch('items')

    const totals = useMemo(() => {
        const totalQuantity = items.reduce(
            (sum, item) => sum + item.quantity,
            0
        )
        const transferValue = items.reduce(
            (sum, item) => sum + item.quantity * item.unitPrice,
            0
        )

        return {
            rowCount: items.length,
            totalQuantity,
            transferValue,
        }
    }, [items])

    const handleOpenAddProduct = () => {
        openModal(ModalTypes.ADD_PRODUCT, {
            hasQuantity: true,
            selectedIds: items.map((item) => item.id),
            quantities: Object.fromEntries(
                items.map((item) => [item.id, item.quantity])
            ),
            onConfirm: (products: AddProductItem[]) => {
                replace(products.map(mapAddProductToTransferItem))
            },
        })
    }

    const handleQuantityChange = (index: number, quantity: number) => {
        const item = items[index]
        if (!item) return
        update(index, {
            ...item,
            quantity: Math.max(1, Math.min(quantity, item.sourceStock)),
        })
    }

    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <h3 className='text-title-md font-semibold text-on-surface'>
                اقلام انتقال
            </h3>

            <div className='overflow-hidden rounded-card-lg border border-outline-variant bg-surface-container-lowest'>
                <div className='bg-surface-container-high p-2'>
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            {fields.length > 0 ? (
                                fields.map((field, index) => (
                                    <TableRow
                                        key={field.id}
                                        data={items[index] ?? field}
                                        index={index}
                                        onQuantityChange={handleQuantityChange}
                                        onRemove={remove}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6}>
                                        <div className='flex min-h-28 items-center justify-center bg-surface-container-lowest px-4 py-8'>
                                            <span className='text-label-lg text-outline'>
                                                هنوز کالایی انتخاب نشده است.
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className='border-t border-outline-variant px-4 py-3'>
                    <Button
                        type='button'
                        variant='ghost'
                        className='gap-1 px-0 text-primary hover:bg-transparent hover:text-primary'
                        onClick={handleOpenAddProduct}
                    >
                        <Icon label='addSm400Linear' className='size-5!' />
                        افزودن کالا از مبدا
                    </Button>
                </div>
            </div>

            <div className='flex flex-row flex-wrap items-center gap-6 rounded-card-lg bg-surface-container-high px-4 py-3'>
                <div className='flex flex-row items-center gap-2'>
                    <span className='text-label-lg font-semibold text-on-surface'>
                        {formatFaNumber(totals.rowCount)} قلم
                    </span>
                    <span className='text-label-md text-outline'>
                        تعداد ردیف
                    </span>
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <span className='text-label-lg font-semibold text-on-surface'>
                        {formatFaNumber(totals.totalQuantity)} واحد
                    </span>
                    <span className='text-label-md text-outline'>
                        جمع مقدار
                    </span>
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <span className='text-label-lg font-semibold text-success'>
                        {formatPrice(totals.transferValue)} تومان
                    </span>
                    <span className='text-label-md text-outline'>
                        ارزش انتقال
                    </span>
                </div>
            </div>

            <div className='flex flex-col gap-1.5'>
                <span className='text-label-md text-outline'>توضیحات</span>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <Textarea
                            value={field.value ?? ''}
                            onChange={(event) =>
                                field.onChange(event.target.value)
                            }
                            placeholder='توضیح اختیاری برای این انتقال...'
                            className='min-h-28 border border-outline-variant bg-surface-container-lowest'
                        />
                    )}
                />
            </div>
        </div>
    )
}

export default TransferItems
