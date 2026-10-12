import { Suspense } from 'react'
import PreparationExitDetailOnline from '@/src/routes/inventoryManagment/preparationExit/PreparationExitDetailOnline'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

type PreparationExitPageProps = {
    params: Promise<{ id: string }>
}

export default async function OnlinePreparationExitPage({
    params,
}: PreparationExitPageProps) {
    const { id } = await params

    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <PreparationExitDetailOnline id={id} />
        </Suspense>
    )
}
