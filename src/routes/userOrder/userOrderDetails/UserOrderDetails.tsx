import React from 'react'
import Status from './components/Status'
import OrderItemsDetail from './components/orderItemsDetail'
import OrderInfoCard from './components/OrderInfoCard'
import RecipientInfoCard from './components/RecipientInfoCard'
import PaymentInfoCard from './components/PaymentInfoCard'
import { ORDER_STATUS_STEPS } from '../constants'

const UserOrderDetails = () => {
    return (
        <div className='grid grid-cols-12 gap-3' dir='rtl'>
            <div className='col-span-12 lg:col-span-9 flex flex-col gap-3'>
                <Status steps={ORDER_STATUS_STEPS} />
                <OrderItemsDetail />
            </div>
            <div className='col-span-12 lg:col-span-3 flex flex-col gap-3'>
                <OrderInfoCard />
                <RecipientInfoCard />
                <PaymentInfoCard />
            </div>
        </div>
    )
}

export default UserOrderDetails