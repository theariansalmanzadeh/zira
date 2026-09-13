import { Icon } from '@/src/shared/components/Icons/Icon'
import { cn } from '@shared/libs/utils'
import { StepperStatusStep } from './types'
import { STEP_STATUS_CONFIG } from './constants'

type StepperStatusProps = {
    steps: StepperStatusStep[]
    className?: string
    indexBased?: boolean
}

const StepperStatus = ({ steps, className, indexBased = false }: StepperStatusProps) => {
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
                            className='flex min-w-0 flex-1 flex-row items-start'
                        >
                            <div className='flex min-w-0 flex-1 flex-col items-center gap-2'>
                                <div
                                    className={cn(
                                        'flex size-10 shrink-0 items-center justify-center rounded-card-sm',
                                        config.iconBoxClassName
                                    )}
                                >
                                    {!indexBased && config.icon && (
                                        <Icon
                                            label={config.icon}
                                            className={cn('size-5!', config.iconClassName)}
                                        />
                                    )}
                                    {indexBased && (
                                        <span className={cn('text-label-lg leading-snug', config.iconClassName)}>
                                            {index + 1}
                                        </span>
                                    )}
                                </div>
                                <span
                                    className={cn(
                                        'px-1 text-center text-label-sm leading-snug',
                                        config.labelClassName
                                    )}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {index < steps.length - 1 && connectorConfig && (
                                <div
                                    className={cn(
                                        'mt-5 h-px min-w-4 flex-1',
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

export default StepperStatus
