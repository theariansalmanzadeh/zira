import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export type DepartmentUserRow = {
    id: string
    display_name: string
}

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'id', header_label: 'شناسه', isChecked: true },
    { id: 'display_name', header_label: 'نام کاربر', isChecked: true },
    { id: 'actions', header_label: '', isChecked: true, className: 'w-[1%]' },
]

export const DEPARTMENT_USERS_TAB = [{ label: 'کاربران', value: 'users' }]
