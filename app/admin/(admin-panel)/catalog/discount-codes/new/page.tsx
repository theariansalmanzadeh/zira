import { Suspense } from 'react'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import NewDiscount from '@/src/routes/catalog/newDiscount/NewDiscount'

export default function NewDiscountCodePage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <NewDiscount />
        </Suspense>
    )
}
