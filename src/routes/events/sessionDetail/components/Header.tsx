'use client'

import { useRouter } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { Pill } from '@/src/shared/components/ui/Pill'
import { cn } from '@shared/libs/utils'
import { useRevokeSession } from '@/src/routes/events/hooks/sessions'
import type { SessionDetailData } from '../../constants'

type HeaderProps = {
    session: SessionDetailData
    className?: string
}

const Header = ({ session, className }: HeaderProps) => {
    const { push } = useRouter()
    const { mutateAsync, isPending } = useRevokeSession()
    const isActive = session.status === 'فعال'

    const handleRevoke = async () => {
        try {
            await mutateAsync(session.id)
            push('/admin/user-management?sub=sessions')
        } catch {
            // Keep the detail view open so the user can retry.
        }
    }

    return (
        <div
            className={cn(
                'flex flex-row items-center justify-between gap-3 rounded-card-lg bg-surface-container-lowest p-4',
                className
            )}
            dir='rtl'
        >
            <div className='flex min-w-0 flex-row items-center gap-3'>
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

            <Button
                type='button'
                variant='error'
                onClick={handleRevoke}
                isLoading={isPending}
                disabled={!isActive}
            >
                ابطال نشست
            </Button>
        </div>
    )
}

export default Header
