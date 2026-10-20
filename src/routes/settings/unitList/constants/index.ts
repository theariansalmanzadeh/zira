import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export type UnitStatus = 'all' | 'active' | 'inactive'

export type UnitListItem = {
    id: string
    code: string
    name: string
    factor: number
    base_unit_name: string
    is_base: boolean
    is_active: boolean
}

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'col-0', header_label: 'کد', isChecked: true },
    { id: 'col-1', header_label: 'نام', isChecked: true },
    { id: 'col-2', header_label: 'ضریب', isChecked: true },
    { id: 'col-3', header_label: 'واحد پایه', isChecked: true },
    { id: 'col-4', header_label: 'پایه', isChecked: true },
    { id: 'col-5', header_label: 'وضعیت', isChecked: true },
    { id: 'actions-0', header_label: '', isChecked: true },
]
