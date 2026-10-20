import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const AddAndUpdateProduct = dynamic(
    () =>
        import(
            '@/src/routes/catalog/addAndUpdateProduct/AddAndUpdateProduct'
        ),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

const Page = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params

    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <AddAndUpdateProduct id={id} />
        </Suspense>
    )
}

export default Page
