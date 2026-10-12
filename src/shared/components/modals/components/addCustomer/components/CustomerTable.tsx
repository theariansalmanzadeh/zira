'use client'

import { useMemo, useState } from 'react'
import type {
    CooperationLevel,
    CustomerProfileListItem,
} from '@/src/api/types/admin/customers'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import { useListCustomerProfiles } from '@/src/routes/customers/hooks/customers'
import type { CustomerLevel } from '@/src/routes/customers/components/TableRow'
import type { AddCustomerRow } from '../constants'
import CustomerFilters from './CustomerFilters'
import CustomerTableHeader from './CustomerTableHeader'
import CustomerTableRow from './CustomerTableRow'

type CustomerTableProps = {
    showFilters?: boolean
    selectedIds: Set<string>
    onToggle: (customer: AddCustomerRow) => void
    onToggleAll: (customers: AddCustomerRow[], checked: boolean) => void
}

const mapLevel = (level: string): CustomerLevel => {
    const normalized = level.toUpperCase() as CooperationLevel | string
    if (normalized === 'GOLD') return 'gold'
    if (normalized === 'SILVER') return 'silver'
    return 'bronze'
}

const mapProfileToRow = (
    profile: CustomerProfileListItem
): AddCustomerRow => ({
    id: profile.id,
    code: profile.code,
    name: profile.full_name || profile.store_name || '—',
    level: mapLevel(profile.cooperation_level),
    credit: 0,
    phone: profile.mobile || '—',
    email: '—',
})

const CustomerTable = ({
    showFilters = false,
    selectedIds,
    onToggle,
    onToggleAll,
}: CustomerTableProps) => {
    const [level, setLevel] = useState('all')
    const [search, setSearch] = useState('')
    const { data, isPending, isError } = useListCustomerProfiles()

    const customers = useMemo(() => {
        const query = search.trim().toLowerCase()
        return (data?.results ?? [])
            .map(mapProfileToRow)
            .filter((customer) => {
                const matchesLevel =
                    level === 'all' || customer.level === level
                const matchesSearch =
                    !query ||
                    customer.name.toLowerCase().includes(query) ||
                    customer.code.toLowerCase().includes(query) ||
                    customer.id.toLowerCase().includes(query) ||
                    customer.phone.includes(query)
                return matchesLevel && matchesSearch
            })
    }, [data, level, search])

    const allSelected =
        customers.length > 0 &&
        customers.every((customer) => selectedIds.has(customer.id))
    const someSelected = customers.some((customer) =>
        selectedIds.has(customer.id)
    )

    return (
        <div className="flex flex-col gap-4">
            {showFilters && (
                <CustomerFilters
                    level={level}
                    search={search}
                    onLevelChange={setLevel}
                    onSearchChange={setSearch}
                />
            )}
            <div className="overflow-hidden rounded-card-lg bg-surface-container-high p-2">
                {isPending ? (
                    <TableLoadingSkeleton isPending rows={5} />
                ) : isError ? (
                    <div className="rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline">
                        دریافت لیست مشتریان با خطا مواجه شد.
                    </div>
                ) : customers.length === 0 ? (
                    <div className="rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline">
                        مشتری‌ای یافت نشد.
                    </div>
                ) : (
                    <Table className="min-w-[720px] border-collapse border-spacing-y-4">
                        <CustomerTableHeader
                            allSelected={allSelected}
                            someSelected={someSelected}
                            onToggleAll={(checked) =>
                                onToggleAll(customers, checked)
                            }
                        />
                        <TableBody>
                            {customers.map((customer) => (
                                <CustomerTableRow
                                    key={customer.id}
                                    customer={customer}
                                    checked={selectedIds.has(customer.id)}
                                    onToggle={onToggle}
                                />
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    )
}

export default CustomerTable
