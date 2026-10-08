import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

import { IconLabel } from '@/src/shared/types/icon'

export const ORDER_SUB_SIDEBAR_SECTIONS = [
    {
        title: 'نمای کلی',
        links: [
            { label: 'داشبورد سفارشات', href: '/admin/order-managment?sub=dashboard' },
        ],
    },
    {
        title: 'سفارش‌ها',
        links: [
            { label: 'لیست سفارش‌ها', href: '/admin/order-managment?sub=order-list' },
            { label: 'فاکتورها', href: '/admin/order-managment?sub=factor' },
        ],
    },
    {
        title: 'پیش‌سفارش‌ها',
        links: [
            { label: 'درخواست‌ها', href: '/admin/order-managment?sub=requests' },
        ],
    },
] as const

export const ORDER_SUB_PARAMS = [
    'dashboard',
    'order-list',
    'factor',
    'list',
    'pre-orders',
    'requests',
] as const

export type OrderSubParam = (typeof ORDER_SUB_PARAMS)[number]

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
    showPeriodToggle?: boolean
    showDateRange?: boolean
    hasBackButton?: boolean
}

export const sectionToHeading: Record<string, SectionHeading | null> = {
    dashboard: {
        title: 'داشبورد سفارشات',
        subtitle: 'نمای کلی سفارش‌ها، وضعیت و عملکرد — دوره: این ماه',
        showPeriodToggle: true,
        showDateRange: true,
        buttons: [
            {
                label: 'ثبت سفارش جدید',
                icon: 'addSm400Broken',
                href: '/admin/order-managment/new-order',
                variant: 'primary',
            },
        ],
    },
    list: {
        title: 'لیست سفارش‌ها',
        subtitle: 'مدیریت و پیگیری سفارش‌های ثبت‌شده',
        buttons: [
            {
                label: 'ثبت سفارش جدید',
                icon: 'addSm400Broken',
                href: '/admin/order-managment/new-order',
                variant: 'primary',
            },
        ],
    },
    'pre-orders': {
        title: 'پیش‌سفارش‌ها',
        subtitle: 'مدیریت درخواست‌های پیش‌سفارش مشتریان',
    },
    requests: {
        title: 'درخواست‌ها',
        subtitle: 'پیگیری و مدیریت درخواست‌های سفارش',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'export300Linear',
                variant: 'outline',
            },
        ],
    },
    factor: {
        title: 'فاکتورها',
        subtitle: 'فاکتورهای صادرشده سفارش‌ها',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'export300Linear',
                variant: 'outline',
            },
        ],
    },
    'order-details': {
        title: 'جزئیات سفارش',
        hasBackButton: true,
    },
}

export const getOrderSectionKey = (sub: string) => {
    if (sub === 'order-list') return 'list'
    if (sub === 'factor') return 'factor'
    return sub || 'dashboard'
}

export const getOrderSectionKeyFromPath = (pathname: string): string | null => {
    if (pathname.startsWith('/admin/order-managment/order-list')) return 'list'
    if (pathname.startsWith('/admin/order-managment/pre-order-details')) return null
    if (pathname.startsWith('/admin/order-managment/pre-order')) return 'pre-orders'
    if (pathname.startsWith('/admin/order-managment/order-details')) return 'order-details'
    if (pathname.startsWith('/admin/order-managment/new-order')) return null
    if (pathname === '/admin/order-managment' || pathname === '/admin/order-managment/') return 'dashboard'

    return null
}

export const ORDER_PERIOD_OPTIONS = [
    { value: 'month', label: 'ماه' },
    { value: 'week', label: 'هفته' },
    { value: 'today', label: 'امروز' },
] as const

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "col-0", header_label: "شناسه سفارش", isChecked: true },
    { id: "col-1", header_label: "زمان", isChecked: true },
    { id: "col-2", header_label: "جمع کل", isChecked: true },
    { id: "col-3", header_label: "روش پرداخت", isChecked: true },
    { id: "col-4", header_label: "وضعیت", isChecked: true },
    { id: "col-5", header_label: "مرحله", isChecked: true },
    { id: "actions-0", header_label: "", isChecked: true },
    { id: "actions-1", header_label: "", isChecked: true },
    { id: "actions-2", header_label: "", isChecked: true },
]
