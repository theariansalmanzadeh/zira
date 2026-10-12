'use client'

import { useState } from 'react'
import { Button } from '@/src/shared/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import { cn } from '@/src/shared/libs/utils'
import type { BaseModalProps } from '../../types'
import CustomerTable from './components/CustomerTable'
import GroupTable from './components/GroupTable'
import {
    type AddCustomerModalData,
    type AddCustomerRow,
} from './constants'

export type { AddCustomerModalData, AddCustomerRow }

const AddCustomer = ({ closeModal, data }: BaseModalProps) => {
    const modalData = data as AddCustomerModalData | null | undefined
    const hasGroup = modalData?.hasGroup ?? true
    const [selectedIds, setSelectedIds] = useState(
        () => new Set(modalData?.selectedIds ?? [])
    )
    const [selectedCustomers, setSelectedCustomers] = useState(
        () => new Map<string, AddCustomerRow>()
    )

    const toggleCustomer = (customer: AddCustomerRow) => {
        setSelectedIds((prev) => {
            const next = new Set(prev)
            if (next.has(customer.id)) next.delete(customer.id)
            else next.add(customer.id)
            return next
        })
        setSelectedCustomers((prev) => {
            const next = new Map(prev)
            if (next.has(customer.id)) next.delete(customer.id)
            else next.set(customer.id, customer)
            return next
        })
    }

    const toggleAll = (customers: AddCustomerRow[], checked: boolean) => {
        setSelectedIds((prev) => {
            const next = new Set(prev)
            customers.forEach((customer) => {
                if (checked) next.add(customer.id)
                else next.delete(customer.id)
            })
            return next
        })
        setSelectedCustomers((prev) => {
            const next = new Map(prev)
            customers.forEach((customer) => {
                if (checked) next.set(customer.id, customer)
                else next.delete(customer.id)
            })
            return next
        })
    }

    const handleConfirm = () => {
        const selected = Array.from(selectedCustomers.values()).filter(
            (customer) => selectedIds.has(customer.id)
        )
        modalData?.onChange?.(selected)
        closeModal()
    }

    return (
        <div className="flex w-full flex-col gap-4" dir="rtl">
            <Tabs defaultValue="customers" dir="rtl" className="w-full">
                <TabsList className="w-full justify-start overflow-x-auto overflow-y-hidden border-b-0!">
                    <TabsTrigger value="customers" className="border-b-0!">
                        مشتریان
                    </TabsTrigger>
                    <TabsTrigger value="filters" className="border-b-0!">
                        جستجو
                    </TabsTrigger>
                    {hasGroup && (
                        <TabsTrigger value="groups" className="border-b-0!">
                            گروه‌ها
                        </TabsTrigger>
                    )}
                </TabsList>

                <TabsContent value="customers" className="pt-xl">
                    <CustomerTable
                        selectedIds={selectedIds}
                        onToggle={toggleCustomer}
                        onToggleAll={toggleAll}
                    />
                </TabsContent>

                <TabsContent value="filters" className="pt-xl">
                    <CustomerTable
                        showFilters
                        selectedIds={selectedIds}
                        onToggle={toggleCustomer}
                        onToggleAll={toggleAll}
                    />
                </TabsContent>

                {hasGroup && (
                    <TabsContent value="groups" className="pt-xl">
                        <GroupTable />
                    </TabsContent>
                )}
            </Tabs>

            <div className="flex flex-row items-center justify-between gap-3 pt-2">
                <Button type="button" variant="ghost" onClick={closeModal}>
                    انصراف
                </Button>
                <Button
                    type="button"
                    variant="primary"
                    onClick={handleConfirm}
                    className={cn(selectedIds.size === 0 && 'opacity-60')}
                    disabled={selectedIds.size === 0}
                >
                    افزودن انتخاب‌شده‌ها
                </Button>
            </div>
        </div>
    )
}

export default AddCustomer
