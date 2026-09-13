'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableRow as UiTableRow,
} from '@/src/shared/components/ui/Table'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import {
    TABLE_COLOUMN,
    TRIAL_BALANCE_DUMMY,
    TRIAL_BALANCE_TOTALS,
} from './constants'

const TrialBalance = () => {
    return (
        <div className="flex flex-col gap-3" dir="rtl">
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
                            {TRIAL_BALANCE_DUMMY.map((row) => (
                                <TableRow key={row.id} data={row} />
                            ))}
                        </TableBody>
                        <TableFooter className="border-0 bg-transparent">
                            <UiTableRow className="[&>*]:bg-surface-container-high [&>*]:rounded-none [&>*]:text-label-lg [&>*]:font-medium [&>*]:text-on-surface-variant">
                                <TableCell />
                                <TableCell>جمع (میلیون تومان)</TableCell>
                                <TableCell>
                                    {TRIAL_BALANCE_TOTALS.debitTurnover}
                                </TableCell>
                                <TableCell>
                                    {TRIAL_BALANCE_TOTALS.creditTurnover}
                                </TableCell>
                                <TableCell className="text-success">
                                    {TRIAL_BALANCE_TOTALS.debitBalance}
                                </TableCell>
                                <TableCell className="text-primary">
                                    {TRIAL_BALANCE_TOTALS.creditBalance}
                                </TableCell>
                            </UiTableRow>
                        </TableFooter>
                    </Table>
                </div>
            </TableListLayout>
        </div>
    )
}

export default TrialBalance
