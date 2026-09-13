import { Icon } from '@/src/shared/components/Icons/Icon'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'

type SummaryTrendProps = {
    value: number
    className?: string
}

const SummaryTrend = ({ value, className }: SummaryTrendProps) => {
    const isNegative = value < 0
    const label = isNegative ? 'کمتر' : 'بیشتر'
    const iconLabel = isNegative
        ? 'keyboardArrowDown300Broken'
        : 'keyboardArrowUp400Linear'
    const toneClassName = isNegative ? 'text-error' : 'text-success'

    return (
        <div
            className={cn(
                'flex items-center gap-0.5 text-label-lg',
                toneClassName,
                className
            )}
        >
            <Icon label={iconLabel} className={cn('size-5!', toneClassName)} />
            <span>
                {formatFaNumber(Math.abs(value))}٪ {label}
            </span>
        </div>
    )
}

export default SummaryTrend
