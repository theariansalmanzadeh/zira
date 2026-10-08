'use client'

import { useMemo, useState } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, { type FactorFilterTab, type FactorRowData } from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

const FACTOR_DUMMY: FactorRowData[] = [
    {
        invoiceId: 'INV-88231',
        orderId: 'PO-982031',
        customerName: 'مهرا داد',
        customerInitial: 'م',
        customerSwatch: '#D98EA8',
        customerCode: 'C-2041',
        itemsCount: 43,
        issuedAt: '2025-12-03T00:00:00.000Z',
        amount: 14893000,
        settlementType: 'credit',
        settlementDate: '2026-01-02T00:00:00.000Z',
        filterTab: 'credit',
    },
    {
        invoiceId: 'INV-88230',
        orderId: 'PO-982030',
        customerName: 'اردلان صفوی',
        customerInitial: 'ا',
        customerSwatch: '#8FB6D6',
        customerCode: 'C-1102',
        itemsCount: 124,
        issuedAt: '2025-12-02T00:00:00.000Z',
        amount: 62000000,
        settlementType: 'credit',
        settlementDate: '2026-01-01T00:00:00.000Z',
        filterTab: 'credit',
    },
    {
        invoiceId: 'INV-88228',
        orderId: 'PO-982028',
        customerName: 'مهیار آدالان',
        customerInitial: 'م',
        customerSwatch: '#C7A87C',
        customerCode: 'C-1130',
        itemsCount: 27,
        issuedAt: '2025-12-02T00:00:00.000Z',
        amount: 142000000,
        settlementType: 'cash',
        settlementDate: '2025-12-02T00:00:00.000Z',
        filterTab: 'cash',
    },
    {
        invoiceId: 'INV-88226',
        orderId: 'PO-982021',
        customerName: 'داریوش طالبی',
        customerInitial: 'د',
        customerSwatch: '#8E6CB0',
        customerCode: 'C-1077',
        itemsCount: 32,
        issuedAt: '2025-11-30T00:00:00.000Z',
        amount: 62000000,
        settlementType: 'cheque',
        settlementDate: '2026-01-29T00:00:00.000Z',
        filterTab: 'cheque',
    },
    {
        invoiceId: 'INV-88224',
        orderId: 'PO-982018',
        customerName: 'شهرزاد امینی',
        customerInitial: 'ش',
        customerSwatch: '#1F8A5B',
        customerCode: 'C-1310',
        itemsCount: 48,
        issuedAt: '2025-11-29T00:00:00.000Z',
        amount: 21879000,
        settlementType: 'cheque',
        settlementDate: '2026-01-13T00:00:00.000Z',
        filterTab: 'cheque',
    },
    {
        invoiceId: 'INV-88223',
        orderId: 'PO-982015',
        customerName: 'سارا صامت',
        customerInitial: 'س',
        customerSwatch: '#2A6FDB',
        customerCode: 'C-1255',
        itemsCount: 92,
        issuedAt: '2025-11-29T00:00:00.000Z',
        amount: 82000000,
        settlementType: 'cheque',
        settlementDate: '2025-12-29T00:00:00.000Z',
        filterTab: 'cheque',
    },
]

const filterFactors = (rows: FactorRowData[], filter: string) => {
    if (filter === 'all') return rows
    return rows.filter((row) => row.filterTab === filter)
}

const Factor = () => {
    const [activeFilter] = useState<FactorFilterTab | string>('all')

    const rows = useMemo(
        () => filterFactors(FACTOR_DUMMY, activeFilter),
        [activeFilter]
    )

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <TableListLayout
                toggleButtonValue={ROUTE_CONFIGS.factor.TOGGLE_BUTTON_VALUE}
                hasHeaderActions={true}
                TableColoumn={TABLE_COLOUMN}
                value={activeFilter}
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <TableHeader />
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.invoiceId} data={row} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination className="mt-2" totalAmount={100} />
            </TableListLayout>
        </div>
    )
}

export default Factor
