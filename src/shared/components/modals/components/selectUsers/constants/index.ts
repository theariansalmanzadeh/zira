import type { FormDropdownOption } from '@/src/shared/components/ui/FormDropdown'
import type { SelectAnnouncementUserItem } from '../types'

export const ROLE_FILTER_OPTIONS: FormDropdownOption[] = [
    { label: 'همه نقش‌ها', value: 'all' },
    { label: 'مدیر سیستم', value: 'system_admin' },
    { label: 'مدیر فروش', value: 'sales_manager' },
    { label: 'کارشناس انبار', value: 'warehouse_staff' },
    { label: 'پشتیبان', value: 'support_agent' },
]

export const BRANCH_FILTER_OPTIONS: FormDropdownOption[] = [
    { label: 'همه شعب', value: 'all' },
    { label: 'شعبه ونک', value: 'vanak' },
    { label: 'شعبه سعادت‌آباد', value: 'saadat' },
    { label: 'شعبه مرکزی', value: 'central' },
]

export const AVATAR_COLORS = [
    'bg-error-container text-on-error-container',
    'bg-info-container text-on-info-container',
    'bg-warning-container text-on-warning-container',
    'bg-success-container text-on-success-container',
    'bg-primary-container text-on-primary-container',
] as const

export const DEFAULT_USERS: SelectAnnouncementUserItem[] = [
    {
        id: 'user-1',
        name: 'علی رضایی',
        personnelCode: 'PR2391',
        role: 'مدیر سیستم',
        roleId: 'system_admin',
        branch: 'همه شعب',
        branchId: 'all',
        status: 'active',
        phone: '09120000001',
    },
    {
        id: 'user-2',
        name: 'سارا احمدی',
        personnelCode: 'PR2402',
        role: 'مدیر فروش',
        roleId: 'sales_manager',
        branch: 'شعبه ونک',
        branchId: 'vanak',
        status: 'active',
        phone: '09120000002',
    },
    {
        id: 'user-3',
        name: 'مریم حسینی',
        personnelCode: 'PR2410',
        role: 'کارشناس انبار',
        roleId: 'warehouse_staff',
        branch: 'شعبه سعادت‌آباد',
        branchId: 'saadat',
        status: 'inactive',
        phone: '09120000003',
    },
    {
        id: 'user-4',
        name: 'حسین کریمی',
        personnelCode: 'PR2418',
        role: 'پشتیبان',
        roleId: 'support_agent',
        branch: 'شعبه مرکزی',
        branchId: 'central',
        status: 'active',
        phone: '09120000004',
    },
    {
        id: 'user-5',
        name: 'نیما موسوی',
        personnelCode: 'PR2425',
        role: 'مدیر فروش',
        roleId: 'sales_manager',
        branch: 'شعبه ونک',
        branchId: 'vanak',
        status: 'active',
        phone: '09120000005',
    },
    {
        id: 'user-6',
        name: 'زهرا نوری',
        personnelCode: 'PR2431',
        role: 'پشتیبان',
        roleId: 'support_agent',
        branch: 'همه شعب',
        branchId: 'all',
        status: 'inactive',
        phone: '09120000006',
    },
]
