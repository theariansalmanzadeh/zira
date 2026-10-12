'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Pill } from '@/src/shared/components/ui/Pill'
import SectionTitle from '@/src/shared/components/ui/SectionTitle'
import {
    formatFaDate,
    formatFaNumber,
    formatPrice,
} from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'

type MetricCardMeta = {
    label: string
    valueClassName?: string
}

type DetailItem = {
    label: string
    value: string
    valueClassName?: string
}

type PriceAndStockProps = {
    sellPrice?: number
    buyPrice?: number
    profitMargin?: number
    costPrice?: number
    lastPurchaseAt?: string
    lastSaleAt?: string
    stockCount?: number
    stockStatus?: 'in-stock' | 'out-of-stock'
    displayStatus?: string
    showInPublic?: boolean
    publicAudience?: string
    details?: DetailItem[]
    className?: string
}

const METRIC_META: MetricCardMeta[] = [
    { label: 'قیمت فروش', valueClassName: 'text-primary' },
    { label: 'قیمت خرید', valueClassName: 'text-on-surface' },
    { label: 'حاشیه سود', valueClassName: 'text-success' },
    { label: 'قیمت تمام شده', valueClassName: 'text-on-surface' },
    { label: 'تاریخ آخرین خرید', valueClassName: 'text-on-surface' },
    { label: 'تاریخ آخرین فروش', valueClassName: 'text-on-surface' },
    { label: 'وضعیت موجودی' },
    { label: 'وضعیت نمایش' },
    { label: 'نمایش در پابلیک', valueClassName: 'text-on-surface' },
]

const DETAILS_DUMMY: DetailItem[] = [
    { label: 'واحد اصلی', value: 'عدد' },
    { label: 'واحد فرعی', value: 'پک ۶ عددی' },
    {
        label: 'ضریب تبدیل',
        value: '۱ پک = ۶ عدد',
        valueClassName: 'text-primary',
    },
    { label: 'حداقل تعداد سفارش', value: '۱ عدد' },
    { label: 'آستانه خرید', value: 'حداقل ۱ عدد' },
    { label: 'سقف انباشت', value: 'حداکثر ۲۰ عدد' },
]


const MetricCard = ({
    label,
    children,
}: {
    label: string
    children: React.ReactNode
}) => (
    <div className='flex flex-col gap-3 rounded-card-md border border-outline-variant px-4 py-3'>
        <span className='text-label-md text-outline'>{label}</span>
        <div className='flex min-h-8 items-center'>{children}</div>
    </div>
)

const PriceAndStock = ({
    sellPrice = 485000,
    buyPrice = 301000,
    profitMargin = 38,
    costPrice = 325000,
    lastPurchaseAt = '2025-10-27T00:00:00.000Z',
    lastSaleAt = '2025-12-05T00:00:00.000Z',
    stockCount = 124,
    stockStatus = 'in-stock',
    displayStatus = 'نمایش عمومی',
    showInPublic = true,
    publicAudience = 'همه مشتریان',
    details = DETAILS_DUMMY,
    className,
}: PriceAndStockProps) => {
    const metricValues: React.ReactNode[] = [
        <span
            key='sell'
            className={cn(
                'text-title-md font-bold',
                METRIC_META[0].valueClassName
            )}
        >
            <span className='inline-flex items-center gap-1'>
                {formatPrice(sellPrice)}
                <Icon label='currency' className='size-5 text-outline' />
            </span>
        </span>,
        <span
            key='buy'
            className={cn(
                'text-title-md font-bold',
                METRIC_META[1].valueClassName
            )}
        >
            <span className='inline-flex items-center gap-1'>
                {formatPrice(buyPrice)}
                <Icon label='currency' className='size-5 text-outline' />
            </span>
        </span>,
        <span
            key='margin'
            className={cn(
                'text-title-md font-bold',
                METRIC_META[2].valueClassName
            )}
        >
            {formatFaNumber(profitMargin)}٪
        </span>,
        <span
            key='cost'
            className={cn(
                'text-title-md font-bold',
                METRIC_META[3].valueClassName
            )}
        >
            <span className='inline-flex items-center gap-1'>
                {formatPrice(costPrice)}
                <Icon label='currency' className='size-5 text-outline' />
            </span>
        </span>,
        <span
            key='last-buy'
            className={cn(
                'text-title-md font-bold',
                METRIC_META[4].valueClassName
            )}
        >
            {formatFaDate(lastPurchaseAt)}
        </span>,
        <span
            key='last-sale'
            className={cn(
                'text-title-md font-bold',
                METRIC_META[5].valueClassName
            )}
        >
            {formatFaDate(lastSaleAt)}
        </span>,
        <div key='stock' className='flex flex-wrap items-center gap-2'>
            <Pill
                text={stockStatus === 'in-stock' ? 'موجود' : 'ناموجود'}
                variant={stockStatus === 'in-stock' ? 'success' : 'error'}
                hasDot
                className='border-0'
            />
            <span className='text-title-md font-bold text-on-surface'>
                {formatFaNumber(stockCount)} عدد
            </span>
        </div>,
        <Pill
            key='display'
            text={displayStatus}
            variant='success'
            className='border-0'
        />,
        <div key='public' className='flex flex-col gap-0.5'>
            <span
                className={cn(
                    'text-title-md font-bold',
                    METRIC_META[8].valueClassName
                )}
            >
                {showInPublic ? 'بله' : 'خیر'}
            </span>
            <span className='text-label-md text-outline'>{publicAudience}</span>
        </div>,
    ]

    return (
        <div
            className={cn(
                'rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5',
                className
            )}
            dir='rtl'
        >
            <SectionTitle>قیمت و موجودی</SectionTitle>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
                {METRIC_META.map((item, index) => (
                    <MetricCard key={item.label} label={item.label}>
                        {metricValues[index]}
                    </MetricCard>
                ))}
            </div>

            <div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-4 border-0 border-t border-surface-container-high pt-5 sm:grid-cols-3'>
                {details.map((item) => (
                    <div key={item.label} className='flex flex-col gap-1'>
                        <span className='text-label-md text-outline'>
                            {item.label}
                        </span>
                        <span
                            className={cn(
                                'text-label-lg font-semibold text-on-surface',
                                item.valueClassName
                            )}
                        >
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PriceAndStock
