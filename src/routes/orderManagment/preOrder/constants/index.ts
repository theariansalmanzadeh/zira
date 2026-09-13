import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "preOrderId", header_label: "شناسه پیش‌سفارش", isChecked: true },
    { id: "customer", header_label: "مشتری", isChecked: true },
    { id: "registeredAt", header_label: "تاریخ ثبت", isChecked: true },
    { id: "product", header_label: "کالا", isChecked: true },
    { id: "quantity", header_label: "تعداد", isChecked: true },
    { id: "settlementType", header_label: "نوع تسویه", isChecked: true },
    { id: "status", header_label: "وضعیت", isChecked: true },
    { id: "actions", header_label: "", isChecked: true },
]
