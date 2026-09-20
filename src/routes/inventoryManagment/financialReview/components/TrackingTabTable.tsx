'use client'

import { TableCell } from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import InventoryReviewTable from '../../components/InventoryReviewTable'
import ReviewRowShell from '../../components/ReviewRowShell'
import { TRACKING_COLUMNS, TRACKING_DUMMY } from '../constants'
import AmountCell from './AmountCell'

const TrackingRow = ({ item }: { item: (typeof TRACKING_DUMMY)[number] }) => {
    const { TableColoumn } = useTable()

    return (
        <ReviewRowShell>
            {TableColoumn[0]?.isChecked && <TableCell>{item.title}</TableCell>}
            {TableColoumn[1]?.isChecked && (
                <TableCell>
                    <AmountCell value={item.opening} />
                </TableCell>
            )}
            {TableColoumn[2]?.isChecked && (
                <TableCell>
                    <AmountCell value={item.incoming} />
                </TableCell>
            )}
            {TableColoumn[3]?.isChecked && (
                <TableCell>
                    <AmountCell value={item.outgoing} />
                </TableCell>
            )}
            {TableColoumn[4]?.isChecked && (
                <TableCell>
                    <AmountCell value={item.net} />
                </TableCell>
            )}
        </ReviewRowShell>
    )
}

const TrackingTabTable = () => (
    <InventoryReviewTable columns={TRACKING_COLUMNS}>
        {TRACKING_DUMMY.map((item) => (
            <TrackingRow key={item.id} item={item} />
        ))}
    </InventoryReviewTable>
)

export default TrackingTabTable
