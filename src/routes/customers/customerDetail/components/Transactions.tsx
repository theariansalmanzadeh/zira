'use client'

import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import {
    TRANSACTIONS_DUMMY,
    TRANSACTIONS_TABLE_COLUMNS,
    TRANSACTIONS_TOGGLE_BUTTONS,
} from '../constants/transactions'
import TransactionsTableHeader from './TransactionsTableHeader'
import TransactionsTableRow from './TransactionsTableRow'

const Transactions = () => {
    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <TableListLayout
                toggleButtonValue={[...TRANSACTIONS_TOGGLE_BUTTONS]}
                hasHeaderActions
                TableColoumn={TRANSACTIONS_TABLE_COLUMNS}
                value="normal"
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <TransactionsTableHeader />
                        <TableBody>
                            {TRANSACTIONS_DUMMY.map((row) => (
                                <TransactionsTableRow
                                    key={row.id}
                                    data={row}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TableListLayout>
        </div>
    )
}

export default Transactions
