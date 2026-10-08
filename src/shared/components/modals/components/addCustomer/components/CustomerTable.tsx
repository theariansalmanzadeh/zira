'use client'

import { Table, TableBody } from '@/src/shared/components/ui/Table'
import type { AddCustomerRow } from '../constants'
import CustomerTableHeader from './CustomerTableHeader'
import CustomerTableRow from './CustomerTableRow'

type CustomerTableProps = {
    customers: AddCustomerRow[]
    selectedIds: Set<string>
    onToggle: (id: string) => void
    onToggleAll: (checked: boolean) => void
}

const CustomerTable = ({
    customers,
    selectedIds,
    onToggle,
    onToggleAll,
}: CustomerTableProps) => {
    const allSelected =
        customers.length > 0 &&
        customers.every((customer) => selectedIds.has(customer.id))
    const someSelected = customers.some((customer) => selectedIds.has(customer.id))

    return (
        <div className="overflow-hidden rounded-card-lg bg-surface-container-high p-2">
            <Table className="min-w-[720px] border-collapse border-spacing-y-4">
                <CustomerTableHeader
                    allSelected={allSelected}
                    someSelected={someSelected}
                    onToggleAll={onToggleAll}
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
        </div>
    )
}

export default CustomerTable
