import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const BranchTransferDetail = dynamic(
    () =>
        import(
            '@/src/routes/branches/branchTransferDetail/BranchTransferDetail'
        ),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function BranchTransferDetailPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <BranchTransferDetail />
        </Suspense>
    )
}
