'use client'

import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react'

export const ORDER_PROCESS_STEPS = ['items', 'address', 'payment'] as const

export type OrderProcessStep = (typeof ORDER_PROCESS_STEPS)[number]

export type OrderStepHeading = {
    mainHeader: string
    subHeader: string
}

export const ORDER_STEP_HEADERS: Record<OrderProcessStep, OrderStepHeading> = {
    items: {
        mainHeader: 'اقلام سفارش',
        subHeader: 'خلاصه سفارش',
    },
    address: {
        mainHeader: 'آدرس',
        subHeader: 'شیوه و زمان تحویل سفارش',
    },
    payment: {
        mainHeader: 'روش پرداخت',
        subHeader: 'خلاصه سفارش',
    },
}

type OrderContextValue = {
    steps: readonly OrderProcessStep[]
    activeStep: OrderProcessStep
    setActiveStep: (step: OrderProcessStep) => void
    activeStepHeaders: OrderStepHeading
    stepHeaders: typeof ORDER_STEP_HEADERS
}

const OrderContext = createContext<OrderContextValue | null>(null)

export function useOrderProcess() {
    const context = useContext(OrderContext)

    if (!context) {
        throw new Error('useOrderProcess must be used within OrderProvider')
    }

    return context
}

type OrderProviderProps = {
    children: ReactNode
    defaultStep?: OrderProcessStep
}

const OrderProvider = ({
    children,
    defaultStep = 'items',
}: OrderProviderProps) => {
    const [activeStep, setActiveStep] =
        useState<OrderProcessStep>(defaultStep)

    const value = useMemo(
        () => ({
            steps: ORDER_PROCESS_STEPS,
            activeStep,
            setActiveStep,
            activeStepHeaders: ORDER_STEP_HEADERS[activeStep],
            stepHeaders: ORDER_STEP_HEADERS,
        }),
        [activeStep]
    )

    return (
        <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
    )
}

export default OrderProvider
