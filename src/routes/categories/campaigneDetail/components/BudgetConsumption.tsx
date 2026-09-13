'use client'

import { cn } from '@shared/libs/utils'

type BudgetConsumptionProps = {
    label?: string
    usedLabel?: string
    totalLabel?: string
    percent?: number
    className?: string
}

const BudgetConsumption = ({
    label = 'مصرف بودجه',
    usedLabel = '۳۲۰ م',
    totalLabel = '۵۰۰ م',
    percent = 64,
    className,
}: BudgetConsumptionProps) => {
    const clampedPercent = Math.min(100, Math.max(0, percent))

    return (
        <div className={cn('flex w-full flex-col gap-2', className)} dir='rtl'>
            <div className='flex flex-row items-center justify-between gap-3'>
                <span className='text-label-md text-outline'>{label}</span>
                <span className='text-label-md text-outline'>
                    {usedLabel} / {totalLabel}
                </span>
            </div>
            <div className='flex h-2 w-full overflow-hidden rounded-full bg-surface-container-high'>
                <div
                    className='h-full rounded-full bg-success transition-[width]'
                    style={{ width: `${clampedPercent}%` }}
                />
            </div>
        </div>
    )
}

export default BudgetConsumption
