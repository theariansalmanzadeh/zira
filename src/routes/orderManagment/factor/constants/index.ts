import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "invoiceId", header_label: "شماره فاکتور", isChecked: true },
    { id: "customerName", header_label: "نام مشتری", isChecked: true },
    { id: "customerCode", header_label: "کد مشتری", isChecked: true },
    { id: "itemsCount", header_label: "اقلام سفارش", isChecked: true },
    { id: "issuedAt", header_label: "تاریخ صدور", isChecked: true },
    { id: "amount", header_label: "مبلغ فاکتور (تومان)", isChecked: true, className: "text-left" },
    { id: "settlementType", header_label: "نوع تسویه", isChecked: true, className: "text-center" },
    { id: "settlementDate", header_label: "تاریخ تسویه", isChecked: true },
    { id: "print", header_label: "چاپ", isChecked: true, className: "text-center" },
    { id: "actions", header_label: "", isChecked: true },
]
