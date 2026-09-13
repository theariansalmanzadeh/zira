import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const InventoryDetail = dynamic(
    () => import('@/src/routes/inventoryManagment/inventoryDetail/InventoryDetail'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

const page = () => {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <InventoryDetail />
        </Suspense>
    )
}

export default page
