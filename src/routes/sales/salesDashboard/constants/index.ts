import type { IconLabel } from '@/src/shared/types/icon'

export const MONTHLY_SALES_DATA = [
    { date: '3/1', sales: 145, returns: 52 },
    { date: '3/8', sales: 168, returns: 48 },
    { date: '3/15', sales: 132, returns: 61 },
    { date: '3/22', sales: 189, returns: 55 },
    { date: '3/29', sales: 156, returns: 44 },
]

export type SalesSummaryCard = {
    icon: IconLabel
    bodyTitle: string
    iconClassName: string
}

export const SALES_SUMMARY_CARDS: SalesSummaryCard[] = [
    {
        icon: 'receipt400Linear',
        bodyTitle: 'فروش کل دوره',
        iconClassName: 'rounded-card-sm bg-surface-container-high p-1 text-on-surface',
    },
    {
        icon: 'receipt400Linear',
        bodyTitle: 'تعداد فاکتور',
        iconClassName: 'rounded-card-sm bg-success-container p-1 text-success',
    },
    {
        icon: 'table400Linear',
        bodyTitle: 'پیش‌فروش در انتظار تخصیص',
        iconClassName: 'rounded-card-sm bg-warning-container p-1 text-warning',
    },
    {
        icon: 'refresh400Linear',
        bodyTitle: 'برگشت از فروش',
        iconClassName: 'rounded-card-sm bg-error-container p-1 text-error',
    },
]

export const URGENT_ACTIONS = [
    {
        title: '۶ پیش‌فروش منتظر تخصیص کالا',
        description: '۶ پیش‌فروش منتظر تخصیص کالا',
    },
    {
        title: '۶ پیش‌فروش منتظر تخصیص کالا',
        description: '۶ پیش‌فروش منتظر تخصیص کالا',
    },
    {
        title: '۶ پیش‌فروش منتظر تخصیص کالا',
        description: '۶ پیش‌فروش منتظر تخصیص کالا',
    },
    {
        title: '۶ پیش‌فروش منتظر تخصیص کالا',
        description: '۶ پیش‌فروش منتظر تخصیص کالا',
    },
]

export const TOP_SELLERS = [
    { label: 'نام کاربر', percent: 62, value: '۲.۹ میلیارد' },
    { label: 'نام کاربر', percent: 30, value: '۱.۳ میلیارد' },
    { label: 'نام کاربر', percent: 4, value: '۴۸۰ میلیون' },
    { label: 'نام کاربر', percent: 2, value: '۲۱۰ میلیون' },
    { label: 'نام کاربر', percent: 2, value: '۱۸۰ میلیون' },
]

export const TOP_PRODUCTS = [
    { label: 'عنوان محصول', percent: 62, value: '۹۲۵ عدد' },
    { label: 'عنوان محصول', percent: 30, value: '۴۵۹ عدد' },
    { label: 'عنوان محصول', percent: 4, value: '۲۱۰ عدد' },
    { label: 'عنوان محصول', percent: 2, value: '۹۸ عدد' },
    { label: 'عنوان محصول', percent: 2, value: '۷۶ عدد' },
]

export const QUICK_ACCESS_ITEMS = [
    { label: 'پیش‌فاکتورها', value: 12, href: '/admin/sales?sub=pre-factor' },
    { label: 'مدیریت پیش‌فروش', value: 2, href: '/admin/sales?sub=pre-sale' },
    { label: 'برگشت از فروش', value: 27, href: '/admin/sales?sub=returns' },
]
