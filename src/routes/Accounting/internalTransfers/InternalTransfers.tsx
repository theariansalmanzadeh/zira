'use client'

import { useMemo, useState } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, { type InternalTransferFilterTab } from './components/TableRow'
import {
    filterInternalTransfers,
    INTERNAL_TRANSFERS_DUMMY,
    TABLE_COLOUMN,
} from './constants'

const InternalTransfers = () => {
    const [activeFilter] = useState<
        InternalTransferFilterTab | string
    >('all')

    const filteredTransfers = useMemo(
        () => filterInternalTransfers(INTERNAL_TRANSFERS_DUMMY, activeFilter),
        [activeFilter]
    )

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={activeFilter}
                toggleButtonValue={
                    ROUTE_CONFIGS.internalTransfers.TOGGLE_BUTTON_VALUE
                }
                hasHeaderActions
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <TableHeader />
                        <TableBody>
                            {filteredTransfers.map((transfer) => (
                                <TableRow key={transfer.id} data={transfer} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination className="mt-2" totalAmount={100} />
            </TableListLayout>
        </div>
    )
}

export default InternalTransfers
