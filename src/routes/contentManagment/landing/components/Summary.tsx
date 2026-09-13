'use client'

import { useLanding } from '../provider'
import {
    getLandingStatusCounts,
    LANDING_INFO_TEXT,
    LANDING_STATUS_META,
    type LandingSectionStatus,
} from '../constants'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { formatFaNumber } from '@/src/shared/libs/formatter'

const STATUS_ROWS: LandingSectionStatus[] = [
    'published',
    'draft',
    'hidden',
]

const Summary = () => {
    const { sections } = useLanding()
    const counts = getLandingStatusCounts(sections)

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <div className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-4">
                <h2 className="mb-3.5 text-label-lg font-semibold text-on-surface">
                    وضعیت انتشار
                </h2>
                <div className="flex flex-col gap-2.5">
                    {STATUS_ROWS.map((status) => {
                        const meta = LANDING_STATUS_META[status]

                        return (
                            <div
                                key={status}
                                className="flex items-center justify-between gap-3"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`size-1.5 shrink-0 rounded-full ${meta.dotClassName}`}
                                    />
                                    <span className="text-label-md text-on-surface-variant">
                                        {meta.label}
                                    </span>
                                </div>
                                <span className="text-label-lg font-bold text-on-surface">
                                    {formatFaNumber(counts[status])}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-card-lg border border-outline-variant bg-surface-container-lowest p-4">
                <Icon
                    label="info400Linear"
                    className="mt-0.5 size-5! shrink-0 text-primary"
                />
                <p className="text-label-md leading-6 text-on-surface-variant">
                    {LANDING_INFO_TEXT}
                </p>
            </div>
        </div>
    )
}

export default Summary
