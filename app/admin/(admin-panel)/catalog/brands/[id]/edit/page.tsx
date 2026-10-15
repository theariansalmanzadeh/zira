import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const AddAndEditBrands = dynamic(
    () => import('@/src/routes/catalog/addAndEditBrands/AddAndEditBrands'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

type EditBrandPageProps = {
    params: Promise<{ id: string }>
}

export default async function EditBrandPage({ params }: EditBrandPageProps) {
    const { id } = await params

    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <div className="w-full max-w-[900px] mx-auto">
                <AddAndEditBrands id={id} />
            </div>
        </Suspense>
    )
}
