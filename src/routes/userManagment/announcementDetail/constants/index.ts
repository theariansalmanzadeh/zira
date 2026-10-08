import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import type { VariantProps } from 'class-variance-authority'
import type { PillVariants } from '@/src/shared/components/ui/Pill'

export type AnnouncementDetailData = {
    id: string
    code: string
    title: string
    subjectLabel: string
    priorityLabel: string
    deliveryMethod: string
    targetRoles: string
    createdAt: string
    sentAt: string
    sender: string
    relatedEntity: string
    totalRecipients: number
    delivered: number
    seen: number
    closed: number
}

export type AnnouncementRecipientStatus = 'delivered' | 'seen' | 'closed'

export type AnnouncementRecipientRowData = {
    id: string
    name: string
    personnelCode: string
    role: string
    branch: string
    status: AnnouncementRecipientStatus
    viewedOrClosedAt?: string | null
}

type PillVariant = NonNullable<VariantProps<typeof PillVariants>['variant']>

export const RECIPIENT_STATUS_CONFIG: Record<
    AnnouncementRecipientStatus,
    { label: string; variant: PillVariant }
> = {
    seen: { label: 'مشاهده‌شده', variant: 'success' },
    delivered: { label: 'تحویل‌شده', variant: 'info' },
    closed: { label: 'بسته‌شده', variant: 'tonal' },
}

export const RECIPIENT_TABLE_COLUMNS: TableFilterItem[] = [
    { id: 'recipient', header_label: 'گیرنده', isChecked: true },
    { id: 'role', header_label: 'نقش', isChecked: true },
    { id: 'branch', header_label: 'شعبه', isChecked: true },
    { id: 'status', header_label: 'وضعیت', isChecked: true },
    {
        id: 'viewedOrClosedAt',
        header_label: 'زمان مشاهده/بستن',
        isChecked: true,
    },
]

export const RECIPIENT_TOGGLE_BUTTONS = [
    { label: 'همه', value: 'all' },
    { label: 'تحویل‌شده', value: 'delivered' },
    { label: 'مشاهده‌شده', value: 'seen' },
    { label: 'بسته‌شده', value: 'closed' },
] as const

export const RECIPIENT_AVATAR_COLORS = [
    'bg-error-container text-on-error-container',
    'bg-info-container text-on-info-container',
    'bg-warning-container text-on-warning-container',
    'bg-success-container text-on-success-container',
    'bg-primary-container text-on-primary-container',
] as const

export const ANNOUNCEMENT_RECIPIENTS_DUMMY: AnnouncementRecipientRowData[] = [
    {
        id: 'rec-1',
        name: 'علی رضایی',
        personnelCode: 'PR2391',
        role: 'مدیر سیستم',
        branch: 'همه شعب',
        status: 'seen',
        viewedOrClosedAt: '2026-09-30T06:12:00.000Z',
    },
    {
        id: 'rec-2',
        name: 'زهرا کریمی',
        personnelCode: 'PR1820',
        role: 'کارشناس فروش',
        branch: 'شعبه ونک',
        status: 'delivered',
        viewedOrClosedAt: null,
    },
    {
        id: 'rec-3',
        name: 'سارا احمدی',
        personnelCode: 'PR2402',
        role: 'مدیر فروش',
        branch: 'شعبه سعادت‌آباد',
        status: 'closed',
        viewedOrClosedAt: '2026-09-30T08:20:00.000Z',
    },
    {
        id: 'rec-4',
        name: 'حسین موسوی',
        personnelCode: 'PR1755',
        role: 'پشتیبان',
        branch: 'شعبه مرکزی',
        status: 'delivered',
        viewedOrClosedAt: null,
    },
    {
        id: 'rec-5',
        name: 'مریم نوری',
        personnelCode: 'PR2011',
        role: 'کارشناس انبار',
        branch: 'شعبه ونک',
        status: 'seen',
        viewedOrClosedAt: '2026-09-29T14:45:00.000Z',
    },
]

export const ANNOUNCEMENT_DETAILS_DUMMY: Record<string, AnnouncementDetailData> =
    {
        'ann-1': {
            id: 'ann-1',
            code: 'nt_7f3a91c2',
            title: 'به‌روزرسانی سامانه',
            subjectLabel: 'سیستمی',
            priorityLabel: 'زیاد',
            deliveryMethod: 'همه کاربران',
            targetRoles: '—',
            createdAt: '۱۴۰۵/۰۷/۱۱ ۰۹:۲۸',
            sentAt: '۱۴۰۵/۰۷/۱۱ ۰۹:۳۰',
            sender: 'علی رضایی',
            relatedEntity: '—',
            totalRecipients: 16,
            delivered: 5,
            seen: 8,
            closed: 3,
        },
        'ann-2': {
            id: 'ann-2',
            code: 'nt_8a2b41d9',
            title: 'اعلان تخفیف ویژه',
            subjectLabel: 'فروش و بازاریابی',
            priorityLabel: 'متوسط',
            deliveryMethod: 'مدیران فروش',
            targetRoles: 'مدیر فروش',
            createdAt: '۱۴۰۴/۰۹/۲۷ ۱۴:۰۰',
            sentAt: '۱۴۰۴/۰۹/۲۷ ۱۴:۳۰',
            sender: 'سارا احمدی',
            relatedEntity: 'کمپین پایان سال',
            totalRecipients: 24,
            delivered: 20,
            seen: 12,
            closed: 4,
        },
        'ann-3': {
            id: 'ann-3',
            code: 'nt_1c9e55ab',
            title: 'یادآوری تکمیل پروفایل',
            subjectLabel: 'منابع انسانی',
            priorityLabel: 'عادی',
            deliveryMethod: 'کارمندان جدید',
            targetRoles: 'کارمند',
            createdAt: '۱۴۰۴/۰۹/۲۶ ۰۷:۳۰',
            sentAt: '۱۴۰۴/۰۹/۲۶ ۰۷:۴۵',
            sender: 'مریم حسینی',
            relatedEntity: '—',
            totalRecipients: 40,
            delivered: 38,
            seen: 22,
            closed: 10,
        },
    }

export const getAnnouncementDetailById = (
    id: string
): AnnouncementDetailData =>
    ANNOUNCEMENT_DETAILS_DUMMY[id] ?? {
        id,
        code: id,
        title: 'اعلان',
        subjectLabel: 'سیستمی',
        priorityLabel: 'عادی',
        deliveryMethod: '—',
        targetRoles: '—',
        createdAt: '—',
        sentAt: '—',
        sender: '—',
        relatedEntity: '—',
        totalRecipients: 0,
        delivered: 0,
        seen: 0,
        closed: 0,
    }
