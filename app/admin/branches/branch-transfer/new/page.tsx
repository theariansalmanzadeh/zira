import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const NewTransfer = dynamic(
    () => import('@/src/routes/branches/newTransfer/NewTransfer'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function BranchTransferNewPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <NewTransfer variant='branch-path' />
        </Suspense>
    )
}
