import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const Report = dynamic(
    () => import('@/src/routes/categories/report/Report'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function CategoriesReportPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <Report />
        </Suspense>
    )
}
