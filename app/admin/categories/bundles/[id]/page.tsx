import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const CreateAndUpdateBundle = dynamic(
    () =>
        import(
            '@/src/routes/categories/bundle/createAndUpdateBundle/CreateAndUpdateBundle'
        ),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

type BundleByIdPageProps = {
    params: Promise<{ id: string }>
}

export default async function BundleByIdPage({ params }: BundleByIdPageProps) {
    const { id } = await params

    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <CreateAndUpdateBundle id={id} />
        </Suspense>
    )
}
