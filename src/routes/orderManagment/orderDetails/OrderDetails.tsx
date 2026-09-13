import StepperStatus from '@/src/shared/components/ui/StepperStatus'
import OrderItemsDetail from './components/orderItemsDetail'
import OrderInfoCard from './components/OrderInfoCard'
import RecipientInfoCard from './components/RecipientInfoCard'
import PaymentInfoCard from './components/PaymentInfoCard'
import { PRE_ORDER_STATUS_STEPS } from '../preOrderDatails/constants'

const OrderDetails = () => {
    return (
        <div className='grid grid-cols-12 gap-3' dir='rtl'>
            <div className='col-span-12 flex flex-col gap-3 lg:col-span-9'>
                <StepperStatus steps={PRE_ORDER_STATUS_STEPS} />
                <OrderItemsDetail />
            </div>
            <div className='col-span-12 flex flex-col gap-3 lg:col-span-3'>
                <OrderInfoCard />
                <RecipientInfoCard />
                <PaymentInfoCard />
            </div>
        </div>
    )
}

export default OrderDetails
