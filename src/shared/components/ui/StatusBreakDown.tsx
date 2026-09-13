import { Card } from '@shared/components/ui/Card'
import { Progress } from '@shared/components/ui/ProgressBar'
import { cn } from '@shared/libs/utils'

export type StatusBreakdownItem = {
    label: string
    percent: number
    value: string
}

type StatusBreakDownProps = {
    title: string
    items: StatusBreakdownItem[]
    className?: string
}

const StatusBreakDown = ({
    title,
    items,
    className,
}: StatusBreakDownProps) => {
    return (
        <Card
            className={cn(
                'rounded-card-lg bg-surface-container-lowest p-3 shadow-none gap-4 h-full',
                className
            )}
        >
            <span className='text-title-md font-medium text-on-surface'>{title}</span>

            <div className='flex flex-col gap-3 pt-4'>
                {items.map((item, index) => (
                    <div
                        key={`${item.label}-${index}`}
                        className='grid grid-cols-[minmax(0,150px)_1fr_minmax(0,120px)] items-center gap-3 min-h-10'
                    >
                        <span className='text-label-lg text-on-surface text-right truncate'>
                            {item.label}
                        </span>
                        <div className='flex flex-row items-center gap-2'>
                            <Progress
                                value={item.percent}
                                className='h-1.5 bg-surface-container-highest'
                                indicatorClassName='bg-success'
                            />
                            <span className='shrink-0 text-label-sm text-outline'>
                                {item.percent}٪
                            </span>
                        </div>
                        <span className='text-label-md text-outline text-left'>{item.value}</span>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default StatusBreakDown
