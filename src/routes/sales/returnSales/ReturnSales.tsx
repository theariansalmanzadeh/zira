'use client'

import { useMemo, useState } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, { type ReturnSalesRowData } from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

const RETURN_SALES_DUMMY: ReturnSalesRowData[] = [
    {
        id: 'RS-7463',
        date: '2025-11-30T00:00:00.000Z',
        referenceInvoice: 'PI-8273',
        customerName: 'نام مشتری',
        itemsSummary: '۵ قلم / ۴۳۲ عدد',
        status: 'approved',
    },
    {
        id: 'RS-7462',
        date: '2025-11-29T00:00:00.000Z',
        referenceInvoice: 'PI-8272',
        customerName: 'نام مشتری',
        itemsSummary: '۳ قلم / ۲۱۵ عدد',
        status: 'rejected',
    },
    {
        id: 'RS-7461',
        date: '2025-11-28T00:00:00.000Z',
        referenceInvoice: 'PI-8271',
        customerName: 'نام مشتری',
        itemsSummary: '۲ قلم / ۸۸ عدد',
        status: 'approved',
    },
    {
        id: 'RS-7460',
        date: '2025-11-27T00:00:00.000Z',
        referenceInvoice: 'PI-8270',
        customerName: 'نام مشتری',
        itemsSummary: '۴ قلم / ۳۱۰ عدد',
        status: 'rejected',
    },
    {
        id: 'RS-7459',
        date: '2025-11-26T00:00:00.000Z',
        referenceInvoice: 'PI-8269',
        customerName: 'نام مشتری',
        itemsSummary: '۱ قلم / ۱۲ عدد',
        status: 'draft',
    },
]

const ReturnSales = () => {
    const [statusFilter] = useState('all')

    const filteredData = useMemo(() => {
        if (statusFilter === 'draft') {
            return RETURN_SALES_DUMMY.filter((item) => item.status === 'draft')
        }
        return RETURN_SALES_DUMMY
    }, [statusFilter])

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={statusFilter}
                toggleButtonValue={ROUTE_CONFIGS.returnSales.TOGGLE_BUTTON_VALUE}
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

export default ReturnSales
