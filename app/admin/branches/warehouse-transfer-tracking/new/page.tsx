import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const NewTransfer = dynamic(
    () => import('@/src/routes/branches/newTransfer/NewTransfer'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function WarehouseTransferNewPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <NewTransfer variant='location-path' />
        </Suspense>
    )
}
