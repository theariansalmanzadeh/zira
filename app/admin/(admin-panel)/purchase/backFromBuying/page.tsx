import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const BackFromBuying = dynamic(
    () => import('@/src/routes/puchase/backFromBuying/BackFromBuying'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function BackFromBuyingPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <BackFromBuying />
        </Suspense>
    )
}
