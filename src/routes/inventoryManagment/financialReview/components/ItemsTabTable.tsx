'use client'

import { TableCell } from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import InventoryReviewTable from '../../components/InventoryReviewTable'
import ReviewRowShell from '../../components/ReviewRowShell'
import { ITEMS_COLUMNS, ITEMS_DUMMY } from '../constants'
import AmountCell from './AmountCell'

const ItemsRow = ({ item }: { item: (typeof ITEMS_DUMMY)[number] }) => {
    const { TableColoumn } = useTable()

    return (
        <ReviewRowShell>
            {TableColoumn[0]?.isChecked && <TableCell>{item.date}</TableCell>}
            {TableColoumn[1]?.isChecked && <TableCell>{item.number}</TableCell>}
            {TableColoumn[2]?.isChecked && (
                <TableCell>{item.document}</TableCell>
            )}
            {TableColoumn[3]?.isChecked && <TableCell>{item.type}</TableCell>}
            {TableColoumn[4]?.isChecked && (
                <TableCell>{item.baseDocument}</TableCell>
            )}
            {TableColoumn[5]?.isChecked && (
                <TableCell>
                    <AmountCell value={item.amount} />
                </TableCell>
            )}
            {TableColoumn[6]?.isChecked && (
                <TableCell>
                    <AmountCell value={item.warehouseStock} />
                </TableCell>
            )}
        </ReviewRowShell>
    )
}

const ItemsTabTable = () => (
    <InventoryReviewTable columns={ITEMS_COLUMNS}>
        {ITEMS_DUMMY.map((item) => (
            <ItemsRow key={item.id} item={item} />
        ))}
    </InventoryReviewTable>
)

export default ItemsTabTable
