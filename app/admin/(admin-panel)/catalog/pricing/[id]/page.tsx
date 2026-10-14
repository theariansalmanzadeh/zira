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

type EditPricingPageProps = {
    params: Promise<{ id: string }>
}

export default async function EditPricingPage({ params }: EditPricingPageProps) {
    const { id } = await params

    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <AddAndUpdatePricing id={id} />
        </Suspense>
    )
}
