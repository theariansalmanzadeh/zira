import { Suspense } from 'react'
import PreparationExitDetailArchived from '@/src/routes/inventoryManagment/preparationExit/PreparationExitDetailArchived'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

type PreparationExitPageProps = {
    params: Promise<{ id: string }>
}

export default async function ArchivedPreparationExitPage({
    params,
}: PreparationExitPageProps) {
    const { id } = await params

    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <PreparationExitDetailArchived id={id} />
        </Suspense>
    )
}
