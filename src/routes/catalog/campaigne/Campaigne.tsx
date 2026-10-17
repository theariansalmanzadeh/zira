'use client'

import { useSearchParams } from 'next/navigation'
import type { VariantProps } from 'class-variance-authority'
import type { CampaignOut, CampaignStatusEnum } from '@/src/api/types/admin/pricing'
import { useListCampaigns } from '@/src/routes/catalog/hooks/pricing'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import { formatFaDate, formatFaNumber } from '@/src/shared/libs/formatter'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { Spinner } from '@/src/shared/components/ui/spinner'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import { PillVariants } from '@/src/shared/components/ui/Pill'
import CampaigneCard from './components/CampaigneCard'
import { getCampaignDetailHref } from './constants'

const STATUS_BY_FILTER: Record<string, CampaignStatusEnum> = {
    active: 'PUBLISHED',
    inactive: 'DISABLED',
    archive: 'ARCHIVED',
    draft: 'DRAFT',
}

const STATUS_LABEL: Record<CampaignStatusEnum, string> = {
    DRAFT: 'پیش‌نویس',
    PUBLISHED: 'فعال',
    DISABLED: 'غیرفعال',
    ARCHIVED: 'آرشیو',
}

const STATUS_VARIANT: Record<
    CampaignStatusEnum,
    VariantProps<typeof PillVariants>['variant']
> = {
    DRAFT: 'warning',
    PUBLISHED: 'success',
    DISABLED: 'error',
    ARCHIVED: 'tonal',
}

const campaignTimeline = (campaign: CampaignOut) =>
    `${formatFaDate(campaign.starts_at)} تا ${formatFaDate(campaign.ends_at)}`

const Campaigne = () => {
    const searchParams = useSearchParams()
    const category = searchParams.get('cat') ?? 'all'
    const status = STATUS_BY_FILTER[category]
    const { data, isPending } = useListCampaigns({
        page: 1,
        page_size: 100,
        status,
    })
    const campaigns: CampaignOut[] = data?.results ?? []

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                value={category}
                toggleButtonValue={ROUTE_CONFIGS.campaign.TOGGLE_BUTTON_VALUE}
                isCardLayout
            >
                {isPending ? (
                    <div className='flex justify-center py-10'>
                        <Spinner className='size-6' />
                    </div>
                ) : campaigns.length === 0 ? (
                    <TableEmptyState title='کمپینی یافت نشد.' />
                ) : (
                    campaigns.map((campaign) => (
                        <CampaigneCard
                            key={campaign.id}
                            title={campaign.name}
                            subtitle={campaign.nature_display}
                            status={STATUS_LABEL[campaign.status]}
                            statusVariant={STATUS_VARIANT[campaign.status]}
                            discount={formatFaNumber(campaign.discount_count)}
                            timeline={campaignTimeline(campaign)}
                            visits='—'
                            orders='—'
                            conversionRate='—'
                            href={getCampaignDetailHref(campaign.id)}
                        />
                    ))
                )}
            </TableListLayout>
        </div>
    )
}

export default Campaigne
