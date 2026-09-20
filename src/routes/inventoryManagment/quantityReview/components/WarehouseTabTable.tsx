'use client'

import { TableCell } from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import InventoryReviewTable from '../../components/InventoryReviewTable'
import ReviewRowShell from '../../components/ReviewRowShell'
import { WAREHOUSE_COLUMNS, WAREHOUSE_DUMMY } from '../constants'

const WarehouseRow = ({
    item,
}: {
    item: (typeof WAREHOUSE_DUMMY)[number]
}) => {
    const { TableColoumn } = useTable()

    return (
        <ReviewRowShell>
            {TableColoumn[0]?.isChecked && <TableCell>{item.code}</TableCell>}
            {TableColoumn[1]?.isChecked && <TableCell>{item.title}</TableCell>}
            {TableColoumn[2]?.isChecked && (
                <TableCell>{formatFaNumber(item.opening)}</TableCell>
            )}
            {TableColoumn[3]?.isChecked && (
                <TableCell>{formatFaNumber(item.incoming)}</TableCell>
            )}
            {TableColoumn[4]?.isChecked && (
                <TableCell>{formatFaNumber(item.outgoing)}</TableCell>
            )}
            {TableColoumn[5]?.isChecked && (
                <TableCell>{formatFaNumber(item.net)}</TableCell>
            )}
        </ReviewRowShell>
    )
}

const WarehouseTabTable = () => (
    <InventoryReviewTable columns={WAREHOUSE_COLUMNS}>
        {WAREHOUSE_DUMMY.map((item) => (
            <WarehouseRow key={item.id} item={item} />
        ))}
    </InventoryReviewTable>
)

export default WarehouseTabTable
