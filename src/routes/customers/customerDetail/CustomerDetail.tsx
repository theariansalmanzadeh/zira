'use client'

import Header from './components/Header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import { useGetCustomerProfile } from '@/src/routes/customers/hooks/customers'
import { CUSTOMER_DETAIL_TABS } from './constants'
import { displayValue } from './display'
import { useParams } from 'next/navigation'

const CustomerDetail = () => {
    const params = useParams<{ id: string }>()
    const customerId = params.id ?? ''
    const { data: profile } = useGetCustomerProfile(
        customerId,
        Boolean(customerId)
    )
    const fullName = [profile?.identity.first_name, profile?.identity.last_name]
        .filter(Boolean)
        .join(' ')

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <Header
                name={displayValue(fullName || profile?.store_name)}
                customerId={displayValue(profile?.code)}
                levelText={displayValue(profile?.cooperation_level_display)}
                statusText={displayValue(profile?.status_display)}
                status={profile?.status}
                userLevel={profile?.verification_level}
                creditScore="-"
                tenure="-"
            />
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
