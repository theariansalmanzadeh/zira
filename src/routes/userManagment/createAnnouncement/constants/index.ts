import type { AnnouncementFormPriority } from '../schema'

export type { AnnouncementFormPriority }

export const ANNOUNCEMENT_SUBJECT_OPTIONS = [
    { label: 'سیستمی', value: 'SYSTEM' },
    { label: 'سفارش', value: 'ORDER' },
    { label: 'پرداخت', value: 'PAYMENT' },
    { label: 'چک', value: 'CHEQUE' },
    { label: 'درخواست', value: 'REQUEST' },
    { label: 'تیکت', value: 'TICKET' },
    { label: 'تخفیف', value: 'DISCOUNT' },
    { label: 'مالی', value: 'FINANCIAL' },
    { label: 'پروموشن', value: 'PROMOTION' },
    { label: 'امنیت', value: 'SECURITY' },
    { label: 'بازاریابی', value: 'MARKETING' },
    { label: 'پشتیبانی', value: 'SUPPORT' },
] as const

export const ANNOUNCEMENT_PRIORITY_OPTIONS: {
    label: string
    value: AnnouncementFormPriority
}[] = [
    { label: 'کم', value: 'LOW' },
    { label: 'عادی', value: 'NORMAL' },
    { label: 'زیاد', value: 'HIGH' },
    { label: 'فوری', value: 'URGENT' },
]
