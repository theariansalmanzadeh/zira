'use client'

import { cn } from '@shared/libs/utils'
import { CONTENT_RECENT_ACTIVITIES } from '../constants'

const RecentActivities = () => (
    <div className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-4">
        <h3 className="mb-1.5 text-label-lg font-semibold text-on-surface">
            فعالیت‌های اخیر
        </h3>

        <div className="flex flex-col">
            {CONTENT_RECENT_ACTIVITIES.map((activity, index) => {
                const isLast = index === CONTENT_RECENT_ACTIVITIES.length - 1

                return (
                    <div
                        key={activity.id}
                        className={cn(
                            'flex items-start gap-2.5 py-2.5',
                            !isLast && 'border-b border-outline-variant/60'
                        )}
                    >
                        <div
                            className={cn(
                                'flex size-7.5 shrink-0 items-center justify-center rounded-full',
                                activity.dotContainerClassName
                            )}
                        >
                            <span
                                className={cn(
                                    'size-1.5 rounded-full',
                                    activity.dotClassName
                                )}
                            />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-label-md font-semibold leading-6 text-on-surface-variant">
                                {activity.title}
                            </p>
                            <p className="mt-0.5 text-label-sm text-outline">
                                {activity.by} · {activity.time}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
)

export default RecentActivities
