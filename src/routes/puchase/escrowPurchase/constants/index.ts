import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "col-0", header_label: "شناسه", isChecked: true },
    { id: "col-1", header_label: "تاریخ ثبت", isChecked: true },
    { id: "col-2", header_label: "تامین‌کننده", isChecked: true },
    { id: "col-3", header_label: "اقلام", isChecked: true },
    { id: "col-4", header_label: "انبار", isChecked: true },
    { id: "col-5", header_label: "تاریخ عودت", isChecked: true },
    { id: "actions-0", header_label: "", isChecked: true },
    { id: "actions-1", header_label: "", isChecked: true },
]
