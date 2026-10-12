'use client'

import { useMemo } from 'react'
import type { CustomerGroupListItem } from '@/src/api/types/admin/customers'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import { useListCustomerGroups } from '@/src/routes/customers/hooks/customers'
import type { AddCustomerGroupRow } from '../constants'
import GroupTableHeader from './GroupTableHeader'
import GroupTableRow from './GroupTableRow'

const mapGroupToRow = (group: CustomerGroupListItem): AddCustomerGroupRow => ({
    id: group.id,
    name: group.name,
    code: group.code,
    status: group.is_active ? 'active' : 'diactive',
})

const GroupTable = () => {
    const { data, isPending, isError } = useListCustomerGroups()

    const groups = useMemo(
        () => (data?.results ?? []).map(mapGroupToRow),
        [data]
    )

    return (
        <div className="overflow-hidden rounded-card-lg bg-surface-container-high p-2">
            {isPending ? (
                <TableLoadingSkeleton isPending rows={5} />
            ) : isError ? (
                <div className="rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline">
                    دریافت لیست گروه‌ها با خطا مواجه شد.
                </div>
            ) : groups.length === 0 ? (
                <div className="rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline">
                    گروهی یافت نشد.
                </div>
            ) : (
                <Table className="min-w-[720px] border-collapse border-spacing-y-4">
                    <GroupTableHeader />
                    <TableBody>
                        {groups.map((group) => (
                            <GroupTableRow key={group.id} group={group} />
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}

export default GroupTable
