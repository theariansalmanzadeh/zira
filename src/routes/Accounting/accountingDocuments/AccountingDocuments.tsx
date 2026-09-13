'use client'

import { useMemo, useState } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, { type AccountingDocumentFilterTab } from './components/TableRow'
import {
    ACCOUNTING_DOCUMENTS_DUMMY,
    filterAccountingDocuments,
    SUMMARY_STATS,
    TABLE_COLOUMN,
} from './constants'

const AccountingDocuments = () => {
    const [activeFilter] = useState<
        AccountingDocumentFilterTab | string
    >('all')

    const filteredDocuments = useMemo(
        () => filterAccountingDocuments(ACCOUNTING_DOCUMENTS_DUMMY, activeFilter),
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
                value={activeFilter}
                toggleButtonValue={
                    ROUTE_CONFIGS.accountingDocuments.TOGGLE_BUTTON_VALUE
                }
                hasHeaderActions
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <TableHeader />
                        <TableBody>
                            {filteredDocuments.map((document) => (
                                <TableRow key={document.id} data={document} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination className="mt-2" totalAmount={100} />
            </TableListLayout>
        </div>
    )
}

export default AccountingDocuments
