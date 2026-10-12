'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import DiscountRow, { DiscountRowProps } from './components/TableRow'
import { TABLE_COLOUMN } from './constants'
import CashPurchaseDiscountForm from './components/CashPurchaseDiscountForm'
import CombinedDiscountForm from './components/CombinedDiscountForm'

export type DiscountStatus = 'valid' | 'invalid' | 'draft'

const DISCOUNT_CODE_TOGGLE = [
    { label: 'همه', value: 'all' },
    { label: 'معتبر', value: 'valid' },
    { label: 'نامعتبر', value: 'invalid' },
    { label: 'پیش‌نویس', value: 'draft' },
]

export const DISCOUNT_LIST_DUMMY: DiscountRowProps[] = [
    {
        data: {
            title: 'تخفیف عمده تابستان',
            contractId: 'DS-2140',
            date: '2025-12-09T00:00:00.000Z',
            scope: 'همه محصولات',
            discountPercent: '8%',
            status: 'valid',
            startDate: '2025-12-09T00:00:00.000Z',
            endDate: '2025-12-09T00:00:00.000Z',
            remainingDays: '10',
        },
    },
    {
        data: {
            title: 'تخفیف دسته‌بندی ۱',
            contractId: 'DS-2140',
            date: '2025-12-09T00:00:00.000Z',
            scope: '1 دسته اصلی',
            discountPercent: '4%',
            status: 'valid',
            startDate: '2025-12-09T00:00:00.000Z',
            endDate: '2025-12-09T00:00:00.000Z',
            remainingDays: '10',
        },
    },
    {
        data: {
            title: 'تخفیف VIP طلایی',
            contractId: 'DS-2140',
            date: '2025-12-09T00:00:00.000Z',
            scope: '140 محصول',
            discountPercent: '11%',
            status: 'invalid',
            startDate: '2025-12-09T00:00:00.000Z',
            endDate: '2025-12-09T00:00:00.000Z',
            remainingDays: '10',
        },
    },
    {
        data: {
            title: 'تخفیف فصل بهار',
            contractId: 'DS-2140',
            date: '2025-12-09T00:00:00.000Z',
            scope: '2 دسته اصلی',
            discountPercent: '8%',
            status: 'draft',
            startDate: '2025-12-09T00:00:00.000Z',
            endDate: '2025-12-09T00:00:00.000Z',
            remainingDays: '10',
        },
    },
]

const DiscountTable = ({ data }: { data: DiscountRowProps[] }) => (
    <div className='bg-surface-container-high rounded-card-lg p-2'>
        <Table className='border-collapse border-spacing-y-4'>
            <TableHeader />
            <TableBody>
                {data.map((item, index) => (
                    <DiscountRow key={index} data={item.data} />
                ))}
            </TableBody>
        </Table>
    </div>
)

const DiscountList = ({ data }: { data: DiscountRowProps[] }) => {
    const [statusFilter] = useState('all')

    const filteredData = useMemo(() => {
        if (statusFilter === 'all') return data
        return data.filter((item) => item.data.status === statusFilter)
    }, [data, statusFilter])

    return (
        <TableListLayout
            TableColoumn={TABLE_COLOUMN}
            value={statusFilter}
            toggleButtonValue={DISCOUNT_CODE_TOGGLE}
        >
            <DiscountTable data={filteredData} />
        </TableListLayout>
    )
}

const Discount = ({ data = DISCOUNT_LIST_DUMMY }: { data?: DiscountRowProps[] }) => {
    const searchParams = useSearchParams()
    const isDiscountCodes = searchParams.get('sub') === 'discount-codes'
    const cat = searchParams.get('cat')
    const discountType = cat === 'cash' || cat === 'combined' ? cat : 'all'

    if (isDiscountCodes) {
        return (
            <div className='flex flex-col gap-3' dir='rtl'>
                <DiscountList data={data} />
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            {discountType === 'cash' ? (
                <CashPurchaseDiscountForm />
            ) : discountType === 'combined' ? (
                <CombinedDiscountForm />
            ) : (
                <DiscountTable data={data} />
            )}
            <TableListLayout
                // TableColoumn={TABLE_COLOUMN}
                value={discountType}
                toggleButtonValue={ROUTE_CONFIGS.discount.TOGGLE_BUTTON_VALUE}
            // hasSearch={discountType === 'all'}
            // hasFilter={discountType === 'all'}
            // hasSort={discountType === 'all'}
            // hasTableSettings={discountType === 'all'}
            // hasExpand={discountType === 'all'}
            >
                <DiscountList data={data} />
            </TableListLayout>
        </div>
    )
}

export default Discount
