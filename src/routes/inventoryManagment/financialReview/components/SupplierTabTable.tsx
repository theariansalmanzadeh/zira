'use client'

import { TableCell } from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import InventoryReviewTable from '../../components/InventoryReviewTable'
import ReviewRowShell from '../../components/ReviewRowShell'
import { SUPPLIER_COLUMNS, SUPPLIER_DUMMY } from '../constants'
import AmountCell from './AmountCell'

const SupplierRow = ({ item }: { item: (typeof SUPPLIER_DUMMY)[number] }) => {
    const { TableColoumn } = useTable()

    return (
        <ReviewRowShell>
            {TableColoumn[0]?.isChecked && <TableCell>{item.code}</TableCell>}
            {TableColoumn[1]?.isChecked && <TableCell>{item.name}</TableCell>}
            {TableColoumn[2]?.isChecked && (
                <TableCell>
                    <AmountCell value={item.receipt} />
                </TableCell>
            )}
            {TableColoumn[3]?.isChecked && (
                <TableCell>
                    <AmountCell value={item.returnReceipt} />
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

const SupplierTabTable = () => (
    <InventoryReviewTable columns={SUPPLIER_COLUMNS}>
        {SUPPLIER_DUMMY.map((item) => (
            <SupplierRow key={item.id} item={item} />
        ))}
    </InventoryReviewTable>
)

export default SupplierTabTable
