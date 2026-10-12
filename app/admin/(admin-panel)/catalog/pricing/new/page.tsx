import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const AddAndEditPricing = dynamic(
    () =>
        import(
            '@/src/routes/catalog/pricing/addAndEditPricing/AddAndEditPricing'
        ),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function NewPricingPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <AddAndEditPricing />
        </Suspense>
    )
}
