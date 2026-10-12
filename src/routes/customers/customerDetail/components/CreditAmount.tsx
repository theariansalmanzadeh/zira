import { Icon } from '@/src/shared/components/Icons/Icon'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'

type CreditAmountProps = {
    value: number | null
    className?: string
}

const CreditAmount = ({ value, className }: CreditAmountProps) => {
    if (value === null) return <span className={className}>-</span>

    return (
        <span className={cn('inline-flex items-center gap-0.5 font-bold', className)}>
            <span>{formatFaNumber(value)}</span>
            <Icon label="currency" className={cn('size-4!', className)} />
        </span>
    )
}

export default CreditAmount
