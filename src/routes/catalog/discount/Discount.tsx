'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import CashTable from './components/CashTable'
import CombinedTable from './components/CombinedTable'

const tabTriggerClassName =
    'rounded-container-md flex-1 border-0 px-4 py-2 data-[state=active]:-mb-0 data-[state=active]:bg-surface-container-lowest data-[state=active]:text-on-surface data-[state=active]:shadow-sm data-[state=active]:after:hidden'

type DiscountTab = 'cash' | 'bundle'

const Discount = () => {
    const [tab, setTab] = useState<DiscountTab>('cash')

    return (
        <Tabs
            value={tab}
            onValueChange={(value) => setTab(value as DiscountTab)}
            dir='rtl'
            className='w-full gap-4'
        >
            <TabsList className='h-auto w-full gap-1 rounded-container-md border-0 bg-surface-container-high p-1.5'>
                <TabsTrigger value='cash' className={tabTriggerClassName}>
                    تخفیف خرید نقدی
                </TabsTrigger>
                <TabsTrigger value='bundle' className={tabTriggerClassName}>
                    تخفیف ترکیبی
                </TabsTrigger>
            </TabsList>
            <TabsContent value='cash' className='mt-0'>
                <CashTable />
            </TabsContent>
            <TabsContent value='bundle' className='mt-0'>
                <CombinedTable />
            </TabsContent>
        </Tabs>
    )
}

export default Discount
