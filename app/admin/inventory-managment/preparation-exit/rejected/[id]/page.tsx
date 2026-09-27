import { Suspense } from 'react'
import PreparationExitDetailRejected from '@/src/routes/inventoryManagment/preparationExit/PreparationExitDetailRejected'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

type PreparationExitPageProps = {
    params: Promise<{ id: string }>
}

export default async function RejectedPreparationExitPage({
    params,
}: PreparationExitPageProps) {
    const { id } = await params

    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <PreparationExitDetailRejected id={id} />
        </Suspense>
    )
}
