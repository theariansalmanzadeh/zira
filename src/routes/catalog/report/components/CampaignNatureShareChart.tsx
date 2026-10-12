'use client'

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import SectionTitle from '@/src/shared/components/ui/SectionTitle'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import {
    CAMPAIGN_NATURE_SHARE_DUMMY,
    type CampaignNatureShareItem,
} from './campaignReportData'

type CampaignNatureShareChartProps = {
    title?: string
    total?: number
    totalUnit?: string
    items?: CampaignNatureShareItem[]
    className?: string
}

const CampaignNatureShareChart = ({
    title = 'سهم ماهیت کمپین از فروش',
    total = 2750,
    totalUnit = 'میلیون تومان',
    items = CAMPAIGN_NATURE_SHARE_DUMMY,
    className,
}: CampaignNatureShareChartProps) => {
    return (
        <div
            className={cn(
                'rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5',
                className
            )}
            dir='rtl'
        >
            <SectionTitle>{title}</SectionTitle>

            <div className='flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between'>
                <div className='relative h-50 w-50 shrink-0'>
                    <ResponsiveContainer width='100%' height='100%'>
                        <PieChart>
                            <Pie
                                data={items}
                                dataKey='value'
                                nameKey='name'
                                cx='50%'
                                cy='50%'
                                innerRadius={62}
                                outerRadius={88}
                                strokeWidth={0}
                                paddingAngle={2}
                            >
                                {items.map((item) => (
                                    <Cell key={item.name} fill={item.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center'>
                        <span className='text-headline-md font-bold text-on-surface'>
                            {formatFaNumber(total)}
                        </span>
                        <span className='text-label-md text-outline'>
                            {totalUnit}
                        </span>
                    </div>
                </div>

                <div className='flex w-full flex-col gap-3'>
                    {items.map((item) => (
                        <div
                            key={item.name}
                            className='flex flex-row items-center justify-between gap-3'
                        >
                            <div className='flex flex-row items-center gap-2'>
                                <span
                                    className='size-2.5 shrink-0 rounded-xs'
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className='text-label-md text-on-surface'>
                                    {item.name}
                                </span>
                            </div>
                            <span className='text-label-lg font-semibold text-on-surface'>
                                {formatFaNumber(item.value)}٪
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CampaignNatureShareChart
