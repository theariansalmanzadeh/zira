import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const NewDiscount = dynamic(
    () => import('@/src/routes/categories/newDiscount/NewDiscount'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function NewCategoryPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <NewDiscount />
        </Suspense>
    )
}
