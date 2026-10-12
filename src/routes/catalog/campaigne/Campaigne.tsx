"use client"

import { useMemo, useState } from 'react'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import CampaigneCard from './components/CampaigneCard'
import {
    CAMPAIGNS_DUMMY,
    getCampaignDetailHref,
} from './constants'

const Campaigne = () => {
    const [statusFilter] = useState('all')

    const filteredCampaigns = useMemo(() => {
        if (statusFilter === 'all') return CAMPAIGNS_DUMMY
        return CAMPAIGNS_DUMMY.filter(
            (campaign) => campaign.status === statusFilter
        )
    }, [statusFilter])

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <TableListLayout
                value={statusFilter}
                toggleButtonValue={ROUTE_CONFIGS.campaign.TOGGLE_BUTTON_VALUE}
                isCardLayout
            >
                {filteredCampaigns.map((campaign) => (
                    <CampaigneCard
                        key={campaign.id}
                        title={campaign.title}
                        subtitle={campaign.subtitle}
                        status={campaign.statusLabel}
                        statusVariant={campaign.statusVariant}
                        discount={campaign.discount}
                        timeline={campaign.timeline}
                        visits={campaign.visits}
                        orders={campaign.orders}
                        conversionRate={campaign.conversionRate}
                        href={getCampaignDetailHref(campaign.id)}
                    />
                ))}
            </TableListLayout>
        </div>
    )
}

export default Campaigne
