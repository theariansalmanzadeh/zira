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

export default function NewContractPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <AddAndEditContract />
        </Suspense>
    )
}
