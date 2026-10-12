import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const AddAndUpdateVariable = dynamic(
    () =>
        import(
            '@/src/routes/catalog/variable/addAndUpdateVariable/AddAndUpdateVariable'
        ),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function NewVariablePage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <div className="mx-auto w-225">
                <AddAndUpdateVariable />
            </div>
        </Suspense>
    )
}
