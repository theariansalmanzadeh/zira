import { Suspense } from 'react'
import PreparationExitDetailInPerson from '@/src/routes/inventoryManagment/preparationExit/PreparationExitDetailInPerson'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

type PreparationExitPageProps = {
    params: Promise<{ id: string }>
}

export default async function InPersonPreparationExitPage({
    params,
}: PreparationExitPageProps) {
    const { id } = await params

    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <PreparationExitDetailInPerson id={id} />
        </Suspense>
    )
}
