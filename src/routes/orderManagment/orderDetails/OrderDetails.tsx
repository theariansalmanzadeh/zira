'use client'

import StepperStatus from '@/src/shared/components/StepperStatus/StepperStatus'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/src/shared/components/ui/Tabs'
import { PRE_ORDER_STATUS_STEPS } from '../preOrderDatails/constants'
import CustomerInfo from './components/CustomerInfo'
import OrderInfoCard from './components/OrderInfoCard'
import OrderItemsDetail from './components/orderItemsDetail'
import PaymentInfoCard from './components/PaymentInfoCard'
import RecipientInfoCard from './components/RecipientInfoCard'

const ORDER_DETAIL_TABS = [
    { value: 'order', label: 'جزئیات سفارش' },
    { value: 'customer', label: 'اطلاعات مشتری' },
] as const

const OrderDetails = () => {
    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <StepperStatus steps={PRE_ORDER_STATUS_STEPS} />

            <Tabs
                defaultValue="order"
                dir="rtl"
                className="w-full items-stretch gap-4"
            >
                <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto overflow-y-hidden border-b border-outline-variant bg-transparent">
                    {ORDER_DETAIL_TABS.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="border-b-0! px-4 py-2.5 data-[state=active]:bg-transparent"
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="order" className="mt-4">
                    <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-12 flex flex-col gap-3 lg:col-span-8">
                            <OrderItemsDetail />
                        </div>
                        <div className="col-span-12 flex flex-col gap-3 lg:col-span-4">
                            <OrderInfoCard />
                            <RecipientInfoCard />
                            <PaymentInfoCard />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="customer" className="mt-4">
                    <CustomerInfo />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default OrderDetails
