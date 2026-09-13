'use client'

import { useMemo, useState } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, { type CustomerAnalysisFilterTab } from './components/TableRow'
import {
    CUSTOMER_ANALYSIS_DUMMY,
    filterCustomerAnalysis,
    TABLE_COLOUMN,
} from './constants'

const CustomerAnalysis = () => {
    const [activeFilter] = useState<
        CustomerAnalysisFilterTab | string
    >('all')

    const filteredCustomers = useMemo(
        () => filterCustomerAnalysis(CUSTOMER_ANALYSIS_DUMMY, activeFilter),
        [activeFilter]
    )

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={activeFilter}
                toggleButtonValue={
                    ROUTE_CONFIGS.customerAnalysis.TOGGLE_BUTTON_VALUE
                }
                hasHeaderActions
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <TableHeader />
                        <TableBody>
                            {filteredCustomers.map((customer) => (
                                <TableRow key={customer.id} data={customer} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination className="mt-2" totalAmount={100} />
            </TableListLayout>
        </div>
    )
}

export default CustomerAnalysis
