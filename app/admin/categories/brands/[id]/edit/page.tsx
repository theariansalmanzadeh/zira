import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const AddAndEditBrands = dynamic(
    () => import('@/src/routes/categories/addAndEditBrands/AddAndEditBrands'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function EditBrandPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <div className="w-full max-w-[900px] mx-auto">
                <AddAndEditBrands />
            </div>
        </Suspense>
    )
}
