'use client'

import {
    Bar,
    BarChart,
    Cell,
    LabelList,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts'
import SectionTitle from '@/src/shared/components/ui/SectionTitle'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import {
    CAMPAIGN_SALES_BARS_DUMMY,
    type CampaignSalesBarItem,
} from './campaignReportData'

type CampaignSalesChartProps = {
    title?: string
    subtitle?: string
    items?: CampaignSalesBarItem[]
    className?: string
}

const CampaignSalesChart = ({
    title = 'فروش هر کمپین',
    subtitle = 'واحد: میلیون تومان',
    items = CAMPAIGN_SALES_BARS_DUMMY,
    className,
}: CampaignSalesChartProps) => {
    const maxValue = Math.max(...items.map((item) => item.value))

    return (
        <div
            className={cn(
                'rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5',
                className
            )}
            dir='rtl'
        >
            <div className='mb-4 flex flex-col gap-1'>
                <SectionTitle className='mb-0'>{title}</SectionTitle>
                <p className='pr-3 text-label-md text-outline'>{subtitle}</p>
            </div>

            <div className='h-[280px] w-full'>
                <ResponsiveContainer width='100%' height='100%'>
                    <BarChart
                        data={items}
                        margin={{ top: 28, right: 8, left: 8, bottom: 8 }}
                        barCategoryGap='28%'
                    >
                        <XAxis
                            dataKey='name'
                            axisLine={false}
                            tickLine={false}
                            interval={0}
                            tick={{
                                fill: 'var(--color-outline)',
                                fontSize: 11,
                            }}
                        />
                        <YAxis hide />
                        <Bar
                            dataKey='value'
                            radius={[16, 16, 16, 16]}
                            maxBarSize={48}
                        >
                            {items.map((item) => (
                                <Cell
                                    key={item.name}
                                    fill={
                                        item.value === maxValue
                                            ? 'var(--color-primary)'
                                            : 'var(--color-primary-container)'
                                    }
                                />
                            ))}
                            <LabelList
                                dataKey='value'
                                position='top'
                                formatter={(value) =>
                                    formatFaNumber(Number(value))
                                }
                                style={{
                                    fill: 'var(--color-on-surface)',
                                    fontSize: 12,
                                    fontWeight: 600,
                                }}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default CampaignSalesChart
