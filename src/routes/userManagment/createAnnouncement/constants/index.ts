import type { AnnouncementFormPriority } from '../schema'

export type { AnnouncementFormPriority }

export const ANNOUNCEMENT_SUBJECT_OPTIONS = [
    { label: 'سیستمی', value: 'system' },
    { label: 'فروش و بازاریابی', value: 'sales' },
    { label: 'منابع انسانی', value: 'hr' },
    { label: 'نگهداری سیستم', value: 'maintenance' },
] as const

export const ANNOUNCEMENT_PRIORITY_OPTIONS: {
    label: string
    value: AnnouncementFormPriority
}[] = [
    { label: 'کم', value: 'low' },
    { label: 'عادی', value: 'normal' },
    { label: 'زیاد', value: 'high' },
    { label: 'فوری', value: 'urgent' },
]
