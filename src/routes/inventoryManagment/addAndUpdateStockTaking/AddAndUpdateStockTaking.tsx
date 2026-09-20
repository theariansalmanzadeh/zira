'use client'

import { useState } from 'react'
import StepperStatus from '@/src/shared/components/StepperStatus/StepperStatus'
import { useSearchParam } from '@/src/shared/hooks/useSearchParam'
import CountRegistrationTable from './components/CountRegistrationTable'
import InitialStockTakingForm from './components/InitialStockTakingForm'
import Summary from './components/Summary'
import {
    CREATE_STOCK_TAKING_STEPS,
    STOCK_TAKING_MANAGER_OPTIONS,
    STOCK_TAKING_STEPS,
    buildStockTakingStepperSteps,
    type ProductScope,
    type StockTakingStep,
} from './constants'

const AddAndUpdateStockTaking = () => {
    const { removeSearchParam } = useSearchParam()
    const [activeStep, setActiveStep] = useState<StockTakingStep>(
        STOCK_TAKING_STEPS.initial
    )
    const [date, setDate] = useState<Date | undefined>(new Date('2026-03-05'))
    const [manager, setManager] = useState(
        STOCK_TAKING_MANAGER_OPTIONS[0]?.value
    )
    const [scope, setScope] = useState<ProductScope>('product-group')

    const activeStepIndex = CREATE_STOCK_TAKING_STEPS.findIndex(
        (step) => step.id === activeStep
    )
    const steps = buildStockTakingStepperSteps(activeStepIndex)

    const goToStep = (step: StockTakingStep) => {
        removeSearchParam('cat', '')
        setActiveStep(step)
    }

    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <StepperStatus steps={steps} indexBased />
            {activeStep === STOCK_TAKING_STEPS.initial && (
                <InitialStockTakingForm
                    date={date}
                    onDateChange={setDate}
                    manager={manager}
                    onManagerChange={setManager}
                    scope={scope}
                    onScopeChange={setScope}
                    onStart={() => goToStep(STOCK_TAKING_STEPS.count1)}
                />
            )}

            {activeStep === STOCK_TAKING_STEPS.count1 && (
                <CountRegistrationTable
                    onBack={() => goToStep(STOCK_TAKING_STEPS.initial)}
                    onContinue={() => goToStep(STOCK_TAKING_STEPS.discrepancy)}
                />
            )}

            {activeStep === STOCK_TAKING_STEPS.discrepancy && (
                <Summary
                    onBack={() => goToStep(STOCK_TAKING_STEPS.count1)}
                    onContinue={() => goToStep(STOCK_TAKING_STEPS.count2)}
                />
            )}

            {activeStep !== STOCK_TAKING_STEPS.initial &&
                activeStep !== STOCK_TAKING_STEPS.count1 &&
                activeStep !== STOCK_TAKING_STEPS.discrepancy && (
                    <div className='rounded-card-lg bg-surface-container-lowest p-6 text-label-lg text-outline'>
                        مرحله بعد به‌زودی
                    </div>
                )}
        </div>
    )
}

export default AddAndUpdateStockTaking
