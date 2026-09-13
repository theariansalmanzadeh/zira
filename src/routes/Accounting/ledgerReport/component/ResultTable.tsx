'use client'

import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { useLedgerReport } from '../provider/LedgerReportProvider'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import { TABLE_COLOUMN } from '../constants'

const ResultTable = () => {
    const { summaryStats, rows, totalCount } = useLedgerReport()

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <div className="grid grid-cols-12 gap-3">
                {summaryStats.map((stat) => (
                    <div
                        key={stat.title}
                        className="col-span-12 flex flex-col gap-2 rounded-card-lg bg-surface-container-lowest p-6 sm:col-span-6 lg:col-span-3"
                    >
                        <span className="text-label-md text-outline">
                            {stat.title}
                        </span>
                        <div className="flex flex-row items-center gap-2">
                            <span className="text-headline-lg font-medium text-on-surface">
                                {stat.value}
                            </span>
                            {'subtitle' in stat && (
                                <span className="text-label-sm text-outline mt-3">
                                    {stat.subtitle}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value=""
                toggleButtonValue={[]}
                hasHeaderActions
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <TableHeader />
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id} data={row} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination className="mt-2" totalAmount={totalCount} />
            </TableListLayout>
        </div>
    )
}

export default ResultTable
