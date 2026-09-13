'use client'

import { useState } from 'react'
import QuickAccessCard from '@/src/shared/components/quickAccessCard'
import AlertBox, {
    AlertBoxContent,
    AlertBoxFooter,
    AlertBoxHeader,
    AlertBoxItem,
    AlertBoxList,
} from '@/src/shared/components/ui/AlertBox'
import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import { Card } from '@/src/shared/components/ui/Card'
import {
    ToggleGroup,
    ToggleGroupItem,
} from '@/src/shared/components/ui/ToggleGroup'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import {
    CUSTOMER_ALERTS,
    CUSTOMER_QUICK_ACCESS_ITEMS,
    CUSTOMER_SUMMARY_STATS_DUMMY,
    TOP_CUSTOMERS,
    TOP_CUSTOMER_SORT_OPTIONS,
    type TopCustomerSort,
} from './constants'
import SummaryStats from './components/SummaryStats'

const CustomerDashboard = () => {
    const [sortBy, setSortBy] = useState<TopCustomerSort>('volume')

    return (
        <div className="grid grid-cols-12 gap-3" dir="rtl">
            <div className="col-span-12 flex flex-col gap-3">
                <span className="text-label-lg font-bold text-outline">
                    خلاصه آمار
                </span>
                <SummaryStats {...CUSTOMER_SUMMARY_STATS_DUMMY} />
            </div>

            <div className="col-span-12 md:col-span-8">
                <Card className="h-full gap-4 rounded-card-lg bg-surface-container-lowest p-3 shadow-none">
                    <div className="flex flex-row items-center justify-between gap-3">
                        <span className="text-title-md font-medium text-on-surface">
                            مشتریان برتر
                        </span>
                        <div className="flex flex-row items-center gap-2">
                            <span className="text-label-md text-outline">
                                بر اساس:
                            </span>
                            <ToggleGroup
                                type="single"
                                variant="filled"
                                value={sortBy}
                                onValueChange={(value) => {
                                    if (value) setSortBy(value as TopCustomerSort)
                                }}
                            >
                                {TOP_CUSTOMER_SORT_OPTIONS.map((option) => (
                                    <ToggleGroupItem
                                        key={option.value}
                                        value={option.value}
                                        className="rounded-full!"
                                    >
                                        {option.label}
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {TOP_CUSTOMERS.map((customer, index) => (
                            <div
                                key={customer.name}
                                className="flex min-h-12 flex-row items-center justify-between gap-3"
                            >
                                <div className="flex w-40 max-w-40 items-center gap-2">
                                    <span className="shrink-0 text-label-lg text-outline">
                                        {index + 1}.
                                    </span>
                                    <Avatar size="sm">
                                        <AvatarFallback className="bg-surface-container-high text-label-lg text-on-surface">
                                            {customer.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-label-lg text-on-surface underline">
                                        {customer.name}
                                    </span>
                                </div>
                                <span className="shrink-0 text-label-md font-semibold text-on-surface">
                                    {formatFaNumber(customer.orders)} سفارش
                                </span>
                                <span className="shrink-0 text-left text-label-md text-outline">
                                    {formatPrice(customer.amount)} تومان
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <div className="col-span-12 md:col-span-4">
                <AlertBox className="h-full">
                    <AlertBoxHeader>
                        <span className="text-title-md font-medium text-on-surface">
                            هشدارها
                        </span>
                    </AlertBoxHeader>
                    <AlertBoxContent>
                        <AlertBoxList>
                            {CUSTOMER_ALERTS.map((alert, index) => (
                                <AlertBoxItem
                                    key={index}
                                    title={alert.title}
                                    description={alert.description}
                                />
                            ))}
                        </AlertBoxList>
                    </AlertBoxContent>
                    <AlertBoxFooter href="/admin/customers?sub=requests">
                        مشاهده همه هشدارها
                    </AlertBoxFooter>
                </AlertBox>
            </div>

            <div className="col-span-12">
                <QuickAccessCard>
                    <QuickAccessCard.Header>دسترسی سریع</QuickAccessCard.Header>
                    <QuickAccessCard.Content>
                        <QuickAccessCard.List>
                            {CUSTOMER_QUICK_ACCESS_ITEMS.map((item) => (
                                <QuickAccessCard.Item
                                    key={item.label}
                                    label={item.label}
                                    href={item.href}
                                />
                            ))}
                        </QuickAccessCard.List>
                    </QuickAccessCard.Content>
                </QuickAccessCard>
            </div>
        </div>
    )
}

export default CustomerDashboard
