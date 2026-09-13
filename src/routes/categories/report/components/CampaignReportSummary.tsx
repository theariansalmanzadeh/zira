'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import SummaryCard from '@/src/shared/components/ui/SummaryCard'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import type { IconLabel } from '@/src/shared/types/icon'
import CampaignNatureTrendChart from './CampaignNatureTrendChart'
import {
    CAMPAIGN_NATURE_TREND_DUMMY,
    CAMPAIGN_REPORT_METRICS_DUMMY,
    type CampaignNatureTrendPoint,
    type CampaignReportMetric,
} from './campaignReportData'

type CampaignReportSummaryProps = {
    metrics?: CampaignReportMetric[]
    chartTitle?: string
    chartSubtitle?: string
    chartData?: CampaignNatureTrendPoint[]
    className?: string
}

const formatMetricValue = (metric: CampaignReportMetric) => {
    const formatted = formatFaNumber(metric.value)
    return metric.valueFormat === 'percent' ? `${formatted}٪` : formatted
}

const MetricTrend = ({
    value,
    suffix = 'percent',
}: {
    value: number
    suffix?: 'percent' | 'items'
}) => {
    const isNegative = value < 0
    const iconLabel: IconLabel = isNegative
        ? 'arrowDownward400Linear'
        : 'arrowUpward400Linear'
    const toneClassName = isNegative ? 'text-error' : 'text-success'
    const amount = formatFaNumber(Math.abs(value))
    const changeText =
        suffix === 'items'
            ? `${amount} قلم نسبت به دوره قبل`
            : `${amount}٪ نسبت به دوره قبل`

    return (
        <div className={cn('flex items-center gap-1', toneClassName)}>
            <Icon label={iconLabel} className={cn('size-4!', toneClassName)} />
            <span className='text-label-md'>{changeText}</span>
        </div>
    )
}

const CampaignReportSummary = ({
    metrics = CAMPAIGN_REPORT_METRICS_DUMMY,
    chartTitle = 'روند فروش کمپین‌ها به تفکیک ماهیت',
    chartSubtitle = 'مقایسه تجمیعی سه ماهیت اصلی کمپین',
    chartData = CAMPAIGN_NATURE_TREND_DUMMY,
    className,
}: CampaignReportSummaryProps) => {
    return (
        <div className={cn('flex flex-col gap-4', className)} dir='rtl'>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4'>
                {metrics.map((metric) => (
                    <SummaryCard
                        key={metric.label}
                        className='min-w-0 grow border border-outline-variant'
                    >
                        <SummaryCard.Body className='mt-0'>
                            <SummaryCard.BodyTitle>
                                {metric.label}
                            </SummaryCard.BodyTitle>
                            <SummaryCard.ValueRow>
                                <SummaryCard.Value className='text-headline-md!'>
                                    {formatMetricValue(metric)}
                                </SummaryCard.Value>
                            </SummaryCard.ValueRow>
                        </SummaryCard.Body>
                        <SummaryCard.Footer className='mt-3 w-full justify-start'>
                            <MetricTrend
                                value={metric.change}
                                suffix={metric.changeSuffix}
                            />
                        </SummaryCard.Footer>
                    </SummaryCard>
                ))}
            </div>

            <CampaignNatureTrendChart
                title={chartTitle}
                subtitle={chartSubtitle}
                chartData={chartData}
            />
        </div>
    )
}

export default CampaignReportSummary
export type { CampaignReportMetric, CampaignNatureTrendPoint }
