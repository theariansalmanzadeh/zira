'use client'

import Header from './components/Header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import { CUSTOMER_DETAIL_TABS } from './constants'

const CustomerDetail = () => {
    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <Header />
            <Tabs defaultValue="infos" dir="rtl" className="w-full items-stretch gap-4">
                <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto overflow-y-hidden border-b border-outline-variant bg-transparent">
                    {CUSTOMER_DETAIL_TABS.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="border-b-0! px-4 py-2.5 data-[state=active]:bg-transparent"
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {CUSTOMER_DETAIL_TABS.map((tab) => {
                    const Content = tab.tabContent
                    return (
                        <TabsContent key={tab.value} value={tab.value} className="mt-10">
                            <Content />
                        </TabsContent>
                    )
                })}
            </Tabs>
        </div>
    )
}

export default CustomerDetail
