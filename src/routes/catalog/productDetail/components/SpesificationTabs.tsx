'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import { cn } from '@/src/shared/libs/utils'
import type { SpecificationsProps } from '../types'
import Gallery from './Gallery'
import Kardex from './Kardex'
import PriceAndStock, { type PriceAndStockProps } from './PriceAndStock'
import Specifications from './Specifications'
import WarehouseAndGrade from './WarehouseAndGrade'

const BASE_TABS = [
    { value: 'specs', label: 'مشخصات' },
    { value: 'price-stock', label: 'قیمت و موجودی' },
    { value: 'kardex', label: 'کاردکس' },
] as const

const tabTriggerClassName =
    'rounded-container-md flex-1 border-0 px-4 py-2 data-[state=active]:-mb-0 data-[state=active]:bg-surface-container-lowest data-[state=active]:text-on-surface data-[state=active]:shadow-sm data-[state=active]:after:hidden'

type SpesificationTabsProps = {
    className?: string
    warehouseLabel?: string
    showGallery?: boolean
    priceAndStock?: PriceAndStockProps
    specifications?: SpecificationsProps
}

const SpesificationTabs = ({
    className,
    warehouseLabel = 'انبار و گرید',
    showGallery = false,
    priceAndStock,
    specifications,
}: SpesificationTabsProps) => {
    const [tab, setTab] = useState<string>('specs')
    const tabs = [
        ...BASE_TABS,
        ...(showGallery ? [{ value: 'images', label: 'تصاویر' }] : []),
        { value: 'warehouse-grid', label: warehouseLabel },
    ]

    return (
        <Tabs
            value={tab}
            onValueChange={setTab}
            dir='rtl'
            className={cn('w-full gap-4', className)}
        >
            <TabsList className='mb-3 h-auto w-full gap-1 rounded-container-md border-0 bg-surface-container-highest p-1.5'>
                {tabs.map((item) => (
                    <TabsTrigger
                        key={item.value}
                        value={item.value}
                        className={tabTriggerClassName}
                    >
                        {item.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            <TabsContent value='specs' className='mt-0'>
                <Specifications {...specifications} />
            </TabsContent>
            <TabsContent value='price-stock' className='mt-0'>
                <PriceAndStock {...priceAndStock} />
            </TabsContent>
            <TabsContent value='kardex' className='mt-0'>
                <Kardex />
            </TabsContent>
            <TabsContent value='warehouse-grid' className='mt-0'>
                <WarehouseAndGrade />
            </TabsContent>
        </Tabs>
    )
}

export default SpesificationTabs
