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
            { label: 'آماده‌سازی و خروج کالا', href: '/admin/inventory-managment?sub=preparation-exit' },
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
    'preparation-exit',
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
            },
        ],
    },
    'preparation-exit': {
        title: 'آماده‌سازی و خروج کالا',
        subtitle: 'آماده‌سازی و ثبت خروج کالا از انبار',
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
            },
        ],
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
                label: 'شروع انبارگردانی جدید',
                icon: 'addSm400Broken',
                variant: 'primary',
            },
        ],
    },
    'stock-returns': {
        title: 'مرجوعی',
        subtitle: 'مدیریت مرجوعی‌های انبار',
    },
    waste: {
        title: 'ضایعات',
        subtitle: 'ثبت و پیگیری ضایعات انبار',
    },
    'financial-review': {
        title: 'مرور مبلغی انبار',
        subtitle: 'گزارش مبلغی موجودی و عملیات انبار',
    },
    'quantity-review': {
        title: 'مرور تعدادی انبار',
        subtitle: 'گزارش تعدادی موجودی و عملیات انبار',
    },
}

export const getInventorySectionKey = (sub: string) => sub || 'dashboard'
