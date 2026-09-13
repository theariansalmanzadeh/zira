import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "id", header_label: "شناسه", isChecked: true },
    { id: "registeredAt", header_label: "تاریخ ثبت", isChecked: true },
    { id: "customer", header_label: "مشتری", isChecked: true },
    { id: "warehouse", header_label: "انبار", isChecked: true },
    { id: "totalAmount", header_label: "مبلغ کل (تومان)", isChecked: true },
    { id: "settlementType", header_label: "نوع تسویه", isChecked: true },
    { id: "settlementStatus", header_label: "وضعیت تسویه", isChecked: true },
    { id: "print", header_label: "", isChecked: true },
    { id: "actions", header_label: "", isChecked: true },
]
