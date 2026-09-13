'use client'

import { useMemo, useState } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, { type AccountReceiptFilterTab } from './components/TableRow'
import {
    ACCOUNT_RECEIPTS_DUMMY,
    filterAccountReceipts,
    TABLE_COLOUMN,
} from './constants'

const AccountReciept = () => {
    const [activeFilter] = useState<
        AccountReceiptFilterTab | string
    >('all')

    const filteredReceipts = useMemo(
        () => filterAccountReceipts(ACCOUNT_RECEIPTS_DUMMY, activeFilter),
        [activeFilter]
    )

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={activeFilter}
                toggleButtonValue={ROUTE_CONFIGS.accountReceipt.TOGGLE_BUTTON_VALUE}
                hasHeaderActions
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <TableHeader />
                        <TableBody>
                            {filteredReceipts.map((receipt) => (
                                <TableRow key={receipt.id} data={receipt} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination className="mt-2" totalAmount={100} />
            </TableListLayout>
        </div>
    )
}

export default AccountReciept
