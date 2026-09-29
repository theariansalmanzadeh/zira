'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import { cn } from '@/src/shared/libs/utils'
import Kardex from './Kardex'
import PriceAndStock from './PriceAndStock'
import Gallery from './Gallery'
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
}

const SpesificationTabs = ({
    className,
    warehouseLabel = 'انبار و گرید',
    showGallery = false,
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
            <TabsList className='h-auto w-full gap-1 rounded-container-md border-0 bg-surface-container-highest p-1.5 mb-3'>
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
                <Specifications />
            </TabsContent>
            <TabsContent value='price-stock' className='mt-0'>
                <PriceAndStock />
            </TabsContent>
            <TabsContent value='kardex' className='mt-0'>
                <Kardex />
            </TabsContent>
            {/* {showGallery && (
                <TabsContent value='images' className='mt-0'>
                    <Gallery />
                </TabsContent>
            )} */}
            <TabsContent value='warehouse-grid' className='mt-0'>
                <WarehouseAndGrade />
            </TabsContent>
        </Tabs>
    )
}

export default SpesificationTabs
