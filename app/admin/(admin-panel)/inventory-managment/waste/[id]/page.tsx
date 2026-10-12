import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const WasteDetails = dynamic(
    () =>
        import('@/src/routes/inventoryManagment/wasteDetails/WasteDetails'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function WasteDetailsPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <WasteDetails />
        </Suspense>
    )
}
