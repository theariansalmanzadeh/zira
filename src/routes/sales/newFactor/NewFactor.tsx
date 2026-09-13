'use client'

import { useRouter } from 'next/navigation'
import IconButton from '@/src/shared/components/ui/IconButton'
import StepperStatus, {
    type StepperStatusStep,
} from '@/src/shared/components/ui/StepperStatus'
import NewFactorProvider, {
    useNewFactorContext,
} from './provider/NewFactorProvider'
import { CREATE_FACTOR_STEPS } from './constants'
import CustomerStep from './components/CustomerStep'
import ItemsStep from './components/ItemsStep'
import Summary from './components/Summary'
import ActionButtons from './components/ActionButtons'

const NewFactorContent = () => {
    const { back } = useRouter()
    const { activeStep } = useNewFactorContext()

    const steps: StepperStatusStep[] = CREATE_FACTOR_STEPS.map((step) => ({
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
        <div className="mx-auto flex w-full max-w-[1024px] flex-col gap-6" dir="rtl">
            <div className="flex flex-row items-center gap-2">
                <IconButton
                    icon="arrorwRight300Linear"
                    onClick={() => back()}
                    iconClassName="size-6 text-on-surface-variant"
                    variant="ghost"
                />
                <span className="text-title-lg font-medium text-on-surface">
                    فاکتور جدید
                </span>
            </div>
            <StepperStatus steps={steps} />
            <div className="w-full">
                {activeStep === 1 && <CustomerStep />}
                {activeStep === 2 && <ItemsStep />}
                {activeStep === 3 && <Summary />}
                <ActionButtons />
            </div>
        </div>
    )
}

const NewFactor = () => {
    return (
        <NewFactorProvider>
            <NewFactorContent />
        </NewFactorProvider>
    )
}

export default NewFactor
