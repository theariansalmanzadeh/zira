'use client'

import { useMemo, useState } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, { type SalesFactorRowData } from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

const SUMMARY_STATS = [
    { title: 'کل فاکتورها', value: 53 },
    { title: 'تسویه کامل', value: 18 },
    { title: 'تسویه ناقص', value: 9 },
    { title: 'پیش‌نویس', value: 21 },
]

const SALES_FACTOR_DUMMY: SalesFactorRowData[] = [
    {
        id: 'SI-9273',
        registeredAt: '2025-11-30T00:00:00.000Z',
        customerName: 'نام مشتری',
        warehouse: 'مرکزی تهران',
        settlementType: 'cheque',
        settlementStatus: 'full',
    },
    {
        id: 'SI-9272',
        registeredAt: '2025-11-29T00:00:00.000Z',
        customerName: 'نام مشتری',
        warehouse: 'مرکزی تهران',
        settlementType: 'cash',
        settlementStatus: 'partial',
    },
    {
        id: 'SI-9271',
        registeredAt: '2025-11-28T00:00:00.000Z',
        customerName: 'نام مشتری',
        warehouse: 'مرکزی تهران',
        settlementType: 'credit',
        settlementStatus: 'full',
    },
    {
        id: 'SI-9270',
        registeredAt: '2025-11-27T00:00:00.000Z',
        customerName: 'نام مشتری',
        warehouse: 'مرکزی تهران',
        settlementType: 'cheque',
        settlementStatus: 'partial',
    },
    {
        id: 'SI-9269',
        registeredAt: '2025-11-26T00:00:00.000Z',
        customerName: 'نام مشتری',
        warehouse: 'مرکزی تهران',
        settlementType: 'cash',
        settlementStatus: 'draft',
    },
]

const SalesInvoice = () => {
    const [statusFilter] = useState('all')

    const filteredData = useMemo(() => {
        if (statusFilter === 'draft') {
            return SALES_FACTOR_DUMMY.filter((item) => item.settlementStatus === 'draft')
        }
        return SALES_FACTOR_DUMMY
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
                        <span className='text-headline-lg font-medium text-on-surface'>
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>

            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={statusFilter}
                toggleButtonValue={ROUTE_CONFIGS.salesFactor.TOGGLE_BUTTON_VALUE}
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

export default SalesInvoice
