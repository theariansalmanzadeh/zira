'use client'

import { useMemo, useState } from 'react'
import type { StaffUser } from '@/src/api/types/admin/user'
import { useListStaffUsers } from '@/src/routes/userManagment/hooks/user'
import { Button } from '@/src/shared/components/ui/button'
import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import type { BaseModalProps } from '../../types'
import Filter from './components/Filter'
import UserList from './components/UserList'
import type { SelectAnnouncementUserItem, SelectUsersModalData } from './types'
import {
    EMPTY_USER_LIST_FILTER,
    filterUsers,
    type UserListFilter,
} from './utils/filterUsers'

export type {
    SelectAnnouncementUserItem,
    SelectUsersModalData,
} from './types'

const toSelectableUser = (user: StaffUser): SelectAnnouncementUserItem => ({
    id: user.id,
    name:
        [user.first_name, user.last_name].filter(Boolean).join(' ') ||
        user.username,
    personnelCode: user.personnel_code || user.username,
    role: user.job_title || '—',
    branch: user.primary_branch_id || '—',
    status: user.is_active ? 'active' : 'inactive',
    phone: user.phone_number,
})

const SelectUsers = ({ closeModal, data }: BaseModalProps) => {
    const modalData = data as SelectUsersModalData | null | undefined
    const { data: usersData, isPending, isError } = useListStaffUsers()
    const [filter, setFilter] = useState<UserListFilter>(EMPTY_USER_LIST_FILTER)
    const [selectedIds, setSelectedIds] = useState<Set<string>>(
        () => new Set(modalData?.selectedIds ?? [])
    )

    const users = useMemo(
        () => usersData?.results ?? [],
        [usersData?.results]
    )
    const filteredUsers = useMemo(
        () => filterUsers(users, filter).map(toSelectableUser),
        [users, filter]
    )

    const allFilteredSelected =
        filteredUsers.length > 0 &&
        filteredUsers.every((user) => selectedIds.has(user.id))

    const headerCheckboxState: boolean | 'indeterminate' = allFilteredSelected
        ? true
        : filteredUsers.some((user) => selectedIds.has(user.id))
            ? 'indeterminate'
            : false

    const toggleUser = (userId: string, checked: boolean) => {
        setSelectedIds((prev) => {
            const next = new Set(prev)
            if (checked) next.add(userId)
            else next.delete(userId)
            return next
        })
    }

    const toggleAllFiltered = (checked: boolean) => {
        setSelectedIds((prev) => {
            const next = new Set(prev)
            filteredUsers.forEach((user) => {
                if (checked) next.add(user.id)
                else next.delete(user.id)
            })
            return next
        })
    }

    const selectedUsers = useMemo(() => {
        const selected = users.filter((user) => selectedIds.has(user.id))
        return selected.map(toSelectableUser)
    }, [users, selectedIds])

    const handleConfirm = () => {
        modalData?.onConfirm?.(selectedUsers)
        closeModal()
    }

    return (
        <div className='flex w-full flex-col gap-5' dir='rtl'>
            <Filter value={filter} onChange={setFilter} />

            <div className='flex items-center justify-between gap-3'>
                <label className='flex cursor-pointer items-center gap-2'>
                    <Checkbox
                        checked={headerCheckboxState}
                        onCheckedChange={(value) =>
                            toggleAllFiltered(value === true)
                        }
                        variant='primary-outline'
                    />
                    <span className='text-label-md text-on-surface-variant'>
                        انتخاب همه نتایج
                    </span>
                </label>
                <span className='text-label-md text-outline'>
                    {formatFaNumber(filteredUsers.length)} نتیجه
                </span>
            </div>

            <UserList
                users={filteredUsers}
                selectedIds={selectedIds}
                isPending={isPending}
                isError={isError}
                onToggle={toggleUser}
            />

            <div className='flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant pt-4'>
                <span className='text-label-md text-on-surface-variant'>
                    {formatFaNumber(selectedIds.size)} کاربر انتخاب شده
                </span>
                <div className='flex items-center gap-2'>
                    <Button type='button' variant='outline' onClick={closeModal}>
                        انصراف
                    </Button>
                    <Button
                        type='button'
                        variant='primary'
                        onClick={handleConfirm}
                    >
                        تایید انتخاب
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SelectUsers
