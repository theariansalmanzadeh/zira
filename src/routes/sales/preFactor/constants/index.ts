import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "id", header_label: "شناسه", isChecked: true },
    { id: "registeredAt", header_label: "تاریخ ثبت", isChecked: true },
    { id: "customer", header_label: "مشتری", isChecked: true },
    { id: "validUntil", header_label: "تاریخ اعتبار", isChecked: true },
    { id: "totalAmount", header_label: "مبلغ کل (تومان)", isChecked: true },
    { id: "status", header_label: "وضعیت", isChecked: true },
    { id: "print", header_label: "", isChecked: true },
    { id: "actions", header_label: "", isChecked: true },
]
