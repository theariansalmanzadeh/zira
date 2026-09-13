import type { DepartmentDetails, DepartmentExpert } from './types'

export const DEFAULT_DEPARTMENT_DETAILS: DepartmentDetails = {
    name: 'مالی',
    id: 'DP-5318_92',
    section: 'مالی',
    managerName: 'مهرا آذرآیین',
    slaResponse: '۱ ساعت',
    responseHours: '09:00 - 18:00',
    status: 'فعال',
    description: 'رسیدگی به تیکت‌های تسویه، چک، اعتبار و فاکتورهای مشتریان.',
}

export const DEFAULT_DEPARTMENT_EXPERTS: DepartmentExpert[] = [
    { userName: 'نام کاربر', userId: 'PR0239', status: 'active' },
    { userName: 'نام کاربر', userId: 'PR0240', status: 'active' },
    { userName: 'نام کاربر', userId: 'PR0241', status: 'inactive' },
]

export const SIDEBAR_ITEMS = [
    { id: 'details' as const, label: 'مشخصات' },
    { id: 'experts' as const, label: 'کارشناسان' },
]
