import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const AddAndUpdatePricing = dynamic(
    () =>
        import(
            '@/src/routes/catalog/pricing/addAndUpdatePricing/AddAndUpdatePricing'
        ),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function NewPricingPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <AddAndUpdatePricing />
        </Suspense>
    )
}
