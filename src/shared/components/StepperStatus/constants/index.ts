import { StepperStepStatus, StepVisualConfig } from "../types";

export const STEP_STATUS_CONFIG: Record<StepperStepStatus, StepVisualConfig> = {
    complete: {
        icon: 'checkLg300Linear',
        iconBoxClassName: 'bg-primary-container',
        iconClassName: 'text-on-primary-container',
        labelClassName: 'text-on-primary-container',
        connectorClassName: 'bg-on-primary-container',
    },
    pending: {
        icon: 'pending300Linear',
        iconBoxClassName: 'border border-primary/50 bg-surface-container-lowest',
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
