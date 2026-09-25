'use client'

import { useRouter } from 'next/navigation'
import IconButton from '@/src/shared/components/ui/IconButton'
import StepperStatus from '@/src/shared/components/StepperStatus/StepperStatus'
import CreateOrderProvider, {
    useCreateOrderContext,
} from './provider/CreateOrderProvider'
import { CREATE_ORDER_STEPS } from './constants'
import CustomerStep from './components/CustomerStep'
import ItemsStep from './components/ItemsStep'
import PaymentStrategy from './components/PaymentStrategy'
import ConfirmStep from './components/ConfirmStep'
import ActionButtons from './components/ActionButtons'
import { StepperStatusStep } from '@/src/shared/components/StepperStatus/types'

const NewOrderContent = () => {
    const { back } = useRouter()
    const { activeStep } = useCreateOrderContext()

    const steps: StepperStatusStep[] = CREATE_ORDER_STEPS.map((step) => ({
        id: String(step.step),
        label: step.label,
        status:
            step.step < activeStep
                ? 'complete'
                : step.step === activeStep
                    ? 'pending'
                    : 'not_reached',
    }))

    return (
        <div className='flex flex-col w-full max-w-[1024px] mx-auto gap-6' dir='rtl'>
            <div className='flex flex-row items-center gap-2'>
                <IconButton
                    icon='arrorwRight300Linear'
                    onClick={() => back()}
                    iconClassName='size-6 text-on-surface-variant'
                    variant='ghost'
                />
                <span className='text-title-lg font-medium text-on-surface'>
                    ثبت سفارش جدید
                </span>
            </div>
            <StepperStatus steps={steps} />
            <div className='w-full'>
                {activeStep === 1 && <CustomerStep />}
                {activeStep === 2 && <ItemsStep />}
                {activeStep === 3 && <PaymentStrategy />}
                {activeStep === 4 && <ConfirmStep />}
                <ActionButtons />
            </div>
        </div>
    )
}

const NewOrder = () => {
    return (
        <CreateOrderProvider>
            <NewOrderContent />
        </CreateOrderProvider>
    )
}

export default NewOrder
