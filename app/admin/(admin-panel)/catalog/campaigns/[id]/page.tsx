import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const CampaigneDetail = dynamic(
    () => import('@/src/routes/catalog/campaigneDetail/CampaigneDetail'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

type CampaignDetailByIdPageProps = {
    params: Promise<{ id: string }>
}

export default async function CampaignDetailByIdPage({
    params,
}: CampaignDetailByIdPageProps) {
    const { id } = await params

    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <CampaigneDetail id={id} />
        </Suspense>
    )
}
