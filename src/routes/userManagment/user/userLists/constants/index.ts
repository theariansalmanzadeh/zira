import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import type { UserStatus } from '../../../utils'

export type UserListRowData = {
    id: string
    personnelCode: string
    firstName: string
    lastName: string
    mobile: string
    role: string
    status: UserStatus
    lastLogin: string
}

export const USER_LIST_TOGGLE_BUTTONS = [
    { label: 'همه', value: 'all' },
    { label: 'فعال', value: 'active' },
    { label: 'غیرفعال', value: 'inactive' },
    { label: 'قفل', value: 'locked' },
] as const

export const USER_LIST_TABLE_COLUMNS: TableFilterItem[] = [
    { id: 'personnelCode', header_label: 'کد پرسنلی', isChecked: true },
    { id: 'firstName', header_label: 'نام', isChecked: true },
    { id: 'lastName', header_label: 'نام خانوادگی', isChecked: true },
    { id: 'mobile', header_label: 'موبایل ۱', isChecked: true },
    { id: 'role', header_label: 'نقش', isChecked: true },
    { id: 'status', header_label: 'وضعیت', isChecked: true },
    { id: 'lastLogin', header_label: 'آخرین ورود', isChecked: true },
    { id: 'actions-0', header_label: '', isChecked: true },
    { id: 'actions-1', header_label: '', isChecked: true },
]

export const USER_LIST_DUMMY: UserListRowData[] = [
    {
        id: 'user-1',
        personnelCode: 'PR-1024',
        firstName: 'علی',
        lastName: 'محمدی',
        mobile: '۰۹۱۲۳۴۵۶۷۸۹',
        role: 'مدیر سیستم',
        status: 'active',
        lastLogin: '۱۴۰۴/۱۲/۰۱ - ۱۴:۳۰',
    },
    {
        id: 'user-2',
        personnelCode: 'PR-1025',
        firstName: 'سارا',
        lastName: 'احمدی',
        mobile: '۰۹۳۵۱۲۰۸۸۴۵',
        role: 'کارشناس فروش',
        status: 'inactive',
        lastLogin: '۱۴۰۴/۱۱/۲۰ - ۰۹:۱۵',
    },
    {
        id: 'user-3',
        personnelCode: 'PR-1026',
        firstName: 'رضا',
        lastName: 'کریمی',
        mobile: '۰۹۱۰۷۷۲۰۰۹۸',
        role: 'انباردار',
        status: 'locked',
        lastLogin: '۱۴۰۴/۱۰/۱۲ - ۱۸:۴۰',
    },
    {
        id: 'user-4',
        personnelCode: 'PR-1027',
        firstName: 'مریم',
        lastName: 'حسینی',
        mobile: '۰۹۱۲۴۴۸۲۲۰۱',
        role: 'پشتیبانی',
        status: 'active',
        lastLogin: '۱۴۰۴/۱۲/۰۵ - ۱۱:۰۵',
    },
]
