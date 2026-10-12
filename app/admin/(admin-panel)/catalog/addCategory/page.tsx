import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const AddNewCategory = dynamic(
    () => import('@/src/routes/catalog/addNewCategory/AddNewCategory'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function AddCategoryPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <AddNewCategory />
        </Suspense>
    )
}
