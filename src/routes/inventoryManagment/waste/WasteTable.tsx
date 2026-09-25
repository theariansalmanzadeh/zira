'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import AdminSection from './components/AdminSection'
import InventorSection from './components/InventorSection'
import { type WasteRowData } from './components/TableRow'

export const WASTE_DUMMY: WasteRowData[] = [
    {
        id: 'SCR-450',
        productTitle: 'عنوان کالا',
        quantity: 4,
        reason: 'معیوب از مرجوعی',
        registeredAt: '2025-12-09T14:53:00.000Z',
        totalAmount: '-',
        status: 'under-review',
        filterTab: 'under-review',
        warehouseName: 'انبار مرکزی تهران',
        warehouseAddress: 'A-R1-S1-B01',
        warehouseNote: 'آسیب‌دیدگی در بسته‌بندی',
        responsibleName: 'علی رضایی',
        lossAmount: 480000,
    },
    {
        id: 'SCR-449',
        productTitle: 'عنوان کالا',
        quantity: 4,
        reason: 'آسیب در انبار',
        registeredAt: '2025-12-09T14:53:00.000Z',
        totalAmount: '-',
        status: 'under-review',
        filterTab: 'under-review',
        warehouseName: 'انبار مرکزی تهران',
        warehouseAddress: 'A-R2-S1-B03',
        warehouseNote: 'پارگی در انبار',
        responsibleName: 'مریم کریمی',
        lossAmount: 320000,
    },
    {
        id: 'SCR-448',
        productTitle: 'عنوان کالا',
        quantity: 2,
        reason: 'آسیب در انبار',
        registeredAt: '08/12/1404 - 11:10',
        totalAmount: '1,200,000',
        status: 'approved',
        filterTab: 'approved',
        warehouseName: 'انبار کرج',
        warehouseAddress: 'B-R1-S2-B02',
        warehouseNote: 'تایید خسارت انبار',
        responsibleName: 'حسین محمدی',
        lossAmount: 1200000,
    },
    {
        id: 'SCR-447',
        productTitle: 'عنوان کالا',
        quantity: 1,
        reason: 'معیوب از مرجوعی',
        registeredAt: '07/12/1404 - 09:45',
        totalAmount: '-',
        status: 'rejected',
        filterTab: 'rejected',
        warehouseName: 'انبار اصفهان',
        warehouseAddress: 'C-R1-S1-B01',
        warehouseNote: 'مغایرت در علت ضایعات',
        responsibleName: 'علی رضایی',
        lossAmount: 0,
    },
]

const WasteTable = ({ data = WASTE_DUMMY }: { data?: WasteRowData[] }) => {
    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <Tabs defaultValue='inventory' dir='rtl' className='w-full gap-4'>
                <TabsList className='h-auto w-full justify-start border-outline-variant bg-transparent'>
                    <TabsTrigger value='inventory' className='gap-2'>
                        بخش انباردار
                        <span className='flex size-6 items-center justify-center rounded-full bg-surface-container-highest text-label-sm text-on-surface-variant'>
                            {formatFaNumber(data.length)}
                        </span>
                    </TabsTrigger>
                    <TabsTrigger value='admin' className='gap-2'>
                        بخش ادمین انبار
                        <span className='flex size-6 items-center justify-center rounded-full bg-surface-container-highest text-label-sm text-on-surface-variant'>
                            {formatFaNumber(data.length)}
                        </span>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='inventory'>
                    <InventorSection items={data} />
                </TabsContent>
                <TabsContent value='admin'>
                    <AdminSection items={data} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default WasteTable
