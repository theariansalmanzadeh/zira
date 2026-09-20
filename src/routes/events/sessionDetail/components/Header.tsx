'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Pill } from '@/src/shared/components/ui/Pill'
import { cn } from '@shared/libs/utils'
import type { SessionDetailData } from '../../constants'

type HeaderProps = {
    session: SessionDetailData
    className?: string
}

const Header = ({ session, className }: HeaderProps) => {
    const isActive = session.status === 'فعال'

    return (
        <div
            className={cn(
                'flex flex-row items-center gap-3 rounded-card-lg bg-surface-container-lowest p-4',
                className
            )}
            dir='rtl'
        >
            <span className='flex size-12 shrink-0 items-center justify-center rounded-card-md bg-info-container'>
                <Icon
                    label='monitor'
                    fill='none'
                    className='size-6! text-info'
                />
            </span>

            <div className='flex min-w-0 flex-col gap-1'>
                <div className='flex flex-row items-center gap-2'>
                    <h2 className='text-title-md font-bold text-on-surface'>
                        نشست {session.sessionId}
                    </h2>
                    <Pill
                        text={session.status}
                        variant={isActive ? 'success' : 'tonal'}
                        className='border-0'
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center gap-x-3 gap-y-1 text-label-md text-outline'>
                    <span>{session.user.name}</span>
                    <span>{session.user.role}</span>
                    <span>آخرین فعالیت: {session.lastActivityAt}</span>
                </div>
            </div>
        </div>
    )
}

export default Header
