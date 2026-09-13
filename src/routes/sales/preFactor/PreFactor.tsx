'use client'

import { useMemo, useState } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import BodyRow, { type PreFactorRowData } from './components/BodyRow'
import TableHeader from './components/TableHeader'
import { TABLE_COLOUMN } from './constants'

const SUMMARY_STATS = [
    { title: 'کل پیش‌فاکتورها', value: 53 },
    { title: 'معتبر', value: 18 },
    { title: 'منقضی', value: 9 },
    { title: 'تبدیل شده به فاکتور', value: 21 },
]

const PRE_FACTOR_DUMMY: PreFactorRowData[] = [
    {
        id: 'PF-8237',
        registeredAt: '2025-11-30T00:00:00.000Z',
        customerName: 'نام مشتری',
        validUntil: '2025-12-02T00:00:00.000Z',
        status: 'valid',
    },
    {
        id: 'PF-8236',
        registeredAt: '2025-11-29T00:00:00.000Z',
        customerName: 'نام مشتری',
        validUntil: '2025-12-01T00:00:00.000Z',
        status: 'converted',
    },
    {
        id: 'PF-8235',
        registeredAt: '2025-11-28T00:00:00.000Z',
        customerName: 'نام مشتری',
        validUntil: '2025-11-30T00:00:00.000Z',
        status: 'expired',
    },
    {
        id: 'PF-8234',
        registeredAt: '2025-11-27T00:00:00.000Z',
        customerName: 'نام مشتری',
        validUntil: '2025-11-29T00:00:00.000Z',
        status: 'valid',
    },
    {
        id: 'PF-8233',
        registeredAt: '2025-11-26T00:00:00.000Z',
        customerName: 'نام مشتری',
        validUntil: '2025-11-28T00:00:00.000Z',
        status: 'draft',
    },
]

const PreFactor = () => {
    const [statusFilter] = useState('all')

    const filteredData = useMemo(() => {
        if (statusFilter === 'draft') {
            return PRE_FACTOR_DUMMY.filter((item) => item.status === 'draft')
        }
        return PRE_FACTOR_DUMMY
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
                toggleButtonValue={ROUTE_CONFIGS.preFactor.TOGGLE_BUTTON_VALUE}
                hasHeaderActions={true}
            >
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            {filteredData.map((item) => (
                                <BodyRow key={item.id} data={item} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TableListLayout>
        </div>
    )
}

export default PreFactor
