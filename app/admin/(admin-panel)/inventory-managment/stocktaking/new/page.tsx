import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const AddAndUpdateStockTaking = dynamic(
    () =>
        import(
            '@/src/routes/inventoryManagment/addAndUpdateStockTaking/AddAndUpdateStockTaking'
        ),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function NewStockTakingPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <AddAndUpdateStockTaking />
        </Suspense>
    )
}
