"use client"

import React from 'react'
import { cn } from '@shared/libs/utils'

function Stepper({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot='stepper'
            className={cn(
                'rounded-card-md bg-surface-container-high p-3',
                className
            )}
            dir='ltr'
            {...props}
        >
            {children}
        </div>
    )
}

function StepperHeader({
    className,
    children = 'مراحل',
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot='stepper-header'
            className={cn('mb-3 text-right text-label-md text-outline', className)}
            {...props}
        >
            {children}
        </div>
    )
}

function StepperList({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot='stepper-list'
            className={cn('flex flex-col gap-3', className)}
            {...props}
        >
            {children}
        </div>
    )
}

type StepperStepProps = {
    step: number
    label: string
    className?: string
    activeStep: number
}

function StepperStep({ step, label, className, activeStep }: StepperStepProps) {
    const isActive = activeStep >= step

    return (
        <div
            data-slot='stepper-step'
            className={cn('flex flex-row-reverse items-center justify-start gap-3', className)}
        >
            <span
                className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-full text-label-md font-medium',
                    isActive
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-high text-outline'
                )}
            >
                {step}
            </span>
            <span
                className={cn(
                    'text-label-lg',
                    isActive
                        ? 'font-medium text-on-surface'
                        : 'text-outline'
                )}
            >
                {label}
            </span>
        </div>
    )
}

Stepper.Header = StepperHeader
Stepper.List = StepperList
Stepper.Step = StepperStep

export default Stepper
export { Stepper, StepperHeader, StepperList, StepperStep }
