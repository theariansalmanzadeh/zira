import { IconLabel } from '@/src/shared/types/icon'

export const SALES_SUB_SIDEBAR_SECTIONS = [
    {
        title: 'نمای کلی',
        links: [{ label: 'مرور فروش', href: '/admin/sales?sub=dashboard' }],
    },
    {
        title: 'چرخه فروش',
        links: [
            { label: 'پیش‌فاکتورها', href: '/admin/sales?sub=pre-factor' },
            { label: 'فاکتورهای فروش', href: '/admin/sales?sub=invoices' },
            { label: 'برگشت از فروش', href: '/admin/sales?sub=returns' },
        ],
    },
    {
        title: 'عملیات فروش',
        links: [
            { label: 'فروش امانی', href: '/admin/sales?sub=consignment' },
            { label: 'مدیریت پیش‌فروش', href: '/admin/sales?sub=pre-sale' },
            { label: 'درخواست‌ها', href: '/admin/sales?sub=requests' },
        ],
    },
    {
        title: 'طرف حساب و گزارش',
        links: [
            { label: 'مرور جامع طرف حساب', href: '/admin/sales?sub=accounts' },
            { label: 'گزارش فروش', href: '/admin/sales?sub=report' },
        ],
    },
] as const

export const SALES_SUB_PARAMS = [
    'dashboard',
    'pre-factor',
    'invoices',
    'returns',
    'consignment',
    'pre-sale',
    'requests',
    'accounts',
    'report',
] as const

export type SalesSubParam = (typeof SALES_SUB_PARAMS)[number]

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

export const sectionToHeading: Record<string, SectionHeading | null> = {
    dashboard: {
        title: 'مرور فروش',
        subtitle: 'نمای کلی فروش، تسویه و عملکرد فروشندگان',
        showPeriodToggle: true,
        showDateRange: true,
        buttons: [
            {
                label: 'فاکتور فروش جدید',
                icon: 'addSm400Broken',
                href: '/admin/sales/new-factor',
                variant: 'primary',
            },
        ],
    },
    'pre-factor': {
        title: 'پیش‌فاکتورها',
        subtitle: 'پیشنهاد قیمت پیش از فروش قطعی',
        buttons: [
            {
                label: 'پیش‌فاکتور جدید',
                icon: 'addSm400Broken',
                href: '/admin/sales/pre-factor/new',
                variant: 'primary',
            },
        ],
    },
    invoices: {
        title: 'فاکتورهای فروش',
        subtitle: 'اسناد فروش قطعی به مشتریان',
        buttons: [
            {
                label: 'فاکتور فروش جدید',
                icon: 'addSm400Broken',
                href: '/admin/sales/new-factor',
                variant: 'primary',
            },
        ],
    },
    returns: {
        title: 'برگشت از فروش',
        subtitle: 'مدیریت مرجوعی کالا از مشتریان با گردش تایید',
        buttons: [
            {
                label: 'ثبت برگشتی جدید',
                icon: 'addSm400Broken',
                href: '/admin/sales/returns/new',
                variant: 'primary',
            },
        ],
    },
    consignment: {
        title: 'فروش امانی',
        subtitle: 'مدیریت مرجوعی کالا از مشتریان با گردش تایید',
        buttons: [
            {
                label: 'فروش امانی جدید',
                icon: 'addSm400Broken',
                href: '/admin/sales/consignment/new',
                variant: 'primary',
            },
        ],
    },
    'pre-sale': {
        title: 'مدیریت پیش‌فروش',
        subtitle: 'تخصیص سیستمی کالای تامین‌شده به سفارش‌های پیش‌فروش',
        buttons: [
            {
                label: 'اجرای تخصیص خودکار',
                variant: 'outline',
            },
        ],
    },
    requests: {
        title: 'درخواست‌ها',
        subtitle: 'پیگیری و مدیریت درخواست‌های فروش',
        buttons: [
            {
                label: 'درخواست جدید',
                icon: 'addSm400Broken',
                href: '/admin/sales/requests/new',
                variant: 'primary',
            },
        ],
    },
    accounts: {
        title: 'مرور جامع طرف حساب',
        subtitle: 'نمای یکپارچه بدهی، بستانکاری و تسویه مشتریان',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'export300Linear',
                variant: 'outline',
            },
        ],
    },
    report: {
        title: 'گزارش فروش',
        subtitle: 'تحلیل روند فروش، تسویه و عملکرد فروشندگان',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'export300Linear',
                variant: 'outline',
            },
        ],
    },
}

export const getSalesSectionKey = (sub: string) => sub || 'dashboard'

export const getSalesSectionKeyFromPath = (pathname: string): string | null => {
    if (pathname.startsWith('/admin/sales/new-factor')) return null

    const segments = pathname.replace(/^\/admin\/sales\/?/, '').split('/').filter(Boolean)

    if (segments.length === 0) return null

    return null
}

export const SALES_PERIOD_OPTIONS = [
    { value: 'month', label: 'ماه' },
    { value: 'week', label: 'هفته' },
    { value: 'today', label: 'امروز' },
] as const
