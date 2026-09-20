'use client'

import Link from 'next/link'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { Pill } from '@/src/shared/components/ui/Pill'
import { cn } from '@shared/libs/utils'
import type { EventSessionData } from '../../constants'

type SessionProps = {
    session: EventSessionData
    className?: string
}

const SessionActionContent = () => (
    <>
        <span className='text-label-md text-on-primary'>
            نمایش سشن مربوطه
        </span>
        <Icon
            label='chevronLeft400Linear'
            className='size-5! text-on-primary'
        />
    </>
)

const Session = ({ session, className }: SessionProps) => {
    const isActive = session.status === 'فعال'

    return (
        <div
            className={cn(
                'flex flex-col gap-4 rounded-card-lg bg-surface-container-lowest p-6',
                className
            )}
            dir='rtl'
        >
            <h3 className='text-title-md font-bold text-on-surface'>
                نشست مربوطه
            </h3>

            <div className='flex items-center justify-between gap-3 rounded-card-md border border-outline-variant p-3'>
                <div className='flex min-w-0 flex-row items-center gap-3'>
                    <span className='flex size-10 shrink-0 items-center justify-center rounded-card-sm bg-info-container'>
                        <Icon
                            label='monitor'
                            fill='none'
                            className='size-5! text-info'
                        />
                    </span>
                    <div className='flex min-w-0 flex-col gap-0.5'>
                        <span
                            className='text-label-lg font-medium text-info'
                            dir='ltr'
                        >
                            {session.sessionId}
                        </span>
                        <span className='truncate text-label-md text-outline'>
                            {session.subtitle}
                        </span>
                    </div>
                </div>
                <Pill
                    text={session.status}
                    variant={isActive ? 'success' : 'tonal'}
                    className='shrink-0 border-0'
                />
            </div>

            {session.href ? (
                <Button variant='primary' className='w-full' asChild>
                    <Link href={session.href}>
                        <SessionActionContent />
                    </Link>
                </Button>
            ) : (
                <Button variant='primary' className='w-full'>
                    <SessionActionContent />
                </Button>
            )}
        </div>
    )
}

export default Session
