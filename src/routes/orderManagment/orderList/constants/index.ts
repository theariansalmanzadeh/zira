import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "orderId", header_label: "شناسه سفارش", isChecked: true },
    { id: "customer", header_label: "مشتری", isChecked: true },
    { id: "registeredAt", header_label: "تاریخ ثبت", isChecked: true },
    { id: "itemsCount", header_label: "اقلام", isChecked: true },
    { id: "totalAmount", header_label: "جمع کل (تومان)", isChecked: true },
    { id: "settlementType", header_label: "نوع تسویه", isChecked: true },
    { id: "status", header_label: "وضعیت", isChecked: true },
    { id: "actions", header_label: "", isChecked: true },
]
