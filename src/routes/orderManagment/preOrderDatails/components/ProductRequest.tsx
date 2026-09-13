'use client'

import { useState } from 'react'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader as UiTableHeader,
    TableRow as UiTableRow,
} from '@/src/shared/components/ui/Table'
import { cn } from '@shared/libs/utils'
import { formatFaNumber } from '@/src/shared/libs/formatter'

export type ProductRequestItem = {
    id: string
    productName: string
    productCode: string
    requestedQuantity: number
}

const PRODUCT_REQUEST_ITEMS: ProductRequestItem[] = [
    {
        id: '1',
        productName: 'سوتین پوش‌آپ گیپور',
        productCode: 'PC-2216',
        requestedQuantity: 100,
    },
]

const ProductRequestTableHeader = () => {
    return (
        <UiTableHeader className='rounded-xl bg-surface-container-high'>
            <UiTableRow className='[&>*]:text-outline [&>*]:text-label-lg [&>*]:font-normal border-0'>
                <TableHead>کالا</TableHead>
                <TableHead>شناسه کالا</TableHead>
                <TableHead>تعداد درخواستی</TableHead>
                <TableHead>موعد تحویل</TableHead>
            </UiTableRow>
        </UiTableHeader>
    )
}

type ProductRequestTableRowProps = {
    item: ProductRequestItem
    deliveryDate?: Date
    onDeliveryDateChange?: (date: Date | undefined) => void
}

const ProductRequestTableRow = ({
    item,
    deliveryDate,
    onDeliveryDateChange,
}: ProductRequestTableRowProps) => {
    return (
        <>
            <UiTableRow className='[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal bg-surface-container-lowest rounded-card-md'>
                <TableCell>
                    <div className='flex flex-row-reverse items-center justify-end gap-3'>
                        <span className='text-label-lg text-on-surface'>{item.productName}</span>
                        <div className='size-10 shrink-0 rounded-container-md bg-surface-container-highest' />
                    </div>
                </TableCell>
                <TableCell>{item.productCode}</TableCell>
                <TableCell>{formatFaNumber(item.requestedQuantity)}</TableCell>
                <TableCell className='w-[1%] whitespace-nowrap'>
                    <CalendarButton
                        placeholder='انتخاب'
                        value={deliveryDate}
                        onChange={onDeliveryDateChange}
                        className='min-w-[120px]'
                    />
                </TableCell>
            </UiTableRow>
            <div className='py-1' />
        </>
    )
}

const ProductRequest = ({ className }: { className?: string }) => {
    const [deliveryDates, setDeliveryDates] = useState<Record<string, Date | undefined>>({})

    const handleDeliveryDateChange = (itemId: string, date: Date | undefined) => {
        setDeliveryDates((prev) => ({ ...prev, [itemId]: date }))
    }

    return (
        <div className={cn('flex flex-col gap-2', className)} dir='rtl'>
            <span className='text-title-md font-medium text-outline'>محصول درخواستی</span>

            <div className='rounded-card-lg bg-surface-container-lowest p-6'>
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    <Table className='border-collapse border-spacing-y-2'>
                        <ProductRequestTableHeader />
                        <TableBody>
                            {PRODUCT_REQUEST_ITEMS.map((item) => (
                                <ProductRequestTableRow
                                    key={item.id}
                                    item={item}
                                    deliveryDate={deliveryDates[item.id]}
                                    onDeliveryDateChange={(date) =>
                                        handleDeliveryDateChange(item.id, date)
                                    }
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default ProductRequest
