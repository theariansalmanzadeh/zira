'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import type { RequestDetailsData } from '../constants'
import ProductAddress from './ProductAddress'
import RequestDetails from './RequestDetails'

const tabTriggerClassName =
    'rounded-container-md px-xl py-sm text-on-surface-variant after:hidden data-[state=active]:-mb-0 data-[state=active]:bg-surface-container-lowest data-[state=active]:text-on-surface data-[state=active]:shadow-sm'

const InvoiceDetailsTabs = ({ request }: { request: RequestDetailsData }) => (
    <Tabs defaultValue='request' dir='rtl' className='gap-4'>
        <div className='flex items-center justify-between gap-2'>
            <TabsList className='h-auto rounded-container-md border-0 bg-surface-container-high p-1.5'>
                <TabsTrigger value='request' className={tabTriggerClassName}>
                    جزییات درخواست
                </TabsTrigger>
                <TabsTrigger value='address' className={tabTriggerClassName}>
                    آدرس کالا
                </TabsTrigger>
            </TabsList>
        </div>
        <div className='rounded-card-md bg-surface-container-lowest p-4'>
            <TabsContent value='request'>
                <RequestDetails data={request} />
            </TabsContent>
            <TabsContent value='address'>
                <ProductAddress />
            </TabsContent>
        </div>
    </Tabs>
)

export default InvoiceDetailsTabs
