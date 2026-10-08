'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/src/shared/components/ui/button'
import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import type { BaseModalProps } from '../../types'
import Filter from './components/Filter'
import ItemRow from './components/ItemRow'
import { DEFAULT_USERS } from './constants'
import type { SelectUsersModalData } from './types'

export type {
    SelectAnnouncementUserItem,
    SelectUsersModalData,
} from './types'

const SelectUsers = ({ closeModal, data }: BaseModalProps) => {
    const modalData = data as SelectUsersModalData | null | undefined
    const users = modalData?.users ?? DEFAULT_USERS
    const [search, setSearch] = useState('')
    const [role, setRole] = useState('all')
    const [branch, setBranch] = useState('all')
    const [selectedIds, setSelectedIds] = useState<Set<string>>(
        () => new Set(modalData?.selectedIds ?? [])
    )

    const filteredUsers = useMemo(() => {
        const query = search.trim().toLowerCase()

        return users.filter((user) => {
            const matchesSearch =
                !query ||
                user.name.toLowerCase().includes(query) ||
                user.personnelCode.toLowerCase().includes(query) ||
                (user.phone?.includes(query) ?? false)
            const matchesRole = role === 'all' || user.roleId === role
            const matchesBranch =
                branch === 'all' ||
                user.branchId === branch ||
                user.branchId === 'all'

            return matchesSearch && matchesRole && matchesBranch
        })
    }, [users, search, role, branch])

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

    const selectedUsers = users.filter((user) => selectedIds.has(user.id))

    const handleConfirm = () => {
        modalData?.onConfirm?.(selectedUsers)
        closeModal()
    }

    return (
        <div className='flex w-full flex-col gap-5' dir='rtl'>
            <Filter
                search={search}
                role={role}
                branch={branch}
                onSearchChange={setSearch}
                onRoleChange={setRole}
                onBranchChange={setBranch}
            />

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

            <div className='flex flex-col gap-2'>
                {filteredUsers.map((user, index) => (
                    <ItemRow
                        key={user.id}
                        user={user}
                        index={index}
                        checked={selectedIds.has(user.id)}
                        onCheckedChange={(checked) =>
                            toggleUser(user.id, checked)
                        }
                    />
                ))}
            </div>

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
