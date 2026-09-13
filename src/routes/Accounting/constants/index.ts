import { IconLabel } from '@/src/shared/types/icon'

export const ACCOUNTING_SUB_SIDEBAR_SECTIONS = [
    {
        title: 'نمای کلی',
        links: [{ label: 'داشبورد مالی', href: '/admin/accounting?sub=dashboard' }],
    },
    {
        title: 'دفتر کل و اسناد',
        links: [
            { label: 'فهرست سرفصل‌ها', href: '/admin/accounting?sub=chart-of-accounts' },
            { label: 'اسناد حسابداری', href: '/admin/accounting?sub=documents' },
            { label: 'مرور حساب‌ها و دفاتر', href: '/admin/accounting?sub=ledger-review' },
            { label: 'تراز آزمایشی', href: '/admin/accounting?sub=trial-balance' },
        ],
    },
    {
        title: 'خزانه‌داری',
        links: [
            { label: 'رسیدهای دریافت', href: '/admin/accounting?sub=receipts' },
            { label: 'اعلامیه‌های پرداخت', href: '/admin/accounting?sub=payment-notices' },
            { label: 'مدیریت چک‌ها', href: '/admin/accounting?sub=check-management' },
            { label: 'بانک‌ها و صندوق‌ها', href: '/admin/accounting?sub=banks-and-cash' },
            { label: 'انتقال داخلی و تهاتر', href: '/admin/accounting?sub=internal-transfer' },
        ],
    },
    {
        title: 'مالیات',
        links: [
            { label: 'ارزش افزوده', href: '/admin/accounting?sub=vat' },
            { label: 'سامانه مودیان', href: '/admin/accounting?sub=taxpayer-system' },
        ],
    },
    {
        title: 'حقوق و تحلیل',
        links: [
            { label: 'حقوق و دستمزد', href: '/admin/accounting?sub=payroll' },
            { label: 'تحلیل مالی مشتریان', href: '/admin/accounting?sub=customer-analysis' },
        ],
    },
] as const

export const ACCOUNTING_SUB_PARAMS = [
    'dashboard',
    'chart-of-accounts',
    'documents',
    'ledger-review',
    'trial-balance',
    'receipts',
    'payment-notices',
    'check-management',
    'banks-and-cash',
    'internal-transfer',
    'vat',
    'taxpayer-system',
    'payroll',
    'customer-analysis',
] as const

export type AccountingSubParam = (typeof ACCOUNTING_SUB_PARAMS)[number]

export type HeadingButton = {
    label: string
    icon?: IconLabel
    href?: string
    action?: () => void
    variant: 'primary' | 'default' | 'outline'
}

export type SectionHeading = {
    title: string
    subtitle: string
    buttons?: HeadingButton[]
    showPeriodToggle?: boolean
    showDateRange?: boolean
}

export const sectionToHeading: Record<AccountingSubParam, SectionHeading> = {
    dashboard: {
        title: 'داشبورد مالی',
        subtitle: 'نمای کلی وضعیت مالی، خزانه و مالیات — دوره: این ماه',
        showPeriodToggle: true,
        showDateRange: true,
    },
    'chart-of-accounts': {
        title: 'فهرست سرفصل‌ها',
        subtitle: 'مدیریت ساختار حساب‌ها و سرفصل‌های دفتر کل',
    },
    documents: {
        title: 'اسناد حسابداری',
        subtitle: 'دفتر روزنامه تمام رویدادهای مالی ثبت شده',
        buttons: [
            {
                label: 'ادغام اسناد',
                variant: 'outline',
            },
            {
                label: 'صدور سند جدید',
                icon: 'addSm400Broken',
                href: '/admin/accounting/new-document',
                variant: 'primary',
            },
        ],
    },
    'ledger-review': {
        title: 'مرور حساب‌ها و دفاتر',
        subtitle: 'بررسی گردش حساب‌ها و دفاتر معین و کل',
    },
    'trial-balance': {
        title: 'تراز آزمایشی',
        subtitle: 'گزارش تراز آزمایشی در بازه زمانی انتخابی',
        showDateRange: true,
    },
    receipts: {
        title: 'رسیدهای دریافت',
        subtitle: 'مدیریت رسیدهای دریافت وجه و تسویه',
        buttons: [
            {
                label: 'رسید جدید',
                icon: 'addSm400Broken',
                variant: 'primary',
            },
        ],
    },
    'payment-notices': {
        title: 'اعلامیه‌های پرداخت',
        subtitle: 'ثبت و پیگیری اعلامیه‌های پرداخت',
        buttons: [
            {
                label: 'اعلامیه جدید',
                icon: 'addSm400Broken',
                variant: 'primary',
            },
        ],
    },
    'check-management': {
        title: 'مدیریت چک‌ها',
        subtitle: 'پیگیری چک‌های دریافتی و پرداختی',
    },
    'banks-and-cash': {
        title: 'بانک‌ها و صندوق‌ها',
        subtitle: 'مدیریت حساب‌های بانکی و صندوق‌های نقدی',
    },
    'internal-transfer': {
        title: 'انتقال داخلی و تهاتر',
        subtitle: 'انتقال بین حساب‌ها و تهاتر بدهی و بستانکاری',
        buttons: [
            {
                label: 'انتقال جدید',
                icon: 'addSm400Broken',
                variant: 'primary',
            },
        ],
    },
    vat: {
        title: 'ارزش افزوده',
        subtitle: 'مدیریت اظهارنامه و گزارش‌های ارزش افزوده',
    },
    'taxpayer-system': {
        title: 'سامانه مودیان',
        subtitle: 'ارسال و پیگیری صورتحساب‌ها در سامانه مودیان',
    },
    payroll: {
        title: 'حقوق و دستمزد',
        subtitle: 'محاسبه و پرداخت حقوق و دستمزد پرسنل',
    },
    'customer-analysis': {
        title: 'تحلیل مالی مشتریان',
        subtitle: 'بررسی وضعیت مالی و رفتار پرداخت مشتریان',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'export300Linear',
                variant: 'outline',
            },
        ],
    },
}

export const getAccountingSectionKey = (sub: string): AccountingSubParam =>
    ACCOUNTING_SUB_PARAMS.includes(sub as AccountingSubParam)
        ? (sub as AccountingSubParam)
        : 'dashboard'

export const getAccountingSectionKeyFromPath = (
    pathname: string
): AccountingSubParam | null => {
    if (pathname.startsWith('/admin/accounting/new-document')) return null

    if (
        pathname === '/admin/accounting' ||
        pathname.startsWith('/admin/accounting/')
    ) {
        return 'dashboard'
    }

    return null
}

export const ACCOUNTING_PERIOD_OPTIONS = [
    { value: 'month', label: 'ماه' },
    { value: 'week', label: 'هفته' },
    { value: 'today', label: 'امروز' },
] as const
