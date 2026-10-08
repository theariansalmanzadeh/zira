import type { SelectRoleItem } from '../types'

export const DEFAULT_ROLES: SelectRoleItem[] = [
    {
        id: 'role-1',
        name: 'مدیر سیستم',
        slug: 'system_admin',
        category: 'مدیریت',
        memberCount: 1,
    },
    {
        id: 'role-2',
        name: 'مدیر فروش',
        slug: 'sales_manager',
        category: 'فروش',
        memberCount: 2,
    },
    {
        id: 'role-3',
        name: 'کارشناس انبار',
        slug: 'warehouse_staff',
        category: 'انبار',
        memberCount: 2,
    },
    {
        id: 'role-4',
        name: 'پشتیبان',
        slug: 'support_agent',
        category: 'پشتیبانی',
        memberCount: 4,
    },
    {
        id: 'role-5',
        name: 'مدیر مالی',
        slug: 'finance_manager',
        category: 'مالی',
        memberCount: 1,
    },
]
