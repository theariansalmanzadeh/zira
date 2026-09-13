import StepperStatus from '@/src/shared/components/ui/StepperStatus'
import ProductRequest from './components/ProductRequest'
import PaymentSummary from './components/PaymentSummary'
import PaymentDetails from './components/PaymentDetails'
import { PRE_ORDER_STATUS_STEPS } from './constants'

const PreOrderDetails = () => {
    return (
        <div className='grid grid-cols-12 gap-3' dir='rtl'>
            <div className='col-span-12 flex flex-col gap-3 lg:col-span-9'>
                <StepperStatus steps={PRE_ORDER_STATUS_STEPS} />
                <ProductRequest />
                <PaymentSummary fields={[]} />
            </div>
            <div className='col-span-12 flex flex-col gap-3 lg:col-span-3'>
                <PaymentDetails />
            </div>
        </div>
    )
}

export default PreOrderDetails
