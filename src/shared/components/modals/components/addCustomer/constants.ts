import type { CustomerLevel } from '@/src/routes/customers/components/TableRow'

export type AddCustomerRow = {
    id: string
    name: string
    level: CustomerLevel
    credit: number
    phone: string
    email: string
}

export type AddCustomerModalData = {
    selectedIds?: string[]
    hasGroup?: boolean
    onChange?: (customers: AddCustomerRow[]) => void
}

export const LEVEL_CONFIG: Record<
    CustomerLevel,
    { text: string; variant: 'warning' | 'tonal' | 'outlined' }
> = {
    gold: { text: 'طلایی', variant: 'warning' },
    silver: { text: 'نقره‌ای', variant: 'tonal' },
    bronze: { text: 'برنزی', variant: 'outlined' },
}

export const LEVEL_OPTIONS = [
    { label: 'همه', value: 'all' },
    { label: 'طلایی', value: 'gold' },
    { label: 'نقره‌ای', value: 'silver' },
    { label: 'برنزی', value: 'bronze' },
]

export const ADD_CUSTOMER_DUMMY: AddCustomerRow[] = [
    {
        id: 'CU-7362',
        name: 'آیدا میرزایی',
        level: 'gold',
        credit: 200000000,
        phone: '+98 912 673 4123',
        email: 'aida@gmail.com',
    },
    {
        id: 'CU-7363',
        name: 'سارا احمدی',
        level: 'silver',
        credit: 85000000,
        phone: '+98 935 120 8845',
        email: 'sara@gmail.com',
    },
    {
        id: 'CU-7364',
        name: 'رضا کریمی',
        level: 'bronze',
        credit: 42000000,
        phone: '+98 910 772 0098',
        email: 'reza@gmail.com',
    },
    {
        id: 'CU-7365',
        name: 'بهرام اکبری',
        level: 'gold',
        credit: 150000000,
        phone: '+98 912 441 2201',
        email: 'bahram@gmail.com',
    },
]

export const TABLE_HEADERS = [
    '',
    'نام و نام خانوادگی',
    'شناسه مشتری',
    'سطح کاربر',
    'سقف اعتبار',
    'شماره تماس',
] as const

export type GroupStatus = 'active' | 'diactive'

export type AddCustomerGroupRow = {
    id: string
    name: string
    code: string
    status: GroupStatus
}

export const GROUP_STATUS_CONFIG: Record<
    GroupStatus,
    { text: string; variant: 'success' | 'tonal' }
> = {
    active: { text: 'فعال', variant: 'success' },
    diactive: { text: 'غیرفعال', variant: 'tonal' },
}

export const GROUP_TABLE_HEADERS = ['نام گروه', 'شناسه', 'وضعیت'] as const

export const ADD_CUSTOMER_GROUP_DUMMY: AddCustomerGroupRow[] = [
    { id: 'g-1', name: 'مشتریان طلایی', code: 'GR-1102', status: 'active' },
    { id: 'g-2', name: 'مشتریان نقره‌ای', code: 'GR-1103', status: 'active' },
    { id: 'g-3', name: 'همکاران عمده', code: 'GR-1108', status: 'diactive' },
    { id: 'g-4', name: 'مشتریان جدید', code: 'GR-1114', status: 'active' },
]
