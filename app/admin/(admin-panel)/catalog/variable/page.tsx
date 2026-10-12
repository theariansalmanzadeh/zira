import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const Variable = dynamic(
    () => import('@/src/routes/catalog/variable/Variable'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function VariablePage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <Variable />
        </Suspense>
    )
}
