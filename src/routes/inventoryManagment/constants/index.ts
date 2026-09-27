import { IconLabel } from '@/src/shared/types/icon'

export const INVENTORY_SUB_SIDEBAR_SECTIONS = [
    {
        title: 'نمای کلی',
        links: [
            { label: 'داشبورد انبار', href: '/admin/inventory-managment?sub=dashboard' },
            { label: 'لیست انبارها', href: '/admin/inventory-managment?sub=list' },
        ],
    },
    {
        title: 'عملیات کالا',
        links: [
            { label: 'ورود کالا / رسید انبار', href: '/admin/inventory-managment?sub=goods-entry' },
            { label: 'رسید انبار', href: '/admin/inventory-managment?sub=warehouse-receipt' },
            { label: 'آماده‌سازی و خروج کالا', href: '/admin/inventory-managment?sub=preparation-exit' },
            { label: 'وضعیت مرسوله‌ها', href: '/admin/inventory-managment?sub=shipment-status' },
            { label: 'انتقال بین انبار', href: '/admin/inventory-managment?sub=transfer' },
            { label: 'تغییر آدرس کالا', href: '/admin/inventory-managment?sub=change-address' },
        ],
    },
    {
        title: 'کنترل موجودی',
        links: [
            { label: 'انبارگردانی', href: '/admin/inventory-managment?sub=stocktaking' },
            { label: 'مرجوعی', href: '/admin/inventory-managment?sub=stock-returns' },
            { label: 'ضایعات', href: '/admin/inventory-managment?sub=waste' },
        ],
    },
    {
        title: 'گزارش‌ها',
        links: [
            { label: 'مرور مبلغی انبار', href: '/admin/inventory-managment?sub=financial-review' },
            { label: 'مرور تعدادی انبار', href: '/admin/inventory-managment?sub=quantity-review' },
        ],
    },
] as const

export const INVENTORY_SUB_PARAMS = [
    'dashboard',
    'list',
    'goods-entry',
    'warehouse-receipt',
    'preparation-exit',
    'shipment-status',
    'transfer',
    'change-address',
    'stocktaking',
    'stock-returns',
    'waste',
    'financial-review',
    'quantity-review',
] as const

export type InventorySubParam = (typeof INVENTORY_SUB_PARAMS)[number]

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
    statusPill?: string
    hasBackButton?: boolean
}

export const sectionToHeading: Record<string, SectionHeading | null> = {
    dashboard: {
        title: 'داشبورد انبار',
        subtitle: 'نمای کلی موجودی، عملیات و وضعیت انبارها',
    },
    list: {
        title: 'لیست انبارها',
        subtitle: '۴ انبار تعریف شده',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'export300Linear',
                variant: 'outline',
            },
            {
                label: 'انبار جدید',
                icon: 'addSm400Broken',
                variant: 'primary',
                href: '/admin/inventory-managment/new',
            },
        ],
    },
    'inventory-new': {
        title: 'انبار جدید',
        subtitle: 'تعریف انبار و ساختار آدرس‌دهی',
        buttons: [
            {
                label: 'بازگشت به فهرست',
                variant: 'outline',
                href: '/admin/inventory-managment?sub=list',
            },
        ],
    },
    'goods-entry': {
        title: 'ورود کالا / رسید انبار',
        subtitle: 'ثبت کالای دریافتی از تامین‌کننده، خرید یا انتقال و تخصیص آدرس',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'export300Linear',
                variant: 'outline',
            },
            {
                label: 'انبار جدید',
                icon: 'addSm400Broken',
                variant: 'primary',
                href: '/admin/inventory-managment/new',
            },
        ],
    },
    'goods-entry-details': {
        title: 'جزئیات فاکتور',
        subtitle: 'اطلاعات درخواست ورود کالا و آدرس تخصیص‌یافته',
        hasBackButton: true,
    },
    'warehouse-receipt': {
        title: 'رسید انبار',
        subtitle: 'پیگیری رسیدهای انبار در جریان و فهرست رسیدها',
    },
    'preparation-exit': {
        title: 'آماده‌سازی و خروج کالا',
        subtitle: 'آماده‌سازی و ثبت خروج کالا از انبار',
    },
    'preparation-exit-details': {
        title: 'جزئیات خروج کالا',
        subtitle: 'اطلاعات فاکتور، مشتری و انبار تحویل‌دهنده',
        hasBackButton: true,
    },
    'shipment-status': {
        title: 'وضعیت مرسوله‌ها',
        subtitle: 'پیگیری وضعیت آماده‌سازی، ارسال و تحویل مرسوله‌ها',
    },
    transfer: {
        title: 'انتقال بین انبار',
        subtitle: 'جابه‌جایی کالا میان انبارها با تایید مبدا و مقصد و رسید انتقال',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'export300Linear',
                variant: 'outline',
            },
            {
                label: 'ثبت انتقال جدید',
                icon: 'addSm400Broken',
                variant: 'primary',
            },
        ],
    },
    'change-address': {
        title: 'تغییر آدرس کالا',
        subtitle: 'جابه‌جایی کالا میان آدرس‌های یک انبار (بدون تغییر موجودی کل)',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'export300Linear',
                variant: 'outline',
            },
            {
                label: 'تغییر آدرس جدید',
                icon: 'addSm400Broken',
                variant: 'primary',
                href: '/admin/inventory-managment/change-address/new',
            },
        ],
    },
    'change-address-new': {
        title: 'تغییر آدرس جدید',
        subtitle: 'جابه‌جایی کالا میان آدرس‌های یک انبار',
        hasBackButton: true,
    },
    stocktaking: {
        title: 'انبارگردانی',
        subtitle: 'شمارش دوره‌ای موجودی، شناسایی مغایرت و صدور سند اصلاحی',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'export300Linear',
                variant: 'outline',
            },
            {
                label: 'ثبت انبارگردانی جدید',
                icon: 'addSm400Broken',
                variant: 'primary',
                href: '/admin/inventory-managment/stocktaking/new',
            },
        ],
    },
    'stocktaking-new': {
        title: 'انبارگردانی جدید',
        subtitle: 'SC-1404-12-15',
        statusPill: 'پیش‌نویس',
        hasBackButton: true,
        buttons: [
            {
                label: 'بازگشت به فهرست',
                variant: 'outline',
                href: '/admin/inventory-managment?sub=stocktaking',
            },
        ],
    },
    'stock-returns': {
        title: 'مرجوعی',
        subtitle: 'مدیریت مرجوعی‌های انبار',
    },
    'stock-return-details': {
        title: 'جزئیات مرجوعی',
        subtitle: 'ثبت دریافت و تخصیص آدرس کالا در انبار',
        hasBackButton: true,
    },
    waste: {
        title: 'ضایعات',
        subtitle: 'ثبت و پیگیری ضایعات انبار',
        buttons: [
            {
                label: 'ثبت ضایعات جدید',
                icon: 'addSm400Broken',
                variant: 'primary',
                href: '/admin/inventory-managment/waste/new',
            },
        ],
    },
    'waste-new': {
        title: 'ثبت ضایعات جدید',
        subtitle: 'اعلام کالایی که کیفیت خود را از دست داده است',
        hasBackButton: true,
    },
    'financial-review': {
        title: 'مرور مبلغی انبار',
        subtitle: 'گزارش مبلغی موجودی و عملیات انبار',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'export300Linear',
                variant: 'outline',
            },
        ],
    },
    'quantity-review': {
        title: 'مرور تعدادی انبار',
        subtitle: 'گزارش تعدادی موجودی و عملیات انبار',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'export300Linear',
                variant: 'outline',
            },
        ],
    },
}

export const getInventorySectionKey = (sub: string) => sub || 'dashboard'

export const getInventorySectionKeyFromPath = (
    pathname: string,
    searchParams: Pick<URLSearchParams, 'get'>
): string => {
    if (pathname.startsWith('/admin/inventory-managment/preparation-exit/')) {
        return 'preparation-exit-details'
    }
    if (pathname.startsWith('/admin/inventory-managment/goods-entry/')) {
        return 'goods-entry-details'
    }
    if (pathname.startsWith('/admin/inventory-managment/stocktaking/new')) {
        return 'stocktaking-new'
    }
    if (pathname.startsWith('/admin/inventory-managment/change-address/new')) {
        return 'change-address-new'
    }
    if (pathname.startsWith('/admin/inventory-managment/waste/new')) {
        return 'waste-new'
    }
    if (pathname.startsWith('/admin/inventory-managment/stock-returns/')) {
        return 'stock-return-details'
    }
    if (pathname.startsWith('/admin/inventory-managment/new')) {
        return 'inventory-new'
    }
    if (pathname.startsWith('/admin/inventory-managment/details/')) {
        return 'list'
    }

    const isInventoryRoot =
        pathname === '/admin/inventory-managment' ||
        pathname === '/admin/inventory-managment/'

    if (!isInventoryRoot) return 'dashboard'

    return getInventorySectionKey(searchParams.get('sub') || '')
}
