'use client'

import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '@/src/shared/components/ui/button'
import IconButton from '@/src/shared/components/ui/IconButton'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useModalStore } from '@/src/shared/store/modal-store'
import type { NewDiscountFormValues } from '../schema'

const TABLE_HEADERS = ['کد کالا', 'نام کالا', 'قیمت', 'موجودی', ''] as const

const ProductList = () => {
    const { openModal } = useModalStore()
    const { control } = useFormContext<NewDiscountFormValues>()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'products',
        keyName: 'fieldId',
    })

    const handleAddProduct = () => {
        openModal(ModalTypes.ADD_PRODUCT, {
            selectedIds: fields.map((product) => product.id),
            onConfirm: (
                selected: {
                    id: string
                    productName: string
                    sku: string
                }[]
            ) => {
                const existingIds = new Set(fields.map((item) => item.id))
                selected
                    .filter((item) => !existingIds.has(item.id))
                    .forEach((item) =>
                        append({
                            id: item.id,
                            code: item.sku,
                            name: item.productName,
                            price: 0,
                            stock: 0,
                        })
                    )
            },
        })
    }

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <div className='flex items-center justify-between gap-3'>
                <span className='text-label-md text-on-surface-variant'>
                    محصولات انتخاب‌شده
                </span>
                <Button
                    type='button'
                    variant='primary'
                    size='default'
                    onClick={handleAddProduct}
                >
                    افزودن محصول
                </Button>
            </div>

            <div className='overflow-x-auto rounded-card-md bg-surface-container-high p-2'>
                <Table>
                    <TableHeader>
                        <TableRow className='[&>*]:text-label-sm [&>*]:font-normal [&>*]:text-outline'>
                            {TABLE_HEADERS.map((header) => (
                                <TableHead
                                    key={header || 'actions'}
                                    className='whitespace-nowrap text-label-sm font-normal text-outline'
                                >
                                    {header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {fields.length === 0 ? (
                            <TableEmptyState
                                colSpan={TABLE_HEADERS.length}
                                title='کالایی اضافه نشده است.'
                            />
                        ) : null}
                        {fields.map((product, index) => (
                            <TableRow
                                key={product.fieldId}
                                className='[&>*]:text-label-lg [&>*]:text-on-surface-variant'
                            >
                                <TableCell>
                                    <span className='text-outline'>
                                        {product.code}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className='font-semibold text-on-surface'>
                                        {product.name}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className='text-on-surface'>
                                        {formatPrice(product.price)}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className='text-on-surface'>
                                        {formatFaNumber(product.stock)}
                                    </span>
                                </TableCell>
                                <TableCell className='w-[1%] whitespace-nowrap'>
                                    <IconButton
                                        icon='delete400Linear'
                                        variant='ghost'
                                        className='size-8!'
                                        iconClassName='size-5! text-outline'
                                        onClick={() => remove(index)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ProductList
