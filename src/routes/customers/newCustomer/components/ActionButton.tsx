'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { NEW_CUSTOMER_STEPS, type NewCustomerStep } from '../constants'

type ActionButtonProps = {
    activeStep: NewCustomerStep
    onContinue: () => void
    onBack: () => void
    onCancel?: () => void
}

const ActionButton = ({
    activeStep,
    onContinue,
    onBack,
    onCancel,
}: ActionButtonProps) => {
    const isLastStep = activeStep === NEW_CUSTOMER_STEPS.customerAccount

    return (
        <div className="flex flex-row-reverse justify-between items-center gap-3">
            <Button
                type={isLastStep ? 'submit' : 'button'}
                variant="primary"
                className={isLastStep ? 'gap-2' : undefined}
                onClick={isLastStep ? undefined : onContinue}
                size="lg"
            >
                {isLastStep && (
                    <Icon
                        label="checkSm300Linear"
                        className="size-6! text-on-primary"
                    />
                )}
                {isLastStep ? 'ثبت و ارسال برای تایید' : 'ادامه'}
            </Button>
            {activeStep !== NEW_CUSTOMER_STEPS.identity && (
                <Button type="button" size="lg" variant="secondary" onClick={onBack}>
                    قبلی
                </Button>
            )}
        </div>
    )
}

export default ActionButton
