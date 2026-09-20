'use client'

import { TableCell } from '@/src/shared/components/ui/Table'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useTable } from '@/src/shared/context/TableProvider'
import { useModalStore } from '@/src/shared/store/modal-store'
import InventoryReviewTable from '../../components/InventoryReviewTable'
import ReviewRowShell from '../../components/ReviewRowShell'
import { PRODUCT_COLUMNS, PRODUCT_DUMMY } from '../constants'
import AmountCell from './AmountCell'

const ProductRow = ({ item }: { item: (typeof PRODUCT_DUMMY)[number] }) => {
    const { TableColoumn } = useTable()
    const openModal = useModalStore((state) => state.openModal)

    return (
        <ReviewRowShell>
            {TableColoumn[0]?.isChecked && <TableCell>{item.code}</TableCell>}
            {TableColoumn[1]?.isChecked && <TableCell>{item.title}</TableCell>}
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
                    <AmountCell value={item.stock} />
                </TableCell>
            )}
            {TableColoumn[5]?.isChecked && <TableCell>{item.unit}</TableCell>}
            {TableColoumn[6]?.isChecked && (
                <TableCell>
                    <button
                        type='button'
                        className='cursor-pointer text-label-lg font-medium text-primary underline'
                        onClick={() => openModal(ModalTypes.PRODUCT_DETAILS)}
                    >
                        مشخصات کالا
                    </button>
                </TableCell>
            )}
        </ReviewRowShell>
    )
}

const ProductTabTable = () => (
    <InventoryReviewTable columns={PRODUCT_COLUMNS}>
        {PRODUCT_DUMMY.map((item) => (
            <ProductRow key={item.id} item={item} />
        ))}
    </InventoryReviewTable>
)

export default ProductTabTable
