import { IconLabel } from '@/src/shared/types/icon'
import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import type { SubSidebarSection } from '@/src/shared/components/sidebar/content/types'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useModalStore } from '@/src/shared/store/modal-store'
import { excelTemplates } from './excelTemplate'

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
    hasBackButton?: boolean
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
                action: () =>
                    useModalStore.getState().openModal(ModalTypes.EXCEL_OUTPUT, {
                        columns: excelTemplates.list,
                        getData: () => [
                            {
                                name: 'آیدا میرزایی',
                                id: 'CU-7362',
                                level: 'طلایی',
                                credit: 200000000,
                                phone: '+98 912 673 4123',
                                email: 'aida@gmail.com',
                            },
                            {
                                name: 'سارا احمدی',
                                id: 'CU-7363',
                                level: 'نقره‌ای',
                                credit: 85000000,
                                phone: '+98 935 120 8845',
                                email: 'sara@gmail.com',
                            },
                        ],
                    }),
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
                action: () =>
                    useModalStore.getState().openModal(ModalTypes.EXCEL_OUTPUT, {
                        columns: excelTemplates.request,
                        getData: () => [
                            {
                                id: 'RQT-0191',
                                name: 'آرام محمدی',
                                level: 'نقره‌ای',
                                nationalId: '0581234567',
                                licenseNumber: '0228452',
                                status: 'رد شده',
                            },
                        ],
                    }),
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
        hasBackButton: true,
    },
    groupDetails: {
        title: 'جزئیات گروه',
        subtitle: 'مشاهده مشخصات گروه مشتریان',
        hasBackButton: true,
        buttons: [
            {
                label: 'ایجاد گروه جدید',
                icon: 'addSm400Broken',
                href: '/admin/customers/newGroup',
                variant: 'outline',
            },
        ],
    },
    details: {
        title: 'جزئیات مشتری',
        hasBackButton: true,
        buttons: [
            {
                label: 'تخصیص بازاریاب',
                icon: 'account400Linear',
                variant: 'outline',
            },
            {
                label: 'ویرایش پروفایل',
                icon: 'editSquare400Linear',
                variant: 'primary',
                action: () =>
                    useModalStore
                        .getState()
                        .openModal(ModalTypes.EDIT_CUSTOMER),
            },
        ],
    },
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
