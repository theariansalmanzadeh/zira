import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "col-0", header_label: "شناسه انتقال", isChecked: true },
    { id: "col-1", header_label: "مسیر (مبدا ← مقصد)", isChecked: true },
    { id: "col-2", header_label: "تعداد اقلام", isChecked: true },
    { id: "col-3", header_label: "وضعیت", isChecked: true },
    { id: "col-4", header_label: "زمان", isChecked: true },
    { id: "actions-0", header_label: "", isChecked: true },
]
