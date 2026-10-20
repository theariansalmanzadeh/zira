import { Suspense } from 'react'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import NewDiscountCode from '@/src/routes/catalog/newDiscountCode/NewDiscountCode'

export default function NewDiscountCodePage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <NewDiscountCode />
        </Suspense>
    )
}
