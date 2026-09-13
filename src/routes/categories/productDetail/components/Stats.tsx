'use client'

import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'

export type StatMeta = {
    label: string
    valueClassName?: string
}

type StatsProps = {
    values?: number[]
    meta?: StatMeta[]
    className?: string
}

export const STATS_META: StatMeta[] = [
    {
        label: 'موجودی کل',
        valueClassName: 'text-success',
    },
    {
        label: 'تعداد متغیر',
        valueClassName: 'text-on-surface',
    },
    {
        label: 'قیمت فروش',
        valueClassName: 'text-on-surface',
    },
    {
        label: 'حاشیه سود',
        valueClassName: 'text-success',
    },
]

export const STATS_VALUES_DUMMY = [124, 18, 485000, 38]

const formatStatValue = (value: number, index: number) => {
    switch (index) {
        case 2:
            return formatPrice(value)
        case 3:
            return `${formatFaNumber(value)}٪`
        default:
            return formatFaNumber(value)
    }
}

const Stats = ({
    values = STATS_VALUES_DUMMY,
    meta = STATS_META,
    className,
}: StatsProps) => {
    return (
        <div
            className={cn('grid grid-cols-2 gap-3 md:grid-cols-4', className)}
            dir='rtl'
        >
            {values.map((value, index) => {
                const item = meta[index]
                if (!item) return null

                return (
                    <div
                        key={item.label}
                        className='flex flex-col items-center justify-center gap-1.5 rounded-card-lg border border-outline-variant bg-surface-container-lowest px-4 py-5'
                    >
                        <span
                            className={cn(
                                'text-title-lg! font-bold',
                                item.valueClassName ?? 'text-on-surface'
                            )}
                        >
                            {formatStatValue(value, index)}
                        </span>
                        <span className='text-label-md text-outline'>
                            {item.label}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

export default Stats
