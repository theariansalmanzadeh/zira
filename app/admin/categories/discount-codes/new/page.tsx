import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const NewDiscountCode = dynamic(
    () => import('@/src/routes/categories/newDiscountCode/NewDiscountCode'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function NewDiscountCodePage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <NewDiscountCode />
        </Suspense>
    )
}
