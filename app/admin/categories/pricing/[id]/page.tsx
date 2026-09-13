import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const AddAndEditPricing = dynamic(
    () =>
        import(
            '@/src/routes/categories/pricing/addAndEditPricing/AddAndEditPricing'
        ),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function EditPricingPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <AddAndEditPricing />
        </Suspense>
    )
}
