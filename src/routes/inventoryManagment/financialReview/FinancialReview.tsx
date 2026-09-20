'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import {
    FINANCIAL_REVIEW_TABS,
    type FinancialReviewTab,
} from './constants'

const WarehouseTabTable = dynamic(
    () => import('./components/WarehouseTabTable'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const ProductTabTable = dynamic(
    () => import('./components/ProductTabTable'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const TrackingTabTable = dynamic(
    () => import('./components/TrackingTabTable'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const SupplierTabTable = dynamic(
    () => import('./components/SupplierTabTable'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const CustomerTabTable = dynamic(
    () => import('./components/CustomerTabTable'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const DocumentsTabTable = dynamic(
    () => import('./components/DocumentsTabTable'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const ItemsTabTable = dynamic(
    () => import('./components/ItemsTabTable'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

const FinancialReview = () => {
    const [tab, setTab] = useState<FinancialReviewTab>('product')

    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <Tabs
                value={tab}
                onValueChange={(value) => setTab(value as FinancialReviewTab)}
                dir='rtl'
                className='w-full gap-4'
            >
                <TabsList className='mb-2 h-auto w-full justify-start overflow-x-auto overflow-y-hidden border-b border-outline-variant bg-transparent'>
                    {FINANCIAL_REVIEW_TABS.map((item) => (
                        <TabsTrigger
                            key={item.value}
                            value={item.value}
                            className='group gap-2 border-0 px-6 py-3! data-[state=active]:-mb-0 data-[state=active]:bg-transparent! data-[state=active]:after:h-[3px]'
                        >
                            <span>{item.label}</span>
                            <span
                                className={cn(
                                    'rounded-full px-2 py-0.5 text-label-sm',
                                    'bg-surface-container-high text-outline',
                                    'group-data-[state=active]:bg-primary/16 group-data-[state=active]:text-primary'
                                )}
                            >
                                {formatFaNumber(item.count)}
                            </span>
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value='warehouse' className='mt-0'>
                    <WarehouseTabTable />
                </TabsContent>
                <TabsContent value='product' className='mt-0'>
                    <ProductTabTable />
                </TabsContent>
                <TabsContent value='tracking' className='mt-0'>
                    <TrackingTabTable />
                </TabsContent>
                <TabsContent value='supplier' className='mt-0'>
                    <SupplierTabTable />
                </TabsContent>
                <TabsContent value='customer' className='mt-0'>
                    <CustomerTabTable />
                </TabsContent>
                <TabsContent value='documents' className='mt-0'>
                    <DocumentsTabTable />
                </TabsContent>
                <TabsContent value='items' className='mt-0'>
                    <ItemsTabTable />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default FinancialReview
