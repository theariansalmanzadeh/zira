'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/src/shared/components/ui/button'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { useNewFactorContext } from '../provider/NewFactorProvider'

const ActionButtons = () => {
    const { push } = useRouter()
    const { activeStep, goNext, goPrev } = useNewFactorContext()

    const isLastStep = activeStep === 3
    const showPrev = activeStep > 1
    const nextLabel = isLastStep ? 'ثبت نهایی فاکتور' : 'مرحله بعد'

    const handleNext = () => {
        if (isLastStep) {
            push('/admin/sales?sub=invoices')
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
