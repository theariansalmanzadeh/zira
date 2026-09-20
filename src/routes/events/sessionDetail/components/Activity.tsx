'use client'

import Link from 'next/link'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Pill } from '@/src/shared/components/ui/Pill'
import SectionTitle from '@/src/shared/components/ui/SectionTitle'
import { cn } from '@shared/libs/utils'
import type { SessionActivityItem } from '../../constants'

type ActivityProps = {
    activities: SessionActivityItem[]
    className?: string
}

const Activity = ({ activities, className }: ActivityProps) => {
    const rowClassName =
        'grid grid-cols-[minmax(0,0.7fr)_minmax(0,1.4fr)_minmax(0,1.6fr)_minmax(0,0.8fr)_auto] items-center gap-3 rounded-card-md bg-surface-container-high px-3 py-3 transition-colors hover:bg-surface-container-highest'

    return (
        <div
            className={cn(
                'flex h-full flex-col rounded-card-lg bg-surface-container-lowest p-6',
                className
            )}
            dir='rtl'
        >
            <SectionTitle>فعالیت‌های نشست</SectionTitle>

            <div className='flex flex-col gap-2'>
                <div className='grid grid-cols-[minmax(0,0.7fr)_minmax(0,1.4fr)_minmax(0,1.6fr)_minmax(0,0.8fr)_auto] items-center gap-3 px-3 py-2 text-label-md text-outline'>
                    <span>زمان</span>
                    <span>نوع فعالیت</span>
                    <span>جزئیات</span>
                    <span>نتیجه</span>
                    <span />
                </div>

                {activities.map((item) => {
                    const content = (
                        <>
                            <div className='flex items-center gap-2'>
                                <div className='bg-info-container p-1 rounded-lg'>
                                    <Icon label='history400Linear' className='text-outline' />
                                </div>
                                <span className='text-label-lg text-on-surface-variant'>
                                    {item.time}
                                </span>
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <span className='truncate text-label-lg text-on-surface'>
                                    {item.activityType}
                                </span>
                                {item.isSensitive && (
                                    <Pill
                                        text='حساس'
                                        variant='error'
                                        className='border-0'
                                    />
                                )}
                            </div>
                            <span className='truncate text-label-lg text-on-surface-variant'>
                                {item.details}
                            </span>
                            <span className='text-label-lg text-on-surface'>
                                {item.result}
                            </span>
                            <Icon
                                label='chevronLeft400Linear'
                                className='size-5! text-outline'
                            />
                        </>
                    )
                    if (item.eventId) {
                        return (
                            <Link
                                key={item.id}
                                href={`/admin/events/${item.eventId}`}
                                className={rowClassName}
                            >
                                {content}
                            </Link>
                        )
                    }

                    return (
                        <div key={item.id} className={rowClassName}>
                            {content}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Activity
