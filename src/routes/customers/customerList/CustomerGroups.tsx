'use client'

import { useMemo } from 'react'
import type { CustomerGroupListItem } from '@/src/api/types/admin/customers'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import CustomerGroupCard from '../components/CustomerGroupCard'
import { useListCustomerGroups } from '../hooks/customers'

const mapGroupToCard = (group: CustomerGroupListItem) => ({
    id: group.id,
    title: group.name,
    subtitle: group.code,
    status: group.is_active ? 'فعال' : 'غیرفعال',
    statusVariant: (group.is_active ? 'success' : 'tonal') as
        | 'success'
        | 'tonal',
    customerCount: group.member_count ?? 0,
    discountPercent: 0,
    marketerPercent: Number(group.marketer_percent) || 0,
    marketerName: group.marketer_name ?? undefined,
})

const CustomerGroups = () => {
    const { data, isPending, isError } = useListCustomerGroups()

    const groups = useMemo(
        () => (data?.results ?? []).map(mapGroupToCard),
        [data]
    )

    if (isPending) {
        return <TableLoadingSkeleton isPending rows={3} />
    }

    if (isError) {
        return (
            <div className="rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline">
                دریافت لیست گروه‌ها با خطا مواجه شد.
            </div>
        )
    }

    if (groups.length === 0) {
        return (
            <div className="rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline">
                گروهی یافت نشد.
            </div>
        )
    }

    return (
        <>
            {groups.map((group) => (
                <CustomerGroupCard
                    key={group.id}
                    id={group.id}
                    title={group.title}
                    subtitle={group.subtitle}
                    status={group.status}
                    statusVariant={group.statusVariant}
                    customerCount={group.customerCount}
                    discountPercent={group.discountPercent}
                    marketerPercent={group.marketerPercent}
                    marketerName={group.marketerName}
                />
            ))}
        </>
    )
}

export default CustomerGroups
