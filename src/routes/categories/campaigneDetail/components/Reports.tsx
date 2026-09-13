'use client'

import {
    Area,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ComposedChart,
    LabelList,
    Line,
    Pie,
    PieChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts'
import { Icon } from '@/src/shared/components/Icons/Icon'
import SummaryCard from '@/src/shared/components/ui/SummaryCard'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import type { IconLabel } from '@/src/shared/types/icon'

export type ReportMetric = {
    label: string
    value: string
    change: number
}

export type DailyTrendPoint = {
    day: string
    sales: number
    visits: number
}

export type CategoryShareItem = {
    name: string
    value: number
    color: string
}

export type TopProductItem = {
    name: string
    value: number
}

type ReportsProps = {
    title?: string
    subtitle?: string
    metrics?: ReportMetric[]
    chartTitle?: string
    chartSubtitle?: string
    chartData?: DailyTrendPoint[]
    categoryShareTitle?: string
    categoryShareTotal?: number
    categoryShare?: CategoryShareItem[]
    topProductsTitle?: string
    topProductsSubtitle?: string
    topProducts?: TopProductItem[]
}

export const REPORT_METRICS_DUMMY: ReportMetric[] = [
    { label: 'فروش کمپین', value: '۸۲۰ میلیون ت', change: 24 },
    { label: 'سفارش', value: '۲,۴۱۰', change: 18 },
    { label: 'نرخ تبدیل', value: '۴٫۸٪', change: 0.9 },
    { label: 'مصرف بودجه', value: '۶۸٪', change: -12 },
]

export const DAILY_TREND_DUMMY: DailyTrendPoint[] = [
    { day: 'روز ۱', sales: 40, visits: 90 },
    { day: 'روز ۳', sales: 55, visits: 120 },
    { day: 'روز ۵', sales: 70, visits: 150 },
    { day: 'روز ۷', sales: 85, visits: 175 },
    { day: 'روز ۹', sales: 100, visits: 210 },
    { day: 'روز ۱۱', sales: 118, visits: 245 },
    { day: 'روز ۱۳', sales: 135, visits: 275 },
    { day: 'روز ۱۵', sales: 152, visits: 304 },
]

export const CATEGORY_SHARE_DUMMY: CategoryShareItem[] = [
    { name: 'لباس زیر زنانه', value: 45, color: 'var(--color-primary)' },
    { name: 'لباس خواب', value: 28, color: 'var(--color-primary-container)' },
    { name: 'جوراب و ساق', value: 19, color: 'var(--color-info)' },
    { name: 'سایر', value: 8, color: 'var(--color-warning)' },
]

export const TOP_PRODUCTS_DUMMY: TopProductItem[] = [
    { name: 'شورت مدل رز', value: 74 },
    { name: 'تاپ کشی مودال', value: 96 },
    { name: 'جوراب ۶ عددی', value: 132 },
    { name: 'ست لباس خواب ساتن', value: 156 },
    { name: 'سوتین نخی لوسی', value: 212 },
]

const MetricTrend = ({ value }: { value: number }) => {
    const isNegative = value < 0
    const iconLabel: IconLabel = isNegative
        ? 'arrowDownward400Linear'
        : 'arrowUpward400Linear'
    const toneClassName = isNegative ? 'text-error' : 'text-success'

    return (
        <div className={cn('flex items-center gap-1', toneClassName)}>
            <Icon label={iconLabel} className={cn('size-4!', toneClassName)} />
            <span className='text-label-md'>
                {formatFaNumber(Math.abs(value))}٪ نسبت به دوره قبل
            </span>
        </div>
    )
}

const SectionTitle = ({
    title,
    subtitle,
}: {
    title: string
    subtitle?: string
}) => (
    <div className='mb-4 flex flex-col gap-1'>
        <div className='flex items-center gap-2'>
            <span className='h-4 w-1 shrink-0 rounded-full bg-primary' />
            <h3 className='text-title-md font-bold text-on-surface'>{title}</h3>
        </div>
        {subtitle && (
            <p className='pr-3 text-label-md text-outline'>{subtitle}</p>
        )}
    </div>
)

const CategoryShareCard = ({
    title,
    total,
    items,
}: {
    title: string
    total: number
    items: CategoryShareItem[]
}) => (
    <div className='rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5'>
        <SectionTitle title={title} />
        <div className='flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between'>
            <div className='relative h-[200px] w-[200px] shrink-0'>
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
                    <span className='text-label-md text-outline'>عدد</span>
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
                                className='size-2.5 shrink-0 rounded-full'
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

const TopProductsCard = ({
    title,
    subtitle,
    items,
}: {
    title: string
    subtitle: string
    items: TopProductItem[]
}) => {
    const maxValue = Math.max(...items.map((item) => item.value))

    return (
        <div className='rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5'>
            <SectionTitle title={title} subtitle={subtitle} />
            <div className='h-[240px] w-full'>
                <ResponsiveContainer width='100%' height='100%'>
                    <BarChart
                        data={items}
                        margin={{ top: 24, right: 8, left: 8, bottom: 8 }}
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
                        <Bar dataKey='value' radius={[12, 12, 0, 0]} maxBarSize={42}>
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

const Reports = ({
    title = 'گزارش عملکرد کمپین',
    subtitle = 'روند فروش، بازدید و نرخ تبدیل کمپین «حراج پایان فصل پاییز».',
    metrics = REPORT_METRICS_DUMMY,
    chartTitle = 'روند روزانه کمپین',
    chartSubtitle = 'مقایسه فروش با بازدید',
    chartData = DAILY_TREND_DUMMY,
    categoryShareTitle = 'سهم دسته‌بندی از فروش کمپین',
    categoryShareTotal = 750,
    categoryShare = CATEGORY_SHARE_DUMMY,
    topProductsTitle = 'پرفروش‌ترین کالاهای کمپین',
    topProductsSubtitle = 'واحد: عدد',
    topProducts = TOP_PRODUCTS_DUMMY,
}: ReportsProps) => {
    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-title-md font-bold text-on-surface'>
                        {title}
                    </h2>
                    <p className='text-label-md text-outline'>{subtitle}</p>
                </div>

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
                                        {metric.value}
                                    </SummaryCard.Value>
                                </SummaryCard.ValueRow>
                            </SummaryCard.Body>
                            <SummaryCard.Footer className='mt-3 w-full justify-start'>
                                <MetricTrend value={metric.change} />
                            </SummaryCard.Footer>
                        </SummaryCard>
                    ))}
                </div>
            </div>

            <div className='rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5'>
                <div className='mb-4 flex flex-row items-start justify-between gap-3'>
                    <div className='flex flex-col gap-1'>
                        <SectionTitle title={chartTitle} />
                        <p className='pr-3 text-label-md text-outline'>
                            {chartSubtitle}
                        </p>
                    </div>
                    <div className='flex flex-row items-center gap-4'>
                        <div className='flex flex-row items-center gap-1.5'>
                            <span className='h-0.5 w-4 rounded-full bg-primary' />
                            <span className='text-label-sm text-outline'>
                                فروش (میلیون)
                            </span>
                        </div>
                        <div className='flex flex-row items-center gap-1.5'>
                            <span className='h-0.5 w-4 rounded-full bg-info' />
                            <span className='text-label-sm text-outline'>
                                بازدید (x100)
                            </span>
                        </div>
                    </div>
                </div>

                <div className='h-[280px] w-full'>
                    <ResponsiveContainer width='100%' height='100%'>
                        <ComposedChart
                            data={chartData}
                            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient
                                    id='campaignSalesFill'
                                    x1='0'
                                    y1='0'
                                    x2='0'
                                    y2='1'
                                >
                                    <stop
                                        offset='0%'
                                        stopColor='var(--color-primary)'
                                        stopOpacity={0.28}
                                    />
                                    <stop
                                        offset='100%'
                                        stopColor='var(--color-primary)'
                                        stopOpacity={0.02}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray='4 4'
                                vertical={false}
                                stroke='var(--color-outline-variant)'
                            />
                            <XAxis
                                dataKey='day'
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: 'var(--color-outline)',
                                    fontSize: 12,
                                }}
                                reversed
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                orientation='right'
                                tick={{
                                    fill: 'var(--color-outline)',
                                    fontSize: 12,
                                }}
                                width={36}
                            />
                            <Area
                                type='monotone'
                                dataKey='sales'
                                stroke='var(--color-primary)'
                                fill='url(#campaignSalesFill)'
                                strokeWidth={2}
                                dot={{
                                    r: 4,
                                    fill: 'var(--color-surface-container-lowest)',
                                    stroke: 'var(--color-primary)',
                                    strokeWidth: 2,
                                }}
                                activeDot={{ r: 5 }}
                            />
                            <Line
                                type='monotone'
                                dataKey='visits'
                                stroke='var(--color-info)'
                                strokeWidth={2}
                                dot={{
                                    r: 4,
                                    fill: 'var(--color-surface-container-lowest)',
                                    stroke: 'var(--color-info)',
                                    strokeWidth: 2,
                                }}
                                activeDot={{ r: 5 }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                <CategoryShareCard
                    title={categoryShareTitle}
                    total={categoryShareTotal}
                    items={categoryShare}
                />
                <TopProductsCard
                    title={topProductsTitle}
                    subtitle={topProductsSubtitle}
                    items={topProducts}
                />
            </div>
        </div>
    )
}

export default Reports
