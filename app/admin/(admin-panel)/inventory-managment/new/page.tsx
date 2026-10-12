import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const AddAndUpdateInventory = dynamic(
    () =>
        import(
            '@/src/routes/inventoryManagment/addAndUpdateInventory/AddAndUpdateInventory'
        ),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function NewInventoryPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <AddAndUpdateInventory />
        </Suspense>
    )
}
