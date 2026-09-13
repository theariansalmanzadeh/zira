"use client"

import { useMemo, useState } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import DiscountRow, { DiscountRowProps } from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

export type DiscountStatus = 'valid' | 'invalid' | 'draft'

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

const Discount = ({ data = DISCOUNT_LIST_DUMMY }: { data?: DiscountRowProps[] }) => {
    const [statusFilter] = useState('all')

    const filteredData = useMemo(() => {
        if (statusFilter === 'all') return data
        return data.filter((item) => item.data.status === statusFilter)
    }, [data, statusFilter])

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={statusFilter}
                toggleButtonValue={ROUTE_CONFIGS.discount.TOGGLE_BUTTON_VALUE}
            >
                <div className='bg-surface-container-high rounded-card-lg p-2'>
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            {filteredData.map((item, index) => (
                                <DiscountRow key={index} data={item.data} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TableListLayout>
        </div>
    )
}

export default Discount
