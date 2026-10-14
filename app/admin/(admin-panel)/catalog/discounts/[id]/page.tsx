import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const NewDiscount = dynamic(
    () => import('@/src/routes/catalog/newDiscount/NewDiscount'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

type EditDiscountPageProps = {
    params: Promise<{ id: string }>
}

export default async function EditDiscountPage({ params }: EditDiscountPageProps) {
    const { id } = await params

    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <NewDiscount id={id} />
        </Suspense>
    )
}
