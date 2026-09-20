'use client'

import { TableCell } from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import InventoryReviewTable from '../../components/InventoryReviewTable'
import ReviewRowShell from '../../components/ReviewRowShell'
import { CUSTOMER_COLUMNS, CUSTOMER_DUMMY } from '../constants'

const CustomerRow = ({ item }: { item: (typeof CUSTOMER_DUMMY)[number] }) => {
    const { TableColoumn } = useTable()

    return (
        <ReviewRowShell>
            {TableColoumn[0]?.isChecked && <TableCell>{item.code}</TableCell>}
            {TableColoumn[1]?.isChecked && (
                <TableCell>
                    <div className='flex flex-row items-center gap-2'>
                        <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-info-container text-label-md font-semibold text-info'>
                            {item.initial}
                        </span>
                        <span>{item.name}</span>
                    </div>
                </TableCell>
            )}
            {TableColoumn[2]?.isChecked && (
                <TableCell>{formatFaNumber(item.outgoing)}</TableCell>
            )}
            {TableColoumn[3]?.isChecked && (
                <TableCell>{formatFaNumber(item.returnOutgoing)}</TableCell>
            )}
            {TableColoumn[4]?.isChecked && (
                <TableCell>{formatFaNumber(item.net)}</TableCell>
            )}
        </ReviewRowShell>
    )
}

const CustomerTabTable = () => (
    <InventoryReviewTable columns={CUSTOMER_COLUMNS}>
        {CUSTOMER_DUMMY.map((item) => (
            <CustomerRow key={item.id} item={item} />
        ))}
    </InventoryReviewTable>
)

export default CustomerTabTable
