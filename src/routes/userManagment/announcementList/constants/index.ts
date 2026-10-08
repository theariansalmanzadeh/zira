import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import type { VariantProps } from 'class-variance-authority'
import type { PillVariants } from '@/src/shared/components/ui/Pill'

export type AnnouncementPriority = 'high' | 'medium' | 'low'

export type AnnouncementRowData = {
    id: string
    title: string
    body: string
    subject: string
    recipients: string
    priority: AnnouncementPriority
    sentAt: string
}

type PillVariant = NonNullable<VariantProps<typeof PillVariants>['variant']>

export const PRIORITY_CONFIG: Record<
    AnnouncementPriority,
    { label: string; variant: PillVariant }
> = {
    high: { label: 'فوری', variant: 'error' },
    medium: { label: 'متوسط', variant: 'warning' },
    low: { label: 'عادی', variant: 'success' },
}

export const ANNOUNCEMENT_TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'title', header_label: 'عنوان و متن', isChecked: true },
    { id: 'subject', header_label: 'موضوع', isChecked: true },
    { id: 'recipients', header_label: 'گیرندگان', isChecked: true },
    { id: 'priority', header_label: 'اولویت', isChecked: true },
    { id: 'sentAt', header_label: 'زمان ارسال', isChecked: true },
]

export const ANNOUNCEMENTS_DUMMY: AnnouncementRowData[] = [
    {
        id: 'ann-1',
        title: 'به‌روزرسانی سامانه',
        body: 'سامانه فردا از ساعت ۰۲:۰۰ تا ۰۴:۰۰ در دسترس نخواهد بود.',
        subject: 'نگهداری سیستم',
        recipients: 'همه کاربران',
        priority: 'high',
        sentAt: '2025-12-19T09:12:00.000Z',
    },
    {
        id: 'ann-2',
        title: 'اعلان تخفیف ویژه',
        body: 'کمپین فروش پایان سال از فردا فعال می‌شود.',
        subject: 'فروش و بازاریابی',
        recipients: 'مدیران فروش',
        priority: 'medium',
        sentAt: '2025-12-18T14:30:00.000Z',
    },
    {
        id: 'ann-3',
        title: 'یادآوری تکمیل پروفایل',
        body: 'لطفاً اطلاعات پرسنلی خود را تا پایان هفته تکمیل کنید.',
        subject: 'منابع انسانی',
        recipients: 'کارمندان جدید',
        priority: 'low',
        sentAt: '2025-12-17T07:45:00.000Z',
    },
]
