import Link from 'next/link'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Card } from '@shared/components/ui/Card'
import { Progress } from '@shared/components/ui/ProgressBar'
import { cn } from '@shared/libs/utils'

export type RankingItem = {
    label: string
    percent: number
    value: string | number
}

type RankingCardProps = {
    title: string
    items: RankingItem[]
    reportHref?: string
    className?: string
}

const RankingCard = ({
    title,
    items,
    reportHref = '#',
    className,
}: RankingCardProps) => {
    return (
        <Card
            className={cn(
                'rounded-card-lg bg-surface-container-lowest p-3 shadow-none gap-4 h-full',
                className
            )}
        >
            <div className='flex flex-row items-center justify-between mb-3'>
                <span className='text-title-md font-bold text-on-surface'>{title}</span>
                <Link
                    href={reportHref}
                    className='flex flex-row items-center gap-1 text-label-md text-on-surface-variant'
                >
                    <span>گزارش کامل</span>
                    <Icon label='arrowLeft300Linear' className='size-4 text-on-surface-variant' />
                </Link>
            </div>

            <div className='flex flex-col gap-3'>
                {items.map((item, index) => (
                    <div
                        key={`${item.label}-${index}`}
                        className='grid grid-cols-[minmax(0,88px)_1fr_minmax(0,120px)] items-center gap-3 min-h-10'
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
                        <span className='text-label-md text-outline text-left'>{item.value.toString()}</span>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default RankingCard
