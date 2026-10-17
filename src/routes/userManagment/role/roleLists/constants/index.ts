import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import type { VariantProps } from 'class-variance-authority'
import type { PillVariants } from '@/src/shared/components/ui/Pill'

export type RoleType = 'system' | 'custom'
export type RoleStatus = 'active' | 'inactive'

export type RoleListRowData = {
    id: string
    code: string
    name: string
    department: string
    type: RoleType
    status: RoleStatus
    createdAt: string
}

type PillVariant = NonNullable<VariantProps<typeof PillVariants>['variant']>

export const ROLE_TYPE_CONFIG: Record<
    RoleType,
    { label: string; variant: PillVariant }
> = {
    system: { label: 'سیستمی', variant: 'info' },
    custom: { label: 'سفارشی', variant: 'tonal' },
}

export const ROLE_STATUS_CONFIG: Record<
    RoleStatus,
    { label: string; variant: PillVariant }
> = {
    active: { label: 'فعال', variant: 'success' },
    inactive: { label: 'غیرفعال', variant: 'tonal' },
}

export const ROLE_LIST_TABLE_COLUMNS: TableFilterItem[] = [
    { id: 'code', header_label: 'کد نقش', isChecked: true },
    { id: 'name', header_label: 'نام نقش', isChecked: true },
    { id: 'department', header_label: 'دپارتمان', isChecked: true },
    { id: 'type', header_label: 'نوع', isChecked: true },
    { id: 'status', header_label: 'وضعیت', isChecked: true },
    { id: 'createdAt', header_label: 'تاریخ ایجاد', isChecked: true },
    { id: 'actions', header_label: '', isChecked: true, className: 'w-[1%]' },
]

export const ROLE_LIST_DUMMY: RoleListRowData[] = [
    {
        id: 'role-1',
        code: 'system_admin',
        name: 'مدیر سیستم',
        department: 'مدیریت',
        type: 'system',
        status: 'active',
        createdAt: '2025-11-01T10:00:00.000Z',
    },
    {
        id: 'role-2',
        code: 'sales_manager',
        name: 'مدیر فروش',
        department: 'فروش',
        type: 'custom',
        status: 'active',
        createdAt: '2025-11-12T08:30:00.000Z',
    },
    {
        id: 'role-3',
        code: 'warehouse_staff',
        name: 'کارشناس انبار',
        department: 'انبار',
        type: 'custom',
        status: 'inactive',
        createdAt: '2025-10-20T14:15:00.000Z',
    },
    {
        id: 'role-4',
        code: 'support_agent',
        name: 'پشتیبان',
        department: 'پشتیبانی',
        type: 'system',
        status: 'active',
        createdAt: '2025-09-05T09:45:00.000Z',
    },
]
