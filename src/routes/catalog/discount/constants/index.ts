import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "col-0", header_label: "عبارت کد", isChecked: true },
    { id: "col-1", header_label: "دامنهٔ محصول", isChecked: true },
    { id: "col-2", header_label: "دامنهٔ مشتری", isChecked: true },
    { id: "col-3", header_label: "درصد", isChecked: true },
    { id: "col-4", header_label: "شروع اعتبار", isChecked: true },
    { id: "col-5", header_label: "پایان اعتبار", isChecked: true },
    { id: "col-6", header_label: "روزهای باقی‌مانده", isChecked: true },
    { id: "col-7", header_label: "وضعیت", isChecked: true },
    { id: "actions-0", header_label: "", isChecked: true },
]
