import React from 'react'
import { Card } from '@shared/components/ui/Card'
import { Icon } from '@shared/components/Icons/Icon'
import { Progress } from '@shared/components/ui/ProgressBar'
import { cn } from '@shared/libs/utils'
import { IconLabel } from '@/src/shared/types/icon'


export type SummaryProgressCardProps = {
    title: string,
    indicators: {
        progress: {
            value: number
            className: string
        }
        label: string,
        counts: {
            value: string | number
            className: string
        }
        countsPrefix: {
            value: string
            className: string
        }
    }[]
    className?: string

}

const SummaryProgressCard = ({ title, indicators, className }: SummaryProgressCardProps) => {

    return (
        <Card
            className={cn(
                'rounded-card-lg bg-surface-container-lowest p-3 shadow-none gap-0 h-full',
                className
            )}
        >
            <div className='w-full mb-4'>
                <span className='text-title-md font-medium text-on-surface w-full text-right'>{title}</span>
            </div>
            {indicators.map((indicator, index) => (
                <div key={indicator.label} className='w-full items gap-1 grid grid-cols-[minmax(0,200px)_auto_minmax(0,100px)] items-center'>
                    <div>
                        <span className='text-label-lg text-on-surface'>{indicator.label}</span>
                    </div>
                    <Progress
                        value={indicator.progress.value}
                        className='h-1 bg-surface-container-highest w-full'
                        indicatorClassName={indicator.progress.className}
                    />
                    <div className='flex flex-row-reverse items-center gap-1'>
                        {true && (
                            <span className='text-label-md text-outline'>{indicator.counts.value}ok</span>
                        )}
                        {indicator.countsPrefix && (
                            <span className='text-label-md text-outline'>{indicator.countsPrefix.value}</span>
                        )}
                    </div>
                </div>
            ))}
        </Card >
    )
}

export default SummaryProgressCard
