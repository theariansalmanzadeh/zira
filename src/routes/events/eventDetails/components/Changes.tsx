'use client'

import SectionTitle from '@/src/shared/components/ui/SectionTitle'
import { Pill } from '@/src/shared/components/ui/Pill'
import { cn } from '@shared/libs/utils'
import type { EventChangeRow } from '../../constants'

type ChangesProps = {
    changes: EventChangeRow[]
    className?: string
}

const Changes = ({ changes, className }: ChangesProps) => {
    return (
        <div
            className={cn(
                'rounded-card-lg bg-surface-container-lowest p-6',
                className
            )}
            dir='rtl'
        >
            <SectionTitle>تغییرات داده (قبل ← بعد)</SectionTitle>
            <div className='flex flex-col gap-3'>
                <div className='grid grid-cols-3 gap-4 text-label-md text-outline'>
                    <span>فیلد</span>
                    <span>مقدار قبلی</span>
                    <span>مقدار جدید</span>
                </div>
                {changes.map((change) => (
                    <div
                        key={change.field}
                        className='grid grid-cols-3 items-center gap-4'
                    >
                        <span className='text-label-lg text-on-surface'>
                            {change.field}
                        </span>
                        <div>
                            <Pill
                                text={change.previousValue}
                                variant='error'
                                className='border-0 [&_span]:line-through'
                            />
                        </div>
                        <div>
                            <Pill
                                text={change.newValue}
                                variant='success'
                                className='border-0'
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Changes
