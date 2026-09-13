'use client'

import {
    Area,
    CartesianGrid,
    ComposedChart,
    Line,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts'
import SectionTitle from '@/src/shared/components/ui/SectionTitle'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import {
    CAMPAIGN_NATURE_TREND_DUMMY,
    type CampaignNatureTrendPoint,
} from './campaignReportData'

const CHART_LEGEND = [
    { label: 'تخفیفی', color: 'var(--color-primary)' },
    { label: 'مناسبتی', color: 'var(--color-info)' },
    { label: 'باندل', color: 'var(--color-success)' },
] as const

type CampaignNatureTrendChartProps = {
    title?: string
    subtitle?: string
    chartData?: CampaignNatureTrendPoint[]
    fillId?: string
    showLegend?: boolean
    className?: string
}

const CampaignNatureTrendChart = ({
    title = 'روند فروش کمپین‌ها به تفکیک ماهیت',
    subtitle = 'مقایسه تجمیعی سه ماهیت اصلی کمپین',
    chartData = CAMPAIGN_NATURE_TREND_DUMMY,
    fillId = 'campaignDiscountFill',
    showLegend = true,
    className,
}: CampaignNatureTrendChartProps) => {
    return (
        <div
            className={cn(
                'rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5',
                className
            )}
            dir='rtl'
        >
            <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
                <div className='flex flex-col gap-1'>
                    <SectionTitle className='mb-0'>{title}</SectionTitle>
                    {subtitle && (
                        <p className='pr-3 text-label-md text-outline'>
                            {subtitle}
                        </p>
                    )}
                </div>
                {showLegend && (
                    <div className='flex flex-row flex-wrap items-center gap-4'>
                        {CHART_LEGEND.map((item) => (
                            <div
                                key={item.label}
                                className='flex flex-row items-center gap-1.5'
                            >
                                <span
                                    className='size-2.5 rounded-full'
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className='text-label-sm text-outline'>
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className='h-[240px] w-full'>
                <ResponsiveContainer width='100%' height='100%'>
                    <ComposedChart
                        data={chartData}
                        margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id={fillId}
                                x1='0'
                                y1='0'
                                x2='0'
                                y2='1'
                            >
                                <stop
                                    offset='5%'
                                    stopColor='var(--color-primary)'
                                    stopOpacity={0.25}
                                />
                                <stop
                                    offset='95%'
                                    stopColor='var(--color-primary)'
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            vertical={false}
                            stroke='var(--color-outline-variant)'
                            strokeDasharray='4 4'
                        />
                        <XAxis
                            dataKey='month'
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: 'var(--color-outline)',
                                fontSize: 12,
                            }}
                        />
                        <YAxis
                            orientation='right'
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: 'var(--color-outline)',
                                fontSize: 12,
                            }}
                            tickFormatter={(value) =>
                                formatFaNumber(Number(value))
                            }
                        />
                        <Area
                            type='monotone'
                            dataKey='discount'
                            stroke='none'
                            fill={`url(#${fillId})`}
                        />
                        <Line
                            type='monotone'
                            dataKey='discount'
                            stroke='var(--color-primary)'
                            strokeWidth={2.5}
                            dot={{
                                r: 3,
                                strokeWidth: 2,
                                fill: 'var(--color-surface-container-lowest)',
                            }}
                            activeDot={{ r: 4 }}
                        />
                        <Line
                            type='monotone'
                            dataKey='event'
                            stroke='var(--color-info)'
                            strokeWidth={2.5}
                            dot={{
                                r: 3,
                                strokeWidth: 2,
                                fill: 'var(--color-surface-container-lowest)',
                            }}
                            activeDot={{ r: 4 }}
                        />
                        <Line
                            type='monotone'
                            dataKey='bundle'
                            stroke='var(--color-success)'
                            strokeWidth={2.5}
                            dot={{
                                r: 3,
                                strokeWidth: 2,
                                fill: 'var(--color-surface-container-lowest)',
                            }}
                            activeDot={{ r: 4 }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default CampaignNatureTrendChart
