export type StepStatus = 'complete' | 'pending' | 'failed' | 'not_reached'

export type OrderStatusStep = {
    id: string
    label: string
    status: StepStatus
}