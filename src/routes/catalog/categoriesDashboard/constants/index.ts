import { IconLabel } from '@/src/shared/types/icon'

export const CATEGORY_SUMMARY_CARDS: {
    icon: IconLabel
    iconClassName: string
    value: string
    label: string
    suffix?: string
}[] = [
    {
        icon: 'product400Linear',
        iconClassName: 'rounded-card-sm bg-warning-container p-1 text-warning',
        value: '۱,۲۴۸',
        label: 'کالای فعال',
    },
    {
        icon: 'dashboard',
        iconClassName: 'rounded-card-sm bg-warning-container p-1 text-warning',
        value: '۸۶',
        label: 'کالای کم‌موجود',
    },
    {
        icon: 'tag400Linear',
        iconClassName: 'rounded-card-sm bg-success-container p-1 text-success',
        value: '۱۲',
        label: 'کمپین فعال',
    },
    {
        icon: 'announcement400Linear',
        iconClassName: 'rounded-card-sm bg-info-container p-1 text-info',
        value: '۳۴٪',
        label: 'میانگین حاشیه سود',
    },
]

export const CATEGORY_QUICK_ACCESS_ITEMS = [
    { label: 'لیست کالاها', href: '/admin/catalog?sub=products' },
    { label: 'دسته‌بندی‌ها', href: '/admin/catalog?sub=category-types' },
    { label: 'مدیریت تخفیف', href: '/admin/catalog?sub=discounts' },
    { label: 'کمپین‌ها', href: '/admin/catalog?sub=campaigns' },
]
