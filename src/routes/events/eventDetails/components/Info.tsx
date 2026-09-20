'use client'

import SectionTitle from '@/src/shared/components/ui/SectionTitle'
import { cn } from '@shared/libs/utils'
import type { EventInfoField } from '../../constants'

type InfoProps = {
    fields: EventInfoField[]
    className?: string
}

const Info = ({ fields, className }: InfoProps) => {
    return (
        <div
            className={cn(
                'rounded-card-lg bg-surface-container-lowest p-6',
                className
            )}
            dir='rtl'
        >
            <SectionTitle>اطلاعات رخداد</SectionTitle>
            <div className='grid grid-cols-3 justify-between gap-x-8 gap-y-4'>
                {fields.map((field) => (
                    <div
                        key={field.label}
                        className='flex flex-col items-start justify-between gap-3'
                    >
                        <span className='shrink-0 text-label-md text-outline'>
                            {field.label}
                        </span>
                        <span className='text-label-lg text-on-surface'>
                            {field.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Info
