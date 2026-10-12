'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import AdditionalSettingsTab from './components/AdditionalSettingsTab'
import DomainTab from './components/DomainTab'
import GalleryTab from './components/GalleryTab'
import InfoTab from './components/InfoTab'
import Pricing from './components/pricing'

const AddAndUpdatePack = () => {
    return (
        <div className='flex w-full flex-col gap-4' dir='rtl'>
            <Tabs defaultValue='gallery' dir='rtl' className='w-full bg-surface-container-lowest rounded-card-lg p-1'>
                <TabsList className='w-full justify-start overflow-x-auto overflow-y-hidden p-2'>
                    <TabsTrigger value='gallery'>گالری</TabsTrigger>
                    <TabsTrigger value='domain'>دامنه نمایش</TabsTrigger>
                    <TabsTrigger value='info'>اطلاعات پایه</TabsTrigger>
                    <TabsTrigger value='pricing'>قیمت‌گذاری</TabsTrigger>
                    <TabsTrigger value='seo'>سئو</TabsTrigger>
                </TabsList>

                <TabsContent value='gallery' className='pt-xl p-4'>
                    <GalleryTab />
                </TabsContent>
                <TabsContent value='domain' className='pt-xl p-4'>
                    <DomainTab />
                </TabsContent>
                <TabsContent value='info' className='pt-xl p-4'>
                    <InfoTab />
                </TabsContent>
                <TabsContent value='pricing' className='pt-xl p-4'>
                    <Pricing />
                </TabsContent>
                <TabsContent value='seo' className='pt-xl p-4'>
                    <AdditionalSettingsTab />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default AddAndUpdatePack
