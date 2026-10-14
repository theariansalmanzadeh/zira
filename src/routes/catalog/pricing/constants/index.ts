import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'name', header_label: 'نام لیست', isChecked: true },
    { id: 'type', header_label: 'نوع', isChecked: true },
    { id: 'code', header_label: 'کد', isChecked: true },
    { id: 'validity', header_label: 'بازه اعتبار', isChecked: true },
    { id: 'status', header_label: 'وضعیت', isChecked: true },
    { id: 'actions', header_label: '', isChecked: true, className: 'w-[1%]' },
]
