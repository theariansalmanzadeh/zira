import type { VariantProps } from 'class-variance-authority'
import type { PillVariants } from '@/src/shared/components/ui/Pill'
import type { StepperStatusStep } from '@/src/shared/components/StepperStatus/types'

export type TransferCardStatus =
    | 'registered'
    | 'accepting'
    | 'transferring'
    | 'received'
    | 'completed'
    | 'cancelled'

export type TransferCardLineItemTone = 'primary' | 'info' | 'success' | 'warning'

export type TransferCardLineItem = {
    id: string
    productCode: string
    productName: string
    unit: string
    quantity: number
    tone?: TransferCardLineItemTone
}

export type TransferCardItem = {
    id: string
    slug: string
    fromBranch: string
    fromWarehouse: string
    toBranch: string
    toWarehouse: string
    itemCount: number
    unitCount: number
    status: TransferCardStatus
    date: string
    items?: TransferCardLineItem[]
}

export const TRANSFER_CARD_LINE_ITEM_TONE_CLASS: Record<
    TransferCardLineItemTone,
    string
> = {
    primary: 'bg-primary',
    info: 'bg-info',
    success: 'bg-success',
    warning: 'bg-warning',
}

export const TRANSFER_CARD_ITEMS_COLUMNS = [
    { id: 'productCode', label: 'کد کالا' },
    { id: 'productName', label: 'نام کالا' },
    { id: 'unit', label: 'واحد اصلی' },
    { id: 'quantity', label: 'مقدار' },
] as const

export const TRANSFER_CARD_ITEMS_GRID_CLASS =
    'grid grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,0.8fr)] items-center gap-3'

export type TransferCardStatusConfig = {
    text: string
    variant: NonNullable<VariantProps<typeof PillVariants>['variant']>
}

export const TRANSFER_CARD_STEPS = [
    { id: 'registered', label: 'ثبت شده' },
    { id: 'accepting', label: 'تأیید' },
    { id: 'transferring', label: 'در انتقال' },
    { id: 'completed', label: 'دریافت/تکمیل' },
] as const

export const TRANSFER_CARD_STATUS_CONFIG: Record<
    TransferCardStatus,
    TransferCardStatusConfig
> = {
    registered: { text: 'ثبت شده', variant: 'info' },
    accepting: { text: 'در انتظار تأیید', variant: 'warning' },
    transferring: { text: 'در حال جابجایی', variant: 'warning' },
    received: { text: 'دریافت شده', variant: 'info' },
    completed: { text: 'قطعی شده', variant: 'success' },
    cancelled: { text: 'لغو شده', variant: 'error' },
}

export const buildTransferCardStepperSteps = (
    status: TransferCardStatus
): StepperStatusStep[] => {
    if (status === 'cancelled') {
        return TRANSFER_CARD_STEPS.map((step, index) => ({
            id: step.id,
            label: step.label,
            status: index === 0 ? 'failed' : 'not_reached',
        }))
    }

    const statusToStepId: Record<TransferCardStatus, string> = {
        registered: 'registered',
        accepting: 'accepting',
        transferring: 'transferring',
        received: 'completed',
        completed: 'completed',
        cancelled: 'registered',
    }

    const currentIndex = TRANSFER_CARD_STEPS.findIndex(
        (step) => step.id === statusToStepId[status]
    )

    return TRANSFER_CARD_STEPS.map((step, index) => ({
        id: step.id,
        label: step.label,
        status: index <= currentIndex ? 'complete' : 'not_reached',
    }))
}
