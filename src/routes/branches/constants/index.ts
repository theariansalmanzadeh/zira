import { IconLabel } from '@/src/shared/types/icon'

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
    hasBackButton?: boolean
}

export const sectionToHeading: Record<string, SectionHeading | null> = {
    dashboard: {
        title: 'داشبورد شعب',
        subtitle: 'نمای کلی شبکه شعب، فروش و عملکرد — دوره: این ماه',
        showPeriodToggle: true,
        showDateRange: true,
        buttons: [
            {
                label: 'شعبه جدید',
                icon: 'addSm400Broken',
                href: '/admin/branches/new',
                variant: 'primary',
            },
        ],
    },
    list: {
        title: 'لیست شعب',
        subtitle: 'مدیریت شعب فروش و نمایندگی‌ها',
        buttons: [
            {
                label: 'شعبه جدید',
                icon: 'addSm400Broken',
                href: '/admin/branches/new',
                variant: 'primary',
            },
        ],
    },
    report: {
        title: 'گزارش و مقایسه شعب',
        subtitle: 'نمای کلی شبکه شعب، فروش و عملکرد — دوره: این ماه',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'export300Linear',
                variant: 'outline',
            },
        ],
    },
    'branch-stock': {
        title: 'موجودی شعب و انبارها',
        subtitle: 'موجودی کالا در شعب و انبارهای مرتبط',
        buttons: [
            {
                label: 'ثبت انتقال جدید',
                icon: 'addSm400Broken',
                href: '/admin/branches/branch-stock/new',
                variant: 'primary',
            },
        ],
    },
    'branch-stock-new': {
        title: 'ثبت انتقال جدید',
        subtitle: 'انتخاب مبدا، مقصد و اقلام انتقال',
        hasBackButton: true,
    },
    'warehouse-transfer-tracking': {
        title: 'پیگیری انتقال بین انبار',
        subtitle:
            'چرخه انتقال‌های داخلی هر شعبه، از ثبت درخواست تا قطعی شدن سند',
        buttons: [
            {
                label: 'گردش کالا',
                icon: 'menu400Linear',
                href: '/admin/branches?sub=product-turnover',
                variant: 'outline',
            },
            {
                label: 'ثبت انتقال جدید',
                icon: 'addSm400Broken',
                href: '/admin/branches/warehouse-transfer-tracking/new',
                variant: 'primary',
            },
        ],
    },
    'warehouse-transfer-new': {
        title: 'ثبت انتقال بین انبار',
        subtitle: 'انتخاب مبدا، مقصد و اقلام انتقال',
        hasBackButton: true,
    },
    'product-turnover': {
        title: 'گردش کالا',
        subtitle: 'اسناد ورود و خروج کالا در شعب و انبارها',
    },
    'product-turnover-details': {
        title: 'جزئیات سند گردش کالا',
        subtitle: 'مشاهده جزئیات سند انتخاب‌شده',
        hasBackButton: true,
    },
    'branch-transfer': {
        title: 'انتقال بین شعب',
        subtitle: 'پیگیری چرخه انتقال کالا بین انبارهای شعب',
        buttons: [
            {
                label: 'ثبت انتقال',
                icon: 'addSm400Broken',
                href: '/admin/branches/branch-transfer/new',
                variant: 'primary',
            },
        ],
    },
    'branch-transfer-new': {
        title: 'ثبت انتقال بین شعب',
        subtitle: 'انتخاب مبدا، مقصد و اقلام انتقال',
        hasBackButton: true,
    },
    'branch-transfer-details': {
        title: 'جزئیات انتقال بین شعب',
        subtitle: 'مشاهده جزئیات انتقال انتخاب‌شده',
        hasBackButton: true,
    },
    repricing: {
        title: 'قیمت‌گذاری مجدد',
        subtitle: 'به‌روزرسانی قیمت کالا در شعب',
    },
    new: null,
}

export const getBranchesSectionKey = (sub: string) => sub || 'dashboard'

export const getBranchesSectionKeyFromPath = (
    pathname: string
): string | null => {
    if (pathname.startsWith('/admin/branches/product-turnover/')) {
        return 'product-turnover-details'
    }
    if (pathname === '/admin/branches/branch-transfer/new') {
        return 'branch-transfer-new'
    }
    if (pathname.startsWith('/admin/branches/branch-transfer/')) {
        return 'branch-transfer-details'
    }
    if (pathname === '/admin/branches/warehouse-transfer-tracking/new') {
        return 'warehouse-transfer-new'
    }
    if (pathname === '/admin/branches/branch-stock/new') {
        return 'branch-stock-new'
    }

    const segments = pathname
        .replace(/^\/admin\/branches\/?/, '')
        .split('/')
        .filter(Boolean)

    if (segments.length === 0) return null

    return null
}

export const BRANCH_PERIOD_OPTIONS = [
    { value: 'month', label: 'ماه' },
    { value: 'week', label: 'هفته' },
    { value: 'today', label: 'امروز' },
] as const
