import type { IconLabel } from '@/src/shared/types/icon'
import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import type { SubSidebarSection } from '@/src/shared/components/sidebar/content/types'

export const EVENTS_SUB_SIDEBAR_SECTIONS: readonly SubSidebarSection[] = [
    {
        title: 'ثبت رخداد',
        links: [
            { label: 'لیست رخدادها', href: '/admin/events?sub=list' },
            { label: 'نشست‌ها', href: '/admin/events?sub=sessions' },
        ],
    },
    {
        title: 'سامانه',
        links: [
            {
                label: 'نگه‌داری و آرشیو',
                href: '/admin/events?sub=maintenance',
            },
            { label: 'خروجی‌ها', href: '/admin/events?sub=exports' },
        ],
    },
]

export const EVENTS_SUB_PARAMS = [
    'list',
    'sensitive',
    'sessions',
    'maintenance',
    'exports',
] as const

export type EventsSubParam = (typeof EVENTS_SUB_PARAMS)[number]

export type HeadingButton = {
    label: string
    icon?: IconLabel
    href?: string
    action?: () => void
    variant: 'primary' | 'default' | 'outline'
}

export type SectionHeading = {
    title: string
    subtitle?: string
    buttons?: HeadingButton[]
    hasBackButton?: boolean
}

export const sectionToHeading: Record<string, SectionHeading | null> = {
    list: {
        title: 'لیست رخدادها',
        subtitle: 'مشاهده و پایش رخدادهای سامانه',
    },
    sensitive: {
        title: 'رخدادهای حساس',
        subtitle: 'رخدادهای حساس و نیازمند بررسی',
    },
    sessions: {
        title: 'نشست‌ها',
        subtitle: 'نشست‌های فعال و تاریخچه ورود',
    },
    maintenance: {
        title: 'نگه‌داری و آرشیو',
        subtitle: 'نگه‌داری، پاک‌سازی و آرشیو رخدادها',
    },
    exports: {
        title: 'خروجی‌ها',
        subtitle: 'خروجی و گزارش‌گیری از رخدادها',
    },
    details: {
        title: 'جزئیات رخداد',
        subtitle: 'مشاهده اطلاعات و تغییرات رخداد',
        hasBackButton: true,
    },
    'session-details': {
        title: 'جزئیات نشست',
        subtitle: 'مشاهده اطلاعات نشست کاربر',
        hasBackButton: true,
    },
}

export const getEventsSectionKey = (sub: string): EventsSubParam =>
    EVENTS_SUB_PARAMS.includes(sub as EventsSubParam)
        ? (sub as EventsSubParam)
        : 'list'

export const getEventsSectionKeyFromPath = (
    pathname: string,
    searchParams: Pick<URLSearchParams, 'get'>
): string => {
    if (pathname.startsWith('/admin/events/session/')) {
        return 'session-details'
    }
    if (pathname.startsWith('/admin/events/') && pathname !== '/admin/events/') {
        return 'details'
    }

    return getEventsSectionKey(searchParams.get('sub') || '')
}

export type EventSummaryCardItem = {
    id: string
    label: string
    value: number | string
    icon: IconLabel
    iconClassName: string
}

export const EVENT_SUMMARY_CARDS: EventSummaryCardItem[] = [
    {
        id: 'total',
        label: 'کل رخدادها',
        value: 18,
        icon: 'history400Linear',
        iconClassName: 'rounded-card-sm bg-info-container p-1 text-info',
    },
    {
        id: 'sensitive',
        label: 'رخداد حساس',
        value: 6,
        icon: 'warning400Linear',
        iconClassName: 'rounded-card-sm bg-error-container p-1 text-error',
    },
    {
        id: 'failed-login',
        label: 'ورود ناموفق',
        value: 2,
        icon: 'vpnLocked400Linear',
        iconClassName:
            'rounded-card-sm bg-warning-container p-1 text-on-warning-container',
    },
    {
        id: 'active-sessions',
        label: 'نشست فعال',
        value: 3,
        icon: 'dashboard400Linear',
        iconClassName:
            'rounded-card-sm bg-success-container p-1 text-on-success-container',
    },
]

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'col-0', header_label: 'ردیف', isChecked: true },
    { id: 'col-1', header_label: 'نقش کاربر', isChecked: true },
    { id: 'col-2', header_label: 'نام کاربر', isChecked: true },
    { id: 'col-3', header_label: 'تاریخ', isChecked: true },
    { id: 'col-4', header_label: 'زمان', isChecked: true },
    { id: 'col-5', header_label: 'جزئیات فعالیت', isChecked: true },
]

export type EventFilterTab = 'all' | 'sensitive' | 'failed'

export type EventRowData = {
    id: string
    rowNumber: number
    role: string
    userName: string
    avatarClassName: string
    occurredAt: string
    activityType: string
    activityDetails: string
    isSensitive?: boolean
    filterTab?: Exclude<EventFilterTab, 'all'>
}

export const EVENTS_DUMMY: EventRowData[] = [
    {
        id: 'evt-1',
        rowNumber: 1,
        role: 'مدیر سیستم',
        userName: 'علی رضایی',
        avatarClassName: 'bg-error-container text-error',
        occurredAt: '2025-12-19T07:12:00.000Z',
        activityType: 'تغییر نقش یا دسترسی',
        activityDetails: 'کاربر «لیلا جعفری»',
        isSensitive: true,
        filterTab: 'sensitive',
    },
    {
        id: 'evt-2',
        rowNumber: 2,
        role: 'کارشناس فروش',
        userName: 'زهرا کریمی',
        avatarClassName: 'bg-info-container text-info',
        occurredAt: '2025-12-19T06:20:00.000Z',
        activityType: 'ثبت سفارش',
        activityDetails: 'سفارش #۸۹۲ — تکمیل اطلاعات پرداخت',
    },
    {
        id: 'evt-3',
        rowNumber: 3,
        role: 'کارشناس فروش',
        userName: 'زهرا کریمی',
        avatarClassName: 'bg-info-container text-info',
        occurredAt: '2025-12-19T06:14:00.000Z',
        activityType: 'تغییر وضعیت سفارش',
        activityDetails: 'سفارش #۸۸۱',
    },
    {
        id: 'evt-4',
        rowNumber: 4,
        role: 'مدیر سیستم',
        userName: 'علی رضایی',
        avatarClassName: 'bg-error-container text-error',
        occurredAt: '2025-12-18T22:41:00.000Z',
        activityType: 'ورود ناموفق',
        activityDetails: 'تلاش ورود ناموفق از IP ناشناس',
        filterTab: 'failed',
    },
]

export type EventInfoField = {
    label: string
    value: string
}

export type EventChangeRow = {
    field: string
    previousValue: string
    newValue: string
}

export type EventDetailData = {
    id: string
    info: EventInfoField[]
    changes: EventChangeRow[]
    user: EventUserData
    session: EventSessionData
}

export type EventUserData = {
    name: string
    role: string
    userCode: string
    avatarClassName?: string
}

export type EventSessionData = {
    sessionId: string
    subtitle: string
    status: string
    href?: string
}

const DEFAULT_USER: EventUserData = {
    name: 'علی رضایی',
    role: 'مدیر سیستم',
    userCode: 'USR-1024',
    avatarClassName: 'bg-error-container text-error',
}

const DEFAULT_SESSION: EventSessionData = {
    sessionId: 'S-۸۸۲۱',
    subtitle: 'دسکتاپ - Chrome ۱۲۰',
    status: 'فعال',
    href: '/admin/events/session/s-8821',
}

export const EVENT_DETAILS_DUMMY: Record<string, EventDetailData> = {
    'evt-1': {
        id: 'evt-1',
        info: [
            { label: 'ماژول', value: 'کاربران' },
            { label: 'نوع فعالیت', value: 'تغییر نقش یا دسترسی' },
            { label: 'تاریخ', value: '۱۴۰۴/۰۹/۲۸' },
            { label: 'زمان', value: '۱۰:۴۲' },
            { label: 'نتیجه', value: 'موفق' },
            { label: 'موجودیت مرتبط', value: 'کاربر «لیلا جعفری»' },
        ],
        changes: [
            {
                field: 'نقش',
                previousValue: 'کارشناس فروش',
                newValue: 'ناظر فروش',
            },
            {
                field: 'سطح دسترسی',
                previousValue: 'سطح ۳',
                newValue: 'سطح ۲',
            },
        ],
        user: DEFAULT_USER,
        session: DEFAULT_SESSION,
    },
    'evt-2': {
        id: 'evt-2',
        info: [
            { label: 'ماژول', value: 'سفارشات' },
            { label: 'نوع فعالیت', value: 'ثبت سفارش' },
            { label: 'تاریخ', value: '۱۴۰۴/۰۹/۲۸' },
            { label: 'زمان', value: '۰۹:۵۰' },
            { label: 'نتیجه', value: 'موفق' },
            { label: 'موجودیت مرتبط', value: 'سفارش #۸۹۲' },
        ],
        changes: [],
        user: {
            name: 'زهرا کریمی',
            role: 'کارشناس فروش',
            userCode: 'USR-2048',
            avatarClassName: 'bg-info-container text-info',
        },
        session: {
            sessionId: 'S-۷۴۱۰',
            subtitle: 'دسکتاپ - Firefox ۱۲۲',
            status: 'فعال',
            href: '/admin/events/session/s-7410',
        },
    },
    'evt-3': {
        id: 'evt-3',
        info: [
            { label: 'ماژول', value: 'سفارشات' },
            { label: 'نوع فعالیت', value: 'تغییر وضعیت سفارش' },
            { label: 'تاریخ', value: '۱۴۰۴/۰۹/۲۸' },
            { label: 'زمان', value: '۰۹:۴۴' },
            { label: 'نتیجه', value: 'موفق' },
            { label: 'موجودیت مرتبط', value: 'سفارش #۸۸۱' },
        ],
        changes: [
            {
                field: 'وضعیت',
                previousValue: 'در انتظار',
                newValue: 'تایید شده',
            },
        ],
        user: {
            name: 'زهرا کریمی',
            role: 'کارشناس فروش',
            userCode: 'USR-2048',
            avatarClassName: 'bg-info-container text-info',
        },
        session: {
            sessionId: 'S-۷۴۱۰',
            subtitle: 'دسکتاپ - Firefox ۱۲۲',
            status: 'فعال',
            href: '/admin/events/session/s-7410',
        },
    },
    'evt-4': {
        id: 'evt-4',
        info: [
            { label: 'ماژول', value: 'احراز هویت' },
            { label: 'نوع فعالیت', value: 'ورود ناموفق' },
            { label: 'تاریخ', value: '۱۴۰۴/۰۹/۲۷' },
            { label: 'زمان', value: '۰۲:۱۱' },
            { label: 'نتیجه', value: 'ناموفق' },
            { label: 'موجودیت مرتبط', value: 'IP ناشناس' },
        ],
        changes: [],
        user: DEFAULT_USER,
        session: {
            sessionId: 'S-۰۰۹۸',
            subtitle: 'نامشخص - نامشخص',
            status: 'غیرفعال',
            href: '/admin/events/session/s-0098',
        },
    },
}

export type SessionRowData = {
    id: string
    sessionId: string
    userName: string
    role: string
    avatarClassName: string
    deviceBrowser: string
    ip: string
    status: string
    expiresAt?: string
}

export const SESSION_TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'col-0', header_label: 'کاربر', isChecked: true },
    { id: 'col-1', header_label: 'شناسه نشست', isChecked: true },
    { id: 'col-2', header_label: 'دستگاه / مرورگر', isChecked: true },
    { id: 'col-3', header_label: 'IP / مکان', isChecked: true },
    { id: 'col-4', header_label: 'وضعیت', isChecked: true },
    { id: 'col-5', header_label: 'انقضا', isChecked: true },
    { id: 'col-6', header_label: '', isChecked: true },
]

export const SESSIONS_DUMMY: SessionRowData[] = [
    {
        id: 's-8821',
        sessionId: 'S-۸۸۲۱',
        userName: 'علی رضایی',
        role: 'مدیر سیستم',
        avatarClassName: 'bg-error-container text-error',
        deviceBrowser: 'دسکتاپ ، Chrome ۱۲۰',
        ip: '۱۹۲.۱۶۸.۱.۱۰',
        status: 'منقضی',
    },
    {
        id: 's-7410',
        sessionId: 'S-۷۴۱۰',
        userName: 'زهرا کریمی',
        role: 'کارشناس فروش',
        avatarClassName: 'bg-info-container text-info',
        deviceBrowser: 'دسکتاپ ، Firefox ۱۲۲',
        ip: '۷۹.۱۲۷.۲۰۱.۴۴',
        status: 'فعال',
    },
    {
        id: 's-0098',
        sessionId: 'S-۰۰۹۸',
        userName: 'علی رضایی',
        role: 'مدیر سیستم',
        avatarClassName: 'bg-error-container text-error',
        deviceBrowser: 'نامشخص ، نامشخص',
        ip: '۱۹۱.۱۰۱.۸۸.۲۳',
        status: 'غیرفعال',
    },
]

export type SessionDetailData = {
    id: string
    sessionId: string
    status: string
    deviceBrowser: string
    ip: string
    startedAt: string
    lastActivityAt: string
    user: EventUserData
    info: EventInfoField[]
    activities: SessionActivityItem[]
}

export type SessionActivityItem = {
    id: string
    time: string
    activityType: string
    details: string
    result: string
    isSensitive?: boolean
    eventId?: string
}

export const SESSION_DETAILS_DUMMY: Record<string, SessionDetailData> = {
    's-8821': {
        id: 's-8821',
        sessionId: 'S-۸۸۲۱',
        status: 'منقضی',
        deviceBrowser: 'دسکتاپ ، Chrome ۱۲۰',
        ip: '۱۹۲.۱۶۸.۱.۱۰',
        startedAt: '۱۴۰۴/۰۹/۲۸ — ۰۹:۱۵',
        lastActivityAt: '۱۴۰۴/۰۹/۲۸ - ۱۰:۴۲',
        user: DEFAULT_USER,
        info: [
            { label: 'شناسه نشست', value: 'S-۸۸۲۱' },
            { label: 'وضعیت', value: 'منقضی' },
            { label: 'دستگاه / مرورگر', value: 'دسکتاپ ، Chrome ۱۲۰' },
            { label: 'IP / مکان', value: '۱۹۲.۱۶۸.۱.۱۰' },
            { label: 'شروع نشست', value: '۱۴۰۴/۰۹/۲۸ — ۰۹:۱۵' },
            { label: 'آخرین فعالیت', value: '۱۴۰۴/۰۹/۲۸ - ۱۰:۴۲' },
        ],
        activities: [
            {
                id: 'act-1',
                time: '۱۰:۴۲',
                activityType: 'تغییر نقش یا دسترسی',
                details: 'کاربر «لیلا جعفری»',
                result: 'موفق',
                isSensitive: true,
                eventId: 'evt-1',
            },
            {
                id: 'act-2',
                time: '۰۹:۵۰',
                activityType: 'ورود به سامانه',
                details: 'ورود موفق',
                result: 'موفق',
            },
        ],
    },
    's-7410': {
        id: 's-7410',
        sessionId: 'S-۷۴۱۰',
        status: 'فعال',
        deviceBrowser: 'دسکتاپ ، Firefox ۱۲۲',
        ip: '۷۹.۱۲۷.۲۰۱.۴۴',
        startedAt: '۱۴۰۴/۰۹/۲۸ — ۰۸:۴۰',
        lastActivityAt: '۱۴۰۴/۰۹/۲۸ — ۰۹:۵۰',
        user: {
            name: 'زهرا کریمی',
            role: 'کارشناس فروش',
            userCode: 'USR-2048',
            avatarClassName: 'bg-info-container text-info',
        },
        info: [
            { label: 'شناسه نشست', value: 'S-۷۴۱۰' },
            { label: 'وضعیت', value: 'فعال' },
            { label: 'دستگاه / مرورگر', value: 'دسکتاپ ، Firefox ۱۲۲' },
            { label: 'IP / مکان', value: '۷۹.۱۲۷.۲۰۱.۴۴' },
            { label: 'شروع نشست', value: '۱۴۰۴/۰۹/۲۸ — ۰۸:۴۰' },
            { label: 'آخرین فعالیت', value: '۱۴۰۴/۰۹/۲۸ — ۰۹:۵۰' },
        ],
        activities: [
            {
                id: 'act-1',
                time: '۰۹:۵۰',
                activityType: 'ثبت سفارش',
                details: 'سفارش #۸۹۲',
                result: 'موفق',
                eventId: 'evt-2',
            },
            {
                id: 'act-2',
                time: '۰۹:۴۴',
                activityType: 'تغییر وضعیت سفارش',
                details: 'سفارش #۸۸۱',
                result: 'موفق',
                eventId: 'evt-3',
            },
        ],
    },
    's-0098': {
        id: 's-0098',
        sessionId: 'S-۰۰۹۸',
        status: 'غیرفعال',
        deviceBrowser: 'نامشخص ، نامشخص',
        ip: '۱۹۱.۱۰۱.۸۸.۲۳',
        startedAt: '۱۴۰۴/۰۹/۲۷ — ۰۲:۱۱',
        lastActivityAt: '۱۴۰۴/۰۹/۲۷ — ۰۲:۱۱',
        user: DEFAULT_USER,
        info: [
            { label: 'شناسه نشست', value: 'S-۰۰۹۸' },
            { label: 'وضعیت', value: 'غیرفعال' },
            { label: 'دستگاه / مرورگر', value: 'نامشخص ، نامشخص' },
            { label: 'IP / مکان', value: '۱۹۱.۱۰۱.۸۸.۲۳' },
            { label: 'شروع نشست', value: '۱۴۰۴/۰۹/۲۷ — ۰۲:۱۱' },
            { label: 'آخرین فعالیت', value: '۱۴۰۴/۰۹/۲۷ — ۰۲:۱۱' },
        ],
        activities: [
            {
                id: 'act-1',
                time: '۰۲:۱۱',
                activityType: 'ورود ناموفق',
                details: 'IP ناشناس',
                result: 'ناموفق',
                eventId: 'evt-4',
            },
        ],
    },
}

export const getSessionDetailById = (id: string): SessionDetailData =>
    SESSION_DETAILS_DUMMY[id] ?? {
        id,
        sessionId: id,
        status: '—',
        deviceBrowser: '—',
        ip: '—',
        startedAt: '—',
        lastActivityAt: '—',
        user: DEFAULT_USER,
        info: [
            { label: 'شناسه نشست', value: id },
            { label: 'وضعیت', value: '—' },
            { label: 'دستگاه / مرورگر', value: '—' },
            { label: 'IP / مکان', value: '—' },
            { label: 'شروع نشست', value: '—' },
            { label: 'آخرین فعالیت', value: '—' },
        ],
        activities: [],
    }

export const getEventDetailById = (id: string): EventDetailData =>
    EVENT_DETAILS_DUMMY[id] ?? {
        id,
        info: [
            { label: 'ماژول', value: '—' },
            { label: 'نوع فعالیت', value: '—' },
            { label: 'تاریخ', value: '—' },
            { label: 'زمان', value: '—' },
            { label: 'نتیجه', value: '—' },
            { label: 'موجودیت مرتبط', value: '—' },
        ],
        changes: [],
        user: DEFAULT_USER,
        session: DEFAULT_SESSION,
    }
