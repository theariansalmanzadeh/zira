'use client'

import SectionTitle from '@/src/shared/components/ui/SectionTitle'
import { cn } from '@shared/libs/utils'
import CampaignNatureTrendChart from './CampaignNatureTrendChart'
import {
    CAMPAIGN_NATURE_TREND_DUMMY,
    COMPARISON_STATS_A_DUMMY,
    COMPARISON_STATS_B_DUMMY,
    type CampaignComparisonStat,
    type CampaignNatureTrendPoint,
} from './campaignReportData'

type ComparisonPanel = {
    title: string
    chartData?: CampaignNatureTrendPoint[]
    stats?: CampaignComparisonStat[]
    fillId?: string
}

type CamaignComparisonReportProps = {
    left?: ComparisonPanel
    right?: ComparisonPanel
    className?: string
}

const ComparisonPanelCard = ({
    title,
    chartData,
    stats = [],
    fillId,
}: ComparisonPanel) => (
    <div className='flex flex-col gap-4 rounded-card-lg border border-outline-variant bg-surface-container-lowest p-4'>
        <SectionTitle className='mb-0'>{title}</SectionTitle>
        <CampaignNatureTrendChart
            title='روند فروش'
            subtitle='به تفکیک ماهیت کمپین'
            chartData={chartData}
            fillId={fillId}
            showLegend
            className='border-0 p-0'
        />
        <div className='flex flex-col gap-3'>
            {stats.map((item) => (
                <div
                    key={item.label}
                    className='flex flex-row items-center justify-between gap-3 border-0 border-b border-outline-variant py-2 last:border-b-0'
                >
                    <span className='text-label-md text-outline-variant'>
                        {item.label}
                    </span>
                    <span className='text-label-lg font-semibold text-on-surface'>
                        {item.value}
                    </span>
                </div>
            ))}
        </div>
    </div>
)

const CamaignComparisonReport = ({
    left = {
        title: 'حراج پایان فصل پاییز',
        chartData: CAMPAIGN_NATURE_TREND_DUMMY,
        stats: COMPARISON_STATS_A_DUMMY,
        fillId: 'comparisonFillA',
    },
    right = {
        title: 'شب یلدا',
        chartData: CAMPAIGN_NATURE_TREND_DUMMY.map((point) => ({
            ...point,
            discount: Math.round(point.discount * 0.72),
            event: Math.round(point.event * 0.8),
            bundle: Math.round(point.bundle * 0.9),
        })),
        stats: COMPARISON_STATS_B_DUMMY,
        fillId: 'comparisonFillB',
    },
    className,
}: CamaignComparisonReportProps) => {
    return (
        <div className={cn('grid grid-cols-12 gap-4', className)} dir='rtl'>
            <div className='col-span-12 lg:col-span-6'>
                <ComparisonPanelCard {...left} />
            </div>
            <div className='col-span-12 lg:col-span-6'>
                <ComparisonPanelCard {...right} />
            </div>
        </div>
    )
}

export default CamaignComparisonReport
