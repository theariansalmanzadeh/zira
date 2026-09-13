'use client'

import { useMemo, useState } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, { type ChartOfAccountFilterTab } from './components/TableRow'
import {
    CHART_OF_ACCOUNTS_DUMMY,
    filterChartOfAccounts,
    getVisibleAccounts,
    TABLE_COLOUMN,
} from './constants'

const ChartOfAccount = () => {
    const [activeFilter] = useState<
        ChartOfAccountFilterTab | string
    >('all')
    const [expandedIds, setExpandedIds] = useState<Set<string>>(
        () => new Set(['1', '1-1', '1-2'])
    )

    const filteredAccounts = useMemo(
        () => filterChartOfAccounts(CHART_OF_ACCOUNTS_DUMMY, activeFilter),
        [activeFilter]
    )

    const visibleAccounts = useMemo(
        () => getVisibleAccounts(filteredAccounts, expandedIds),
        [filteredAccounts, expandedIds]
    )

    const toggleExpand = (id: string) => {
        setExpandedIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) {
                next.delete(id)
            } else {
                next.add(id)
            }
            return next
        })
    }

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={activeFilter}
                toggleButtonValue={
                    ROUTE_CONFIGS.chartOfAccount.TOGGLE_BUTTON_VALUE
                }
                hasHeaderActions
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <TableHeader />
                        <TableBody>
                            {visibleAccounts.map((account) => (
                                <TableRow
                                    key={account.id}
                                    data={account}
                                    isExpanded={expandedIds.has(account.id)}
                                    onToggleExpand={() =>
                                        toggleExpand(account.id)
                                    }
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    className="mt-2"
                    totalAmount={visibleAccounts.length}
                />
            </TableListLayout>
        </div>
    )
}

export default ChartOfAccount
