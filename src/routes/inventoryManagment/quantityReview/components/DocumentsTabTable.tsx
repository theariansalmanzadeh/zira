'use client'

import { TableCell } from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import InventoryReviewTable from '../../components/InventoryReviewTable'
import ReviewRowShell from '../../components/ReviewRowShell'
import { DOCUMENTS_COLUMNS, DOCUMENTS_DUMMY } from '../constants'

const DocumentsRow = ({
    item,
}: {
    item: (typeof DOCUMENTS_DUMMY)[number]
}) => {
    const { TableColoumn } = useTable()

    return (
        <ReviewRowShell>
            {TableColoumn[0]?.isChecked && <TableCell>{item.date}</TableCell>}
            {TableColoumn[1]?.isChecked && <TableCell>{item.number}</TableCell>}
            {TableColoumn[2]?.isChecked && (
                <TableCell>{item.warehouseCode}</TableCell>
            )}
            {TableColoumn[3]?.isChecked && (
                <TableCell>{item.warehouseName}</TableCell>
            )}
            {TableColoumn[4]?.isChecked && (
                <TableCell>{item.destinationCode}</TableCell>
            )}
            {TableColoumn[5]?.isChecked && (
                <TableCell>{item.destinationName}</TableCell>
            )}
            {TableColoumn[6]?.isChecked && (
                <TableCell>{item.document}</TableCell>
            )}
            {TableColoumn[7]?.isChecked && <TableCell>{item.type}</TableCell>}
        </ReviewRowShell>
    )
}

const DocumentsTabTable = () => (
    <InventoryReviewTable columns={DOCUMENTS_COLUMNS}>
        {DOCUMENTS_DUMMY.map((item) => (
            <DocumentsRow key={item.id} item={item} />
        ))}
    </InventoryReviewTable>
)

export default DocumentsTabTable
