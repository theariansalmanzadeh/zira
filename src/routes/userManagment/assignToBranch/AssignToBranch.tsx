'use client'

import { useMemo, useState } from 'react'
import type { StaffUser } from '@/src/api/types/admin/user'
import { useListBranches } from '@/src/routes/branches/hooks/organization'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { cn } from '@shared/libs/utils'
import {
    useGrantUserBranches,
    useListStaffUsers,
    useListUserBranches,
    useRevokeUserBranches,
} from '../hooks/user'

const AVATAR_COLORS = [
    'bg-[#E8B4C4] text-[#7A3148]',
    'bg-[#A9C4E4] text-[#2A4E78]',
    'bg-[#CDB992] text-[#5C4524]',
    'bg-[#A9CBA4] text-[#2C5A34]',
]

const avatarColor = (id: string) => {
    const index = id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
    return AVATAR_COLORS[index % AVATAR_COLORS.length]
}

const displayName = (user: StaffUser) =>
    `${user.first_name} ${user.last_name}`.trim() || user.username

const initial = (user: StaffUser) =>
    (user.first_name || user.username || '؟').trim().charAt(0)

const AssignToBranch = () => {
    const { data: staffUsers } = useListStaffUsers()
    const { data: branchesData } = useListBranches()
    const [userSearch, setUserSearch] = useState('')
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const { data: userBranches, isPending: isLoadingUserBranches } =
        useListUserBranches(selectedId ?? '', Boolean(selectedId))
    const { mutate: grantUserBranches, isPending: isGranting } =
        useGrantUserBranches()
    const { mutate: revokeUserBranches, isPending: isRevoking } =
        useRevokeUserBranches()
    const isUpdatingBranches = isGranting || isRevoking

    const branches = useMemo(
        () => branchesData?.results ?? [],
        [branchesData?.results]
    )

    const branchOptions = useMemo(
        () =>
            branches.map((branch) => ({
                label: branch.name,
                value: branch.id,
            })),
        [branches]
    )
    const branchNameById = useMemo(
        () => new Map(branches.map((branch) => [branch.id, branch.name])),
        [branches]
    )
    const assignedBranchIds = useMemo(
        () => new Set(userBranches?.results ?? []),
        [userBranches?.results]
    )
    const assignedBranches = useMemo(
        () =>
            (userBranches?.results ?? []).map((branchId) => ({
                id: branchId,
                name: branchNameById.get(branchId) || branchId,
            })),
        [branchNameById, userBranches?.results]
    )

    const userOptions = useMemo(
        () =>
            (staffUsers?.results ?? []).map((user) => ({
                label: user.personnel_code
                    ? `${displayName(user)} · ${user.personnel_code}`
                    : displayName(user),
                value: user.id,
            })),
        [staffUsers?.results]
    )

    const selected = (staffUsers?.results ?? []).find(
        (user) => user.id === selectedId
    )

    const selectUser = (user: StaffUser) => {
        setSelectedId(user.id)
    }

    const toggleBranch = (branchId: string, isAssigned: boolean) => {
        if (!selectedId || isUpdatingBranches) return
        const mutation = isAssigned ? revokeUserBranches : grantUserBranches
        mutation({
            userId: selectedId,
            body: { branch_ids: [branchId] },
        })
    }

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3" dir="rtl">
            <section className="flex min-h-96 col-span-1 flex-col gap-3 rounded-card-lg border border-outline-variant bg-surface-container-lowest p-4">
                <h2 className="text-label-lg font-semibold text-on-surface">
                    انتخاب پرسنل
                </h2>
                <FormDropdown
                    label="پرسنل"
                    placeholder="نام یا کد پرسنلی..."
                    value={selectedId ?? undefined}
                    options={userOptions}
                    hasSearch
                    searchQuery={userSearch}
                    onSearch={setUserSearch}
                    onChange={(userId) => {
                        const user = (staffUsers?.results ?? []).find(
                            (item) => item.id === userId
                        )
                        if (user) selectUser(user)
                    }}
                />
            </section>

            <section className="flex flex-col gap-4 col-span-2 bg-surface-container-lowest p-6 rounded-card-lg">
                <div className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-4">
                    {selected ? (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <span
                                    className={cn(
                                        'flex size-14 shrink-0 items-center justify-center rounded-full text-title-md font-semibold',
                                        avatarColor(selected.id)
                                    )}
                                >
                                    {initial(selected)}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="text-title-md font-bold text-on-surface">
                                            {displayName(selected)}
                                        </h3>
                                        <span className="rounded-full bg-surface-container-high px-3 py-1 text-label-sm text-on-surface-variant">
                                            {selected.job_title || 'عضو'}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-label-md text-outline">
                                        کد پرسنلی:{' '}
                                        <span className="font-semibold text-primary">
                                            {selected.personnel_code || '—'}
                                        </span>
                                        <span className="mx-2">موبایل:</span>
                                        <span dir="ltr">
                                            {selected.phone_number || '—'}
                                        </span>
                                        <span className="mx-2">نقش:</span>
                                        <span>{selected.job_title || '—'}</span>
                                    </p>
                                </div>
                            </div>
                            <p
                                className={cn(
                                    'text-label-md text-on-surface',
                                    isLoadingUserBranches && 'animate-pulse'
                                )}
                            >
                                شعبه‌ها:{' '}
                                <span className="font-semibold">
                                    {assignedBranches.length
                                        ? assignedBranches
                                              .map((branch) => branch.name)
                                              .join('، ')
                                        : '—'}
                                </span>
                            </p>
                        </div>
                    ) : (
                        <p className="py-8 text-center text-label-md text-outline">
                            یک پرسنل را از لیست انتخاب کنید
                        </p>
                    )}
                </div>
                <FormDropdown
                    label="انتخاب شعبه"
                    placeholder="شعبه را انتخاب کنید"
                    options={branchOptions}
                    checkedValues={[...assignedBranchIds]}
                    disabled={!selected || isUpdatingBranches}
                    className={cn(isUpdatingBranches && 'animate-pulse')}
                    onChange={(branchId) =>
                        toggleBranch(branchId, assignedBranchIds.has(branchId))
                    }
                />
            </section>
        </div>
    )
}

export default AssignToBranch
