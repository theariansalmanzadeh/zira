'use client'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/src/shared/components/ui/Tabs'
import { CUSTOMER_DETAIL_TABS } from '../constants'

const CustomerDetailTabs = () => {
    return (
        <Tabs defaultValue="infos" dir="rtl" className="w-full items-stretch gap-4">
            <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto overflow-y-hidden border-b border-outline-variant bg-transparent">
                {CUSTOMER_DETAIL_TABS.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="border-b-0! px-4 py-2.5 text-label-lg"
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>

            {CUSTOMER_DETAIL_TABS.map((tab) => {
                const Content = tab.tabContent
                return (
                    <TabsContent key={tab.value} value={tab.value} className="mt-1">
                        <Content />
                    </TabsContent>
                )
            })}
        </Tabs>
    )
}

export default CustomerDetailTabs
