import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "col-0", header_label: "شماره سند", isChecked: true },
    { id: "col-1", header_label: "تاریخ", isChecked: true },
    { id: "col-2", header_label: "شرح", isChecked: true },
    { id: "col-3", header_label: "بدهکار", isChecked: true },
    { id: "col-4", header_label: "بستانکار", isChecked: true },
    { id: "col-5", header_label: "نوع", isChecked: true },
    { id: "col-6", header_label: "وضعیت", isChecked: true },
    { id: "actions-0", header_label: "", isChecked: true },
    { id: "actions-1", header_label: "", isChecked: true },
    { id: "actions-2", header_label: "", isChecked: true },
]
