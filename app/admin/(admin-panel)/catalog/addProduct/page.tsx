import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const AddProducts = dynamic(
    () => import('@/src/routes/catalog/addProducts/AddProducts'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

const Page = () => {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <AddProducts />
        </Suspense>
    )
}

export default Page
