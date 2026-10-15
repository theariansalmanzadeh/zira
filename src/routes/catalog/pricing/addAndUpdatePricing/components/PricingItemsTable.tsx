'use client'

import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import { Pill } from '@/src/shared/components/ui/Pill'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import { formatPrice } from '@/src/shared/libs/formatter'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'

export type PricingItem = {
    id: string
    code: string
    mainCategory: string
    midCategory: string
    name: string
    size: string
    colorLabel: string
    colorHex?: string
    unit: string
    currentPrice: number | null
    newPrice: string
}

type PricingItemsTableProps = {
    items: PricingItem[]
    selectedIds: string[]
    onSelectedIdsChange: (ids: string[]) => void
    onNewPriceChange: (id: string, value: string) => void
}

const HEADERS = [
    'کد کالا',
    'دسته اصلی',
    'دسته میانی',
    'نام کالا',
    'سایز',
    'رنگ',
    'واحد اصلی',
    'قیمت فعلی',
    'قیمت جدید',
] as const

const PricingItemsTable = ({
    items,
    onNewPriceChange,
}: PricingItemsTableProps) => {

    return (
        <div className='overflow-x-auto rounded-card-lg bg-surface-container-lowest p-2' dir='rtl'>
            <Table>
                <TableHeader>
                    <TableRow className='[&>*]:text-label-md [&>*]:font-normal [&>*]:text-outline'>
                        <TableHead className='w-10'>
                        </TableHead>
                        {HEADERS.map((header) => (
                            <TableHead key={header}>{header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.length === 0 ? (
                        <TableEmptyState
                            colSpan={HEADERS.length + 1}
                            title='کالایی اضافه نشده است.'
                        />
                    ) : (
                        items.map((item) => (
                            <TableRow
                                key={item.id}
                                className='[&>*]:text-label-md [&>*]:text-on-surface-variant'
                            >
                                <TableCell>
                                </TableCell>
                                <TableCell dir='ltr' className='text-end'>
                                    {item.code}
                                </TableCell>
                                <TableCell>{item.mainCategory}</TableCell>
                                <TableCell>{item.midCategory}</TableCell>
                                <TableCell className='text-on-surface'>
                                    {item.name}
                                </TableCell>
                                <TableCell>
                                    <Pill
                                        text={item.size}
                                        variant='tonal'
                                        className='border-0'
                                    />
                                </TableCell>
                                <TableCell>
                                    <span className='inline-flex items-center gap-2'>
                                        <span
                                            className='size-2.5 rounded-full'
                                            style={{
                                                backgroundColor:
                                                    item.colorHex || '#1A1A1A',
                                            }}
                                        />
                                        {item.colorLabel}
                                    </span>
                                </TableCell>
                                <TableCell>{item.unit}</TableCell>
                                <TableCell>
                                    {item.currentPrice == null
                                        ? '—'
                                        : formatPrice(item.currentPrice)}
                                </TableCell>
                                <TableCell>
                                    <input
                                        value={item.newPrice}
                                        placeholder='—'
                                        onChange={(event) =>
                                            onNewPriceChange(
                                                item.id,
                                                event.target.value
                                            )
                                        }
                                        className='h-10 w-28 rounded-container-lg border border-outline-variant bg-surface-container-lowest px-3 text-label-md text-on-surface outline-none'
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default PricingItemsTable
