'use client'

import { useMemo, useState } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, { type ConsignmentSalesRowData } from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

const SUMMARY_STATS = [
    { title: 'در انتظار تخصیص', value: '21' },
    { title: 'تخصیص جزئی', value: '986', unit: 'میلیون تومان' },
    { title: 'تعیین‌تکلیف‌شده', value: '3' },
    { title: 'بیعانهٔ دریافتی', value: '6' },
]

const CONSIGNMENT_SALES_DUMMY: ConsignmentSalesRowData[] = [
    {
        id: 'CS-0291',
        date: '2025-11-30T00:00:00.000Z',
        customerName: 'نام مشتری',
        itemsSummary: '۵ قلم / ۴۳۲ عدد',
        returnDate: '2026-02-28T00:00:00.000Z',
    },
    {
        id: 'CS-0290',
        date: '2025-11-29T00:00:00.000Z',
        customerName: 'نام مشتری',
        itemsSummary: '۳ قلم / ۲۱۵ عدد',
        returnDate: '2026-02-17T00:00:00.000Z',
    },
    {
        id: 'CS-0289',
        date: '2025-11-28T00:00:00.000Z',
        customerName: 'نام مشتری',
        itemsSummary: '۲ قلم / ۸۸ عدد',
        returnDate: '2026-02-04T00:00:00.000Z',
    },
    {
        id: 'CS-0288',
        date: '2025-11-27T00:00:00.000Z',
        customerName: 'نام مشتری',
        itemsSummary: '۴ قلم / ۳۱۰ عدد',
        returnDate: '2026-01-20T00:00:00.000Z',
        isDraft: true,
    },
    {
        id: 'CS-0287',
        date: '2025-11-26T00:00:00.000Z',
        customerName: 'نام مشتری',
        itemsSummary: '۱ قلم / ۱۲ عدد',
        returnDate: '2026-01-10T00:00:00.000Z',
    },
]

const ConsignmentSales = () => {
    const [statusFilter] = useState('all')

    const filteredData = useMemo(() => {
        if (statusFilter === 'draft') {
            return CONSIGNMENT_SALES_DUMMY.filter((item) => item.isDraft)
        }
        return CONSIGNMENT_SALES_DUMMY
    }, [statusFilter])

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <div className='grid grid-cols-12 gap-3'>
                {SUMMARY_STATS.map((stat) => (
                    <div
                        key={stat.title}
                        className='col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col gap-2 rounded-card-lg bg-surface-container-lowest p-6'
                    >
                        <span className='text-label-md text-outline'>{stat.title}</span>
                        <div className='flex flex-row gap-1 items-center'>
                            <span className='text-headline-lg font-medium text-on-surface'>
                                {stat.value}
                            </span>
                            {stat.unit && (
                                <span className='text-label-md text-outline'>{stat.unit}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={statusFilter}
                toggleButtonValue={ROUTE_CONFIGS.consignmentSales.TOGGLE_BUTTON_VALUE}
                hasHeaderActions={true}
            >
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            {filteredData.map((item) => (
                                <TableRow key={item.id} data={item} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TableListLayout>
        </div>
    )
}

export default ConsignmentSales
