'use client'

import { Pill } from '@/src/shared/components/ui/Pill'
import SectionTitle from '@/src/shared/components/ui/SectionTitle'
import { cn } from '@shared/libs/utils'
import type { EventInfoField, EventUserData } from '../../constants'

type InfoProps = {
    fields: EventInfoField[]
    user: EventUserData
    status: string
    className?: string
}

const Info = ({ fields, user, status, className }: InfoProps) => {
    const isActive = status === 'فعال'

    return (
        <div
            className={cn(
                'flex h-full flex-col gap-6 rounded-card-lg bg-surface-container-lowest p-6',
                className
            )}
            dir='rtl'
        >
            <div className='flex items-center justify-between gap-3'>
                <SectionTitle className='mb-0'>اطلاعات نشست</SectionTitle>
                <Pill
                    text={status}
                    variant={isActive ? 'success' : 'tonal'}
                    className='border-0'
                />
            </div>

            <div className='flex flex-row items-center gap-3'>
                <div
                    className={cn(
                        'flex size-12 shrink-0 items-center justify-center rounded-full text-label-md',
                        user.avatarClassName
                    )}
                >
                    {user.name.charAt(0)}
                </div>
                <div className='flex min-w-0 flex-col gap-1'>
                    <span className='text-label-lg font-medium text-on-surface'>
                        {user.name}
                    </span>
                    <Pill
                        text={user.role}
                        variant='tonal'
                        className='w-fit border-0'
                    />
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                {fields.map((field) => (
                    <div
                        key={field.label}
                        className='flex items-center justify-between gap-3'
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
