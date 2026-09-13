import { IconLabel } from "@/src/shared/types/icon"

export type StepperStepStatus = 'complete' | 'pending' | 'failed' | 'not_reached'

export type StepperStatusStep = {
    id: string
    label: string
    status: StepperStepStatus
}

export type StepVisualConfig = {
    icon?: IconLabel
    iconBoxClassName: string
    iconClassName?: string
    labelClassName: string
    connectorClassName: string
}
