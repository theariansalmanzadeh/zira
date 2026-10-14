import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'name', header_label: 'دپارتمان', isChecked: true },
    { id: 'code', header_label: 'شناسه', isChecked: true },
    { id: 'manager', header_label: 'مسئول', isChecked: true },
    { id: 'sla', header_label: 'پاسخ SLA', isChecked: true },
    { id: 'actions', header_label: '', isChecked: true, className: 'w-[1%]' },
]
