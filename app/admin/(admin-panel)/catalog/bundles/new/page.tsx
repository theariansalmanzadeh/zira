import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const CreateAndUpdateBundle = dynamic(
    () =>
        import(
            '@/src/routes/catalog/bundle/createAndUpdateBundle/CreateAndUpdateBundle'
        ),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function CreateBundlePage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <CreateAndUpdateBundle />
        </Suspense>
    )
}
