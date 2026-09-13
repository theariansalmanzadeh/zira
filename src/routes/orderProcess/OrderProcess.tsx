'use client'

import DeliveryAndDate from './component/DeliveryAndDate'
import OrderCard from './component/OrderCard'
import OrderStepper from './component/OrderStepper'
import OrderSummary from './component/OrderSummary'
import OrderProvider, { useOrderProcess } from './provider/OrderProvider'
import { OrderCardData } from './types'

const ORDER_CARDS_DUMMY: OrderCardData[] = [
    {
        id: 'order-item-1',
        brand: 'Lorenzo',
        title: 'ست توری کلاسیک',
        productCode: '7352-63',
        color: 'مشکی',
        size: 'XS',
        unitPrice: '- تومان',
        totalPrice: '- تومان',
        quantity: 120,
    },
]

const OrderProcessContent = () => {
    const { activeStepHeaders, activeStep } = useOrderProcess()

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <div className="flex flex-row items-center justify-center">
                <OrderStepper />
            </div>
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 flex flex-col gap-3 lg:col-span-8">
                    <span className="text-title-md font-medium text-on-surface">
                        {activeStepHeaders.mainHeader}
                    </span>
                    {ORDER_CARDS_DUMMY.map((item) => (
                        <OrderCard key={item.id} data={item} />
                    ))}
                </div>
                <div className="col-span-12 flex flex-col gap-3 lg:col-span-4">
                    <span className="text-title-md font-medium text-on-surface">
                        {activeStepHeaders.subHeader}
                    </span>
                    {activeStep === 'items' && <OrderSummary />}
                    {activeStep === 'address' && <DeliveryAndDate />}
                    {/* {activeStep === 'payment' && <PaymentCard />} */}
                </div>
            </div>
        </div>
    )
}

const OrderProcess = () => {
    return (
        <OrderProvider>
            <OrderProcessContent />
        </OrderProvider>
    )
}

export default OrderProcess
