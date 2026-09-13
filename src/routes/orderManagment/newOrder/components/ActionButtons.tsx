'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/src/shared/components/ui/button'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { useCreateOrderContext } from '../provider/CreateOrderProvider'

const ActionButtons = () => {
    const { push } = useRouter()
    const { activeStep, goNext, goPrev, paymentType } = useCreateOrderContext()

    const isLastStep = activeStep === 4
    const showPrev = activeStep > 1
    const nextLabel = isLastStep ? 'ثبت نهایی سفارش' : 'مرحله بعد'

    const handleNext = () => {
        if (isLastStep) {
            push('/admin/order-managment?sub=order-list')
            return
        }
        goNext()
    }

    return (
        <div className="mt-2 flex items-center justify-between gap-3">
            <Button
                type="button"
                variant="outline"
                size="lg"
                className={showPrev ? undefined : 'invisible'}
                onClick={goPrev}
            >
                مرحله قبل
            </Button>
            <Button
                type="button"
                variant="primary"
                size="lg"
                className="gap-2"
                onClick={handleNext}
            >
                {nextLabel}
                <Icon label="chevronLeft400Broken" className="size-4! text-on-primary" />
            </Button>
        </div>
    )
}

export default ActionButtons
