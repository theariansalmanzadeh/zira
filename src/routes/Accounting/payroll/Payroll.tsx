'use client'

import { useMemo, useState } from 'react'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, { type PayrollFilterTab } from './components/TableRow'
import {
    filterPayroll,
    PAYROLL_DUMMY,
    SUMMARY_STATS,
    TABLE_COLOUMN,
} from './constant'

const Payroll = () => {
    const [activeFilter] = useState<PayrollFilterTab | string>(
        'all'
    )

    const filteredRows = useMemo(
        () => filterPayroll(PAYROLL_DUMMY, activeFilter),
        [activeFilter]
    )

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <div className="grid grid-cols-12 gap-3">
                {SUMMARY_STATS.map((stat) => (
                    <div
                        key={stat.title}
                        className="col-span-12 flex flex-col gap-2 rounded-card-lg bg-surface-container-lowest p-6 sm:col-span-6 lg:col-span-3"
                    >
                        <span className="text-label-md text-outline">
                            {stat.title}
                        </span>
                        <span className="text-headline-lg font-medium text-on-surface">
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>

            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={activeFilter}
                toggleButtonValue={ROUTE_CONFIGS.payroll.TOGGLE_BUTTON_VALUE}
                hasHeaderActions
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <TableHeader />
                        <TableBody>
                            {filteredRows.map((row) => (
                                <TableRow key={row.id} data={row} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination className="mt-2" totalAmount={100} />
            </TableListLayout>
        </div>
    )
}

export default Payroll
