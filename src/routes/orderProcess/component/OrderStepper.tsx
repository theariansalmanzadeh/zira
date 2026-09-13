'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { cn } from '@/src/shared/libs/utils'
import type { IconLabel } from '@/src/shared/types/icon'
import {
    type OrderProcessStep,
    useOrderProcess,
} from '../provider/OrderProvider'

export type OrderStep = {
    id: OrderProcessStep
    label: string
    icon: IconLabel
}

const ORDER_STEPS: OrderStep[] = [
    {
        id: 'items',
        label: 'سبد خرید',
        icon: 'order400Linear',
    },
    {
        id: 'address',
        label: 'اطلاعات ارسال',
        icon: 'listAltCheck',
    },
    {
        id: 'payment',
        label: 'پرداخت',
        icon: 'creditCard400Linear',
    },
]

type OrderStepperProps = {
    className?: string
}

const OrderStepper = ({ className }: OrderStepperProps) => {
    const { activeStep, setActiveStep } = useOrderProcess()
    const activeIndex = ORDER_STEPS.findIndex((step) => step.id === activeStep)

    return (
        <div
            className={cn('flex w-full max-w-[600px] flex-row items-start', className)}
            dir="rtl"
        >
            {ORDER_STEPS.map((step, index) => {
                const isActive = step.id === activeStep
                const colorClass = isActive
                    ? 'text-on-surface'
                    : 'text-outline'

                return (
                    <div
                        key={step.id}
                        className="flex min-w-0 flex-1 flex-row items-start"
                    >
                        <button
                            type="button"
                            onClick={() => setActiveStep(step.id)}
                            className="flex min-w-0 flex-1 flex-col items-center gap-2"
                        >
                            <Icon
                                label={step.icon}
                                className={cn('size-6!', colorClass)}
                            />
                            <span
                                className={cn(
                                    'text-center text-label-md whitespace-nowrap',
                                    colorClass
                                )}
                            >
                                {step.label}
                            </span>
                        </button>

                        {index < ORDER_STEPS.length - 1 && (
                            <div
                                className={cn(
                                    'mt-3 h-0 flex-1 border-t border-dashed',
                                    index < activeIndex
                                        ? 'border-on-surface'
                                        : 'border-outline'
                                )}
                                aria-hidden
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default OrderStepper
export { ORDER_STEPS }
