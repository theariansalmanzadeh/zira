import { Icon } from '@/src/shared/components/Icons/Icon'
import { cn } from '@shared/libs/utils'
import { IconLabel } from '@/src/shared/types/icon'
import {
    type OrderStatusStep,
    type StepStatus,
} from '../../types'

type StepVisualConfig = {
    icon?: IconLabel
    iconBoxClassName: string
    iconClassName?: string
    labelClassName: string
    connectorClassName: string
}

const STEP_STATUS_CONFIG: Record<StepStatus, StepVisualConfig> = {
    complete: {
        icon: 'checkLg300Linear',
        iconBoxClassName: 'bg-primary-container',
        iconClassName: 'text-on-primary-container',
        labelClassName: 'text-on-primary-container',
        connectorClassName: 'bg-on-primary-container',
    },
    pending: {
        icon: 'pending300Linear',
        iconBoxClassName: 'border border-outline bg-surface-container-lowest',
        iconClassName: 'text-outline',
        labelClassName: 'text-on-surface-variant',
        connectorClassName: 'bg-outline-variant',
    },
    failed: {
        icon: 'closeCircle300Linear',
        iconBoxClassName: 'bg-error-container text-on-error-container',
        iconClassName: 'text-on-error-container',
        labelClassName: 'text-on-error-container',
        connectorClassName: 'bg-error',
    },
    not_reached: {
        iconBoxClassName: 'bg-surface-container-high',
        labelClassName: 'text-outline',
        connectorClassName: 'bg-outline-variant',
    },
}

type StatusProps = {
    steps: OrderStatusStep[]
    className?: string
}

const Status = ({ steps, className }: StatusProps) => {
    return (
        <div
            className={cn(
                'rounded-card-lg bg-surface-container-lowest p-6',
                className
            )}
            dir='rtl'
        >
            <div className='flex flex-row items-start'>
                {steps.map((step, index) => {
                    const config = STEP_STATUS_CONFIG[step.status]
                    const connectorConfig =
                        index < steps.length - 1
                            ? STEP_STATUS_CONFIG[
                            step.status === 'complete'
                                ? 'complete'
                                : step.status === 'failed'
                                    ? 'failed'
                                    : 'not_reached'
                            ]
                            : null

                    return (
                        <div
                            key={step.id}
                            className='flex flex-1 flex-row items-start min-w-0'
                        >
                            <div className='flex flex-col items-center gap-2 flex-1 min-w-0'>
                                <div
                                    className={cn(
                                        'flex size-10 shrink-0 items-center justify-center rounded-card-sm',
                                        config.iconBoxClassName
                                    )}
                                >
                                    {config.icon && (
                                        <Icon
                                            label={config.icon}
                                            className={cn('size-5!', config.iconClassName)}
                                        />
                                    )}
                                </div>
                                <span
                                    className={cn(
                                        'text-label-sm text-center leading-snug px-1',
                                        config.labelClassName
                                    )}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {index < steps.length - 1 && connectorConfig && (
                                <div
                                    className={cn(
                                        'mt-5 h-px flex-1 min-w-4',
                                        connectorConfig.connectorClassName
                                    )}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Status
