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

export type DetailItem = {
    label: string
    value: string
    valueClassName?: string
}

export type PriceAndStockProps = {
    sellPrice?: number | null
    buyPrice?: number | null
    profitMargin?: number | null
    costPrice?: number | null
    lastPurchaseAt?: string | null
    lastSaleAt?: string | null
    stockCount?: number | null
    stockStatus?: 'in-stock' | 'out-of-stock' | null
    displayStatus?: string | null
    showInPublic?: boolean | null
    publicAudience?: string | null
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

const DASH = '—'

const hasValue = (value: unknown) =>
    value !== undefined && value !== null && value !== ''

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

const PriceValue = ({
    value,
    className,
}: {
    value?: number | null
    className?: string
}) => {
    if (!hasValue(value)) {
        return (
            <span className={cn('text-title-md font-bold', className)}>
                {DASH}
            </span>
        )
    }

    return (
        <span className={cn('text-title-md font-bold', className)}>
            <span className='inline-flex items-center gap-1'>
                {formatPrice(Number(value))}
                <Icon label='currency' className='size-5 text-outline' />
            </span>
        </span>
    )
}

const PriceAndStock = ({
    sellPrice,
    buyPrice,
    profitMargin,
    costPrice,
    lastPurchaseAt,
    lastSaleAt,
    stockCount,
    stockStatus,
    displayStatus,
    showInPublic,
    publicAudience,
    details = [],
    className,
}: PriceAndStockProps) => {
    const metricValues: React.ReactNode[] = [
        <PriceValue
            key='sell'
            value={sellPrice}
            className={METRIC_META[0].valueClassName}
        />,
        <PriceValue
            key='buy'
            value={buyPrice}
            className={METRIC_META[1].valueClassName}
        />,
        <span
            key='margin'
            className={cn(
                'text-title-md font-bold',
                METRIC_META[2].valueClassName
            )}
        >
            {hasValue(profitMargin)
                ? `${formatFaNumber(Number(profitMargin))}٪`
                : DASH}
        </span>,
        <PriceValue
            key='cost'
            value={costPrice}
            className={METRIC_META[3].valueClassName}
        />,
        <span
            key='last-buy'
            className={cn(
                'text-title-md font-bold',
                METRIC_META[4].valueClassName
            )}
        >
            {hasValue(lastPurchaseAt) ? formatFaDate(String(lastPurchaseAt)) : DASH}
        </span>,
        <span
            key='last-sale'
            className={cn(
                'text-title-md font-bold',
                METRIC_META[5].valueClassName
            )}
        >
            {hasValue(lastSaleAt) ? formatFaDate(String(lastSaleAt)) : DASH}
        </span>,
        <div key='stock' className='flex flex-wrap items-center gap-2'>
            {hasValue(stockStatus) ? (
                <Pill
                    text={stockStatus === 'in-stock' ? 'موجود' : 'ناموجود'}
                    variant={stockStatus === 'in-stock' ? 'success' : 'error'}
                    hasDot
                    className='border-0'
                />
            ) : (
                <span className='text-title-md font-bold text-on-surface'>
                    {DASH}
                </span>
            )}
            {hasValue(stockCount) ? (
                <span className='text-title-md font-bold text-on-surface'>
                    {formatFaNumber(Number(stockCount))} عدد
                </span>
            ) : null}
        </div>,
        hasValue(displayStatus) ? (
            <Pill
                key='display'
                text={String(displayStatus)}
                variant='success'
                className='border-0'
            />
        ) : (
            <span key='display' className='text-title-md font-bold text-on-surface'>
                {DASH}
            </span>
        ),
        <div key='public' className='flex flex-col gap-0.5'>
            <span
                className={cn(
                    'text-title-md font-bold',
                    METRIC_META[8].valueClassName
                )}
            >
                {hasValue(showInPublic) ? (showInPublic ? 'بله' : 'خیر') : DASH}
            </span>
            <span className='text-label-md text-outline'>
                {hasValue(publicAudience) ? String(publicAudience) : DASH}
            </span>
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

            {details.length > 0 ? (
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
                                {item.value || DASH}
                            </span>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default PriceAndStock
