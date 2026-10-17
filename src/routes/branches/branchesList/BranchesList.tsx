'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import InfoCard from '@/src/shared/components/infoCard/InfoCard'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { useTableActionsStore } from '@/src/shared/store/table-actions-store'
import { useListBranches } from '@/src/routes/branches/hooks/organization'
import type { BranchListItem } from '@/src/api/types/admin/organization'
import { formatFaNumber } from '@/src/shared/libs/formatter'

const getStatusProps = (status?: string, statusDisplay?: string) => {
    const s = status?.toUpperCase()
    if (s === 'ACTIVE') {
        return {
            status: statusDisplay || 'فعال',
            statusVariant: 'success' as const,
        }
    }
    if (s === 'INACTIVE') {
        return {
            status: statusDisplay || 'غیرفعال',
            statusVariant: 'tonal' as const,
        }
    }
    if (s === 'CLOSED') {
        return {
            status: statusDisplay || 'تعطیل',
            statusVariant: 'error' as const,
        }
    }
    return {
        status: statusDisplay || 'فعال',
        statusVariant: 'success' as const,
    }
}

const BranchesList = () => {
    const searchParams = useSearchParams()
    const search = useTableActionsStore((state) => state.search)
    const activeFilter = searchParams.get('cat') ?? 'all'

    const statusParam =
        activeFilter === 'active'
            ? 'ACTIVE'
            : activeFilter === 'inactive'
                ? 'INACTIVE'
                : undefined

    const { data, isPending, isError } = useListBranches({
        status: statusParam,
        search: search ? search.trim() : undefined,
    })

    const filteredBranches = useMemo(() => {
        let list: BranchListItem[] = Array.isArray(data)
            ? data
            : ((data as unknown as { results?: BranchListItem[] })?.results ?? [])

        if (activeFilter === 'active') {
            list = list.filter((b) => b.status?.toUpperCase() === 'ACTIVE')
        } else if (activeFilter === 'inactive') {
            list = list.filter((b) => b.status?.toUpperCase() === 'INACTIVE')
        }

        const query = search.trim().toLowerCase()
        if (query) {
            list = list.filter(
                (b) =>
                    b.name?.toLowerCase().includes(query) ||
                    b.code?.toLowerCase().includes(query) ||
                    b.city?.toLowerCase().includes(query) ||
                    b.full_address?.toLowerCase().includes(query) ||
                    b.phone?.includes(query)
            )
        }

        return list
    }, [data, activeFilter, search])

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <TableListLayout
                value={activeFilter}
                toggleButtonValue={ROUTE_CONFIGS.branches.TOGGLE_BUTTON_VALUE}
                hasHeaderActions
                isCardLayout
            >
                {isPending ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex h-64 w-full animate-pulse flex-col rounded-card-md bg-surface-container-high p-4"
                        >
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <div className="h-5 w-28 rounded bg-surface-container-highest" />
                                    <div className="h-3 w-16 rounded bg-surface-container-highest" />
                                </div>
                                <div className="h-6 w-14 rounded-full bg-surface-container-highest" />
                            </div>
                            <div className="my-6 border-t border-dashed border-outline-variant" />
                            <div className="space-y-3">
                                <div className="h-4 w-36 rounded bg-surface-container-highest" />
                                <div className="h-4 w-44 rounded bg-surface-container-highest" />
                                <div className="h-4 w-52 rounded bg-surface-container-highest" />
                            </div>
                        </div>
                    ))
                ) : isError ? (
                    <div className="col-span-full rounded-card-md bg-surface-container-lowest px-4 py-8 text-center text-label-md text-outline">
                        دریافت لیست شعب با خطا مواجه شد.
                    </div>
                ) : filteredBranches.length === 0 ? (
                    <div className="col-span-full rounded-card-md bg-surface-container-lowest px-4 py-8 text-center text-label-md text-outline">
                        شعبه‌ای یافت نشد.
                    </div>
                ) : (
                    filteredBranches.map((branch) => {
                        const { status, statusVariant } = getStatusProps(
                            branch.status,
                            branch.status_display
                        )

                        return (
                            <InfoCard
                                key={branch.id}
                                title={branch.name || 'شعبه'}
                                subtitle={
                                    branch.code
                                        ? `شناسه ${formatFaNumber(branch.code)}`
                                        : `شناسه ${branch.id}`
                                }
                                manager={{
                                    label: 'مسئول',
                                    value:
                                        (branch as { manager_name?: string })
                                            .manager_name || '—',
                                }}
                                email={{
                                    label: 'محله',
                                    value:
                                        (branch as { province?: string }).province ||
                                        '—',
                                }}
                                phone={{
                                    label: 'شماره تماس',
                                    value: branch.phone || '—',
                                }}
                                address={{
                                    label: 'آدرس',
                                    value:
                                        branch.full_address ||
                                        [branch.province, branch.city]
                                            .filter(Boolean)
                                            .join('، ') ||
                                        '—',
                                }}
                                status={status}
                                statusVariant={statusVariant}
                                href={`/admin/branches/details/${branch.id}`}
                            />
                        )
                    })
                )}
            </TableListLayout>
        </div>
    )
}

export default BranchesList