import { IconLabel } from '@/src/shared/types/icon'
import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import type { SubSidebarSection } from '@/src/shared/components/sidebar/content/types'

export const CUSTOMERS_SUB_SIDEBAR_SECTIONS: readonly SubSidebarSection[] = [
    {
        title: 'نمای کلی',
        links: [
            { label: 'داشبورد مشتریان', href: '/admin/customers?sub=dashboard' },
        ],
    },
    {
        title: 'سطح‌بندی و درخواست‌ها',
        links: [
            { label: 'لیست مشتریان', href: '/admin/customers?sub=list' },
            { label: 'لیست درخواست‌ها', href: '/admin/customers?sub=requests' },
        ],
    },
]

export const CUSTOMERS_SUB_PARAMS = ['dashboard', 'list', 'requests'] as const

export type CustomersSubParam = (typeof CUSTOMERS_SUB_PARAMS)[number]

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
}

export const CUSTOMERS_PERIOD_OPTIONS = [
    { value: 'month', label: 'ماه' },
    { value: 'week', label: 'هفته' },
    { value: 'today', label: 'امروز' },
] as const

export const sectionToHeading: Record<string, SectionHeading | null> = {
    dashboard: {
        title: 'داشبورد مشتریان',
        subtitle: 'نمای کلی مشتریان و درخواست‌ها',
        showPeriodToggle: true,
        showDateRange: true,
        buttons: [
            {
                label: 'ثبت مشتری جدید',
                icon: 'addSm400Broken',
                href: '/admin/customers/new',
                variant: 'primary',
            },
        ],
    },
    list: {
        title: 'لیست مشتریان',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'export300Linear',
                variant: 'outline',
            },
            {
                label: 'ایجاد گروه جدید',
                icon: 'addSm400Broken',
                href: '/admin/customers/newGroup',
                variant: 'outline',
            },
            {
                label: 'ثبت مشتری جدید',
                icon: 'addSm400Broken',
                href: '/admin/customers/new',
                variant: 'primary',
            },
        ],
    },
    requests: {
        title: 'لیست درخواست ها',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'export300Linear',
                variant: 'outline',
            },
            {
                label: 'ثبت مشتری جدید',
                icon: 'addSm400Broken',
                href: '/admin/customers/new',
                variant: 'primary',
            },
        ],
    },
    new: {
        title: 'مشتری جدید',
        subtitle: 'ثبت مشتری جدید',
    },
    newGroup: {
        title: 'گروه جدید',
        subtitle: 'ایجاد گروه مشتریان',
    },
    customerGroupDetails: {
        title: 'جزئیات گروه',
        subtitle: 'مشاهده مشخصات گروه مشتریان',
    },
    groupDetails: {
        title: 'جزئیات گروه',
        subtitle: 'مشاهده مشخصات گروه مشتریان',
        buttons: [
            {
                label: 'ایجاد گروه جدید',
                icon: 'addSm400Broken',
                href: '/admin/customers/newGroup',
                variant: 'outline',
            },
        ],
    },
    details: null,
}

export const getCustomersSectionKey = (sub: string): CustomersSubParam =>
    CUSTOMERS_SUB_PARAMS.includes(sub as CustomersSubParam)
        ? (sub as CustomersSubParam)
        : 'dashboard'

export const getCustomersSectionKeyFromPath = (
    pathname: string,
    searchParams: Pick<URLSearchParams, 'get'>
): string | null => {
    if (pathname.startsWith('/admin/customers/newGroup')) return 'newGroup'
    if (pathname.startsWith('/admin/customers/new')) return 'new'
    if (pathname.startsWith('/admin/customers/groupDetails/')) {
        return 'groupDetails'
    }
    if (pathname.startsWith('/admin/customers/customerGroupDetails/')) {
        return 'customerGroupDetails'
    }
    if (pathname.startsWith('/admin/customers/') && pathname !== '/admin/customers/') {
        return 'details'
    }

    const sub = searchParams.get('sub')
    if (!sub) return 'dashboard'

    return CUSTOMERS_SUB_PARAMS.includes(sub as CustomersSubParam) ? sub : 'dashboard'
}

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'name', header_label: 'نام و نام خانوادگی', isChecked: true },
    { id: 'customerId', header_label: 'شناسه مشتری', isChecked: true },
    { id: 'level', header_label: 'سطح کاربر', isChecked: true },
    { id: 'credit', header_label: 'سقف اعتبار', isChecked: true },
    { id: 'phone', header_label: 'شماره تماس', isChecked: true },
    { id: 'email', header_label: 'ایمیل', isChecked: true },
    { id: 'actions', header_label: '', isChecked: true, className: 'w-[1%]' },
]

export const REQUEST_TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'requestId', header_label: 'شناسه درخواست', isChecked: true },
    { id: 'customer', header_label: 'مشتری', isChecked: true },
    { id: 'level', header_label: 'سطح کاربر', isChecked: true },
    { id: 'nationalId', header_label: 'کد ملی', isChecked: true },
    { id: 'licenseNumber', header_label: 'شماره پروانه', isChecked: true },
    { id: 'status', header_label: 'وضعیت', isChecked: true },
    { id: 'actions', header_label: '', isChecked: true, className: 'w-[1%]' },
]
