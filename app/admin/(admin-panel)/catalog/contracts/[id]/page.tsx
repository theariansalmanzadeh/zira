import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const AddAndEditContract = dynamic(
    () =>
        import(
            '@/src/routes/catalog/contracts/addAndEditContract/AddAndEditContract'
        ),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

type EditContractPageProps = {
    params: Promise<{ id: string }>
}

export default async function EditContractPage({ params }: EditContractPageProps) {
    const { id } = await params

    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <AddAndEditContract id={id} />
        </Suspense>
    )
}
