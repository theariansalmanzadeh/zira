import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import { ADD_PRODUCT_TABS, TAB_CONTENT } from './Tabs'

const AttributeSection = () => {
    return (
        <div className='w-full'>
            <span className='text-outline text-label-lg'>
                مشخصات
            </span>
            <div className='w-full rounded-card-lg bg-surface-container-lowest p-6'>
                <Tabs defaultValue='basic-info' dir='rtl' className='w-full'>
                    <TabsList className='w-full justify-start overflow-x-auto overflow-y-hidden border-b-0!'>
                        {ADD_PRODUCT_TABS.map((tab) => (
                            <TabsTrigger key={tab.value} value={tab.value} className='border-b-0!'>
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {ADD_PRODUCT_TABS.map((tab) => {
                        const TabContent = TAB_CONTENT[tab.value]
                        return (
                            <TabsContent key={tab.value} value={tab.value} className='pt-xl'>
                                <TabContent />
                            </TabsContent>
                        )
                    })}
                </Tabs>
            </div>
        </div>
    )
}

export default AttributeSection
