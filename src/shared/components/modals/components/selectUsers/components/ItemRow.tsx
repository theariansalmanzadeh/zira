'use client'

import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import { Pill } from '@/src/shared/components/ui/Pill'
import { AVATAR_COLORS } from '../constants'
import type { SelectAnnouncementUserItem } from '../types'

type ItemRowProps = {
    user: SelectAnnouncementUserItem
    checked: boolean
    index: number
    onCheckedChange: (checked: boolean) => void
}

const ItemRow = ({ user, checked, index, onCheckedChange }: ItemRowProps) => {
    const initial = user.name.trim().charAt(0) || '؟'
    const avatarClassName = AVATAR_COLORS[index % AVATAR_COLORS.length]

    return (
        <button
            type='button'
            onClick={() => onCheckedChange(!checked)}
            className='flex w-full items-center gap-3 rounded-card-md border border-outline-variant bg-surface-container-lowest px-3 py-3 text-right transition-colors hover:bg-surface-container-low'
            dir='rtl'
        >
            <Checkbox
                checked={checked}
                onCheckedChange={(value) => onCheckedChange(value === true)}
                onClick={(event) => event.stopPropagation()}
                variant='primary-outline'
            />
            <Avatar size='sm'>
                <AvatarFallback className={avatarClassName}>
                    {initial}
                </AvatarFallback>
            </Avatar>
            <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
                <span className='truncate text-label-lg font-semibold text-on-surface'>
                    {user.name}
                </span>
                <span className='truncate text-label-md text-outline'>
                    {user.personnelCode} · {user.role}
                </span>
            </div>
            <span className='hidden shrink-0 text-label-md text-outline sm:block'>
                {user.branch}
            </span>
            <Pill
                text={user.status === 'active' ? 'فعال' : 'غیرفعال'}
                variant={user.status === 'active' ? 'success' : 'tonal'}
                className='shrink-0 border-0'
            />
        </button>
    )
}

export default ItemRow
