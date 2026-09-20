'use client'

import { Pill } from '@/src/shared/components/ui/Pill'
import SectionTitle from '@/src/shared/components/ui/SectionTitle'
import { cn } from '@shared/libs/utils'
import type { EventUserData } from '../../constants'

type UserProps = {
    user: EventUserData
    className?: string
}

const User = ({ user, className }: UserProps) => {
    return (
        <div
            className={cn(
                'rounded-card-lg bg-surface-container-lowest p-6',
                className
            )}
            dir='rtl'
        >
            <SectionTitle>کاربر</SectionTitle>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-row items-center gap-3'>
                    <div
                        className={cn(
                            'flex size-10 shrink-0 items-center justify-center rounded-full text-label-sm',
                            user.avatarClassName
                        )}
                    >
                        {user.name.charAt(0)}
                    </div>
                    <div className='flex min-w-0 flex-col gap-1'>
                        <span className='text-label-lg text-on-surface'>
                            {user.name}
                        </span>
                        <Pill
                            text={user.role}
                            variant='tonal'
                            className='w-fit border-0'
                        />
                    </div>
                </div>
                <div className='flex items-center justify-between gap-3'>
                    <span className='shrink-0 text-label-md text-outline'>
                        کد کاربر
                    </span>
                    <span className='text-label-lg text-on-surface' dir='ltr'>
                        {user.userCode}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default User
