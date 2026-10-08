'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/src/shared/components/ui/button'
import IconButton from '@/src/shared/components/ui/IconButton'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import type { BaseModalProps } from '../../types'
import Filter from './components/Filter'
import ItemRow from './components/ItemRow'
import { DEFAULT_ROLES } from './constants'
import type { SelectBasedOnRoleModalData, SelectRoleItem } from './types'

export type { SelectBasedOnRoleModalData, SelectRoleItem } from './types'

const SelectBasedOnRole = ({ closeModal, data }: BaseModalProps) => {
    const modalData = data as SelectBasedOnRoleModalData | null | undefined
    const roles = modalData?.roles ?? DEFAULT_ROLES
    const [search, setSearch] = useState('')
    const [selectedIds, setSelectedIds] = useState<Set<string>>(
        () => new Set(modalData?.selectedIds ?? [])
    )

    const filteredRoles = useMemo(() => {
        const query = search.trim().toLowerCase()
        if (!query) return roles
        return roles.filter(
            (role) =>
                role.name.toLowerCase().includes(query) ||
                role.slug.toLowerCase().includes(query) ||
                role.category.toLowerCase().includes(query)
        )
    }, [roles, search])

    const selectedRoles = roles.filter((role) => selectedIds.has(role.id))
    const uniqueRecipients = selectedRoles.reduce(
        (sum, role) => sum + role.memberCount,
        0
    )

    const toggleRole = (roleId: string, checked: boolean) => {
        setSelectedIds((prev) => {
            const next = new Set(prev)
            if (checked) next.add(roleId)
            else next.delete(roleId)
            return next
        })
    }

    const handleSelectAll = () => {
        setSelectedIds(new Set(filteredRoles.map((role) => role.id)))
    }

    const handleConfirm = () => {
        modalData?.onConfirm?.(selectedRoles)
        closeModal()
    }

    return (
        <div className='flex w-full flex-col gap-5' dir='rtl'>
            <div className='flex items-start justify-between gap-3'>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-title-md font-bold text-on-surface'>
                        ارسال بر اساس نقش
                    </h2>
                    <p className='text-label-md text-outline'>
                        همه دارندگان فعال نقش‌های انتخاب‌شده اعلان را دریافت
                        می‌کنند.
                    </p>
                </div>
                <IconButton
                    icon='closeSm400Linear'
                    variant='outline'
                    className='size-9 shrink-0 rounded-container-md'
                    iconClassName='size-5'
                    onClick={closeModal}
                />
            </div>

            <Filter
                search={search}
                onSearchChange={setSearch}
                onSelectAll={handleSelectAll}
            />

            <div className='flex max-h-[360px] flex-col gap-2 overflow-y-auto'>
                {filteredRoles.map((role) => (
                    <ItemRow
                        key={role.id}
                        role={role}
                        checked={selectedIds.has(role.id)}
                        onCheckedChange={(checked) =>
                            toggleRole(role.id, checked)
                        }
                    />
                ))}
            </div>

            <div className='flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant pt-4'>
                <span className='text-label-md text-on-surface-variant'>
                    {formatFaNumber(selectedIds.size)} نقش انتخاب‌شده{' '}
                    {formatFaNumber(uniqueRecipients)} گیرنده یکتا
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

export default SelectBasedOnRole
