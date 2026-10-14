import { Pill } from '@/src/shared/components/ui/Pill'
import type { User } from '@/src/api/types/admin/user'
import { formatFaDateTime } from '@/src/shared/libs/formatter'

const Header = ({ user }: { user: User }) => {
    const fullName = `${user.first_name} ${user.last_name}`.trim() || user.username
    const initial = fullName.charAt(0) || '—'
    const role = user.roles[0] || user.job_title

    return (
        <div
            className='flex flex-row items-center gap-4 rounded-card-lg bg-surface-container-lowest px-5 py-4'
            dir='rtl'
        >
            <div className='flex size-14 shrink-0 items-center justify-center rounded-full bg-[#C96B86] text-title-lg font-semibold text-white'>
                {initial}
            </div>
            <div className='flex min-w-0 flex-col gap-2'>
                <div className='flex flex-row flex-wrap items-center gap-2'>
                    <span className='text-title-md font-bold text-on-surface'>
                        {fullName}
                    </span>
                    <Pill
                        text={user.is_active ? 'فعال' : 'غیرفعال'}
                        variant={user.is_active ? 'success' : 'tonal'}
                    />
                    {role ? <Pill text={role} variant='info' /> : null}
                </div>
                <div className='flex flex-row flex-wrap items-center gap-4 text-label-md text-outline'>
                    <span>
                        کد پرسنلی:{' '}
                        <span className='font-semibold text-on-surface'>
                            {user.personnel_code || '—'}
                        </span>
                    </span>
                    <span>
                        نقش:{' '}
                        <span className='font-semibold text-on-surface'>
                            {user.roles.join('، ') || '—'}
                        </span>
                    </span>
                    <span className='font-semibold text-on-surface'>
                        {user.job_title || '—'}
                    </span>
                    <span>
                        آخرین ورود:{' '}
                        <span className='text-on-surface'>
                            {user.last_login_at
                                ? formatFaDateTime(user.last_login_at)
                                : '—'}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Header
