import type { TransferCardStatus } from '@/src/shared/components/ui/TransferCard'
import {
    TRANSFER_CARD_STATUS_CONFIG,
    buildTransferCardStepperSteps,
} from '@/src/shared/components/ui/TransferCard'

export const STATUS_CONFIG = TRANSFER_CARD_STATUS_CONFIG
export const buildBranchTransferStepperSteps = buildTransferCardStepperSteps
export type BranchTransferStatus = TransferCardStatus

export type TransferDetailProduct = {
    id: string
    productCode: string
    productName: string
    quantity: number
    unit: string
    avatarTone: 'warning' | 'success' | 'info'
}

export type TransferDetailData = {
    id: string
    slug: string
    status: BranchTransferStatus
    registeredAt: string
    fromBranch: string
    fromWarehouse: string
    toBranch: string
    toWarehouse: string
    products: TransferDetailProduct[]
}

export const TABLE_COLUMNS = [
    { id: 'productCode', label: 'کد کالا' },
    { id: 'productName', label: 'نام کالا' },
    { id: 'quantity', label: 'تعداد' },
    { id: 'receiveStatus', label: 'وضعیت دریافت' },
] as const

export const TABLE_GRID_CLASS =
    'grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1.2fr)] items-center gap-3'

export const AVATAR_TONE_CLASS: Record<
    TransferDetailProduct['avatarTone'],
    string
> = {
    warning: 'bg-warning-container text-on-warning-container',
    success: 'bg-success-container text-on-success-container',
    info: 'bg-info-container text-on-info-container',
}

export const TRANSFER_DETAIL_DUMMY: TransferDetailData = {
    id: 'TR-1042',
    slug: 'TR-1042',
    status: 'accepting',
    registeredAt: '۱۴۰۴/۰۹/۰۱',
    fromBranch: 'شعبه مرکزی تهران',
    fromWarehouse: 'WH-2001',
    toBranch: 'شعبه شیراز',
    toWarehouse: 'WH-2010',
    products: [
        {
            id: '1',
            productCode: 'ZM-1405',
            productName: 'نیم‌تنه ورزشی اکتیو',
            quantity: 14,
            unit: 'عدد',
            avatarTone: 'warning',
        },
        {
            id: '2',
            productCode: 'ZM-1042',
            productName: 'سوتین بدون فنر لوسی',
            quantity: 12,
            unit: 'عدد',
            avatarTone: 'success',
        },
        {
            id: '3',
            productCode: 'ZM-1088',
            productName: 'شورت نخی پنبه‌ای دیلی',
            quantity: 16,
            unit: 'عدد',
            avatarTone: 'info',
        },
    ],
}
