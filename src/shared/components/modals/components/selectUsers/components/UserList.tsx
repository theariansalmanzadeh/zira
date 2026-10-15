'use client'

import { Spinner } from '@/src/shared/components/ui/spinner'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import ItemRow from './ItemRow'
import type { SelectAnnouncementUserItem } from '../types'

type UserListProps = {
    users: SelectAnnouncementUserItem[]
    selectedIds: Set<string>
    isPending: boolean
    isError: boolean
    onToggle: (userId: string, checked: boolean) => void
}

const UserList = ({
    users,
    selectedIds,
    isPending,
    isError,
    onToggle,
}: UserListProps) => {
    if (isPending) {
        return (
            <div className='flex justify-center py-10'>
                <Spinner className='size-6' />
            </div>
        )
    }

    if (isError) {
        return (
            <p className='py-6 text-center text-label-md text-outline'>
                دریافت لیست کاربران با خطا مواجه شد.
            </p>
        )
    }

    if (users.length === 0) {
        return <TableEmptyState title='کاربری یافت نشد.' />
    }

    return (
        <div className='flex flex-col gap-2'>
            {users.map((user, index) => (
                <ItemRow
                    key={user.id}
                    user={user}
                    index={index}
                    checked={selectedIds.has(user.id)}
                    onCheckedChange={(checked) => onToggle(user.id, checked)}
                />
            ))}
        </div>
    )
}

export default UserList
