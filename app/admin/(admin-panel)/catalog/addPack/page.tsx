import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const AddAndUpdatePack = dynamic(
    () => import('@/src/routes/catalog/addAndUpdatePack/addAndUpdatePack'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

const Page = () => {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <AddAndUpdatePack />
        </Suspense>
    )
}

export default Page
