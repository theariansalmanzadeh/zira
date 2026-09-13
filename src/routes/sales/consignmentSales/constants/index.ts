import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "id", header_label: "شناسه", isChecked: true },
    { id: "date", header_label: "تاریخ", isChecked: true },
    { id: "customer", header_label: "مشتری", isChecked: true },
    { id: "items", header_label: "اقلام", isChecked: true },
    { id: "totalAmount", header_label: "مبلغ کل (تومان)", isChecked: true },
    { id: "returnDate", header_label: "تاریخ عودت", isChecked: true },
    { id: "print", header_label: "", isChecked: true },
    { id: "actions", header_label: "", isChecked: true },
]
