import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "col-0", header_label: "عنوان کالا", isChecked: true },
    { id: "col-1", header_label: "شناسه کالا", isChecked: true },
    { id: "col-2", header_label: "برند", isChecked: true },
    { id: "col-3", header_label: "دسته‌بندی", isChecked: true },
    { id: "col-4", header_label: "موجودی", isChecked: true },
    { id: "col-5", header_label: "انبار مربوطه", isChecked: true },
    { id: "actions-0", header_label: "", isChecked: true },
    { id: "actions-1", header_label: "", isChecked: true },
    { id: "actions-2", header_label: "", isChecked: true },
]
