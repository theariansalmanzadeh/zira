import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "id", header_label: "شناسه", isChecked: true },
    { id: "userName", header_label: "نام کاربر", isChecked: true },
    { id: "userCode", header_label: "کد کاربر", isChecked: true },
    { id: "roles", header_label: "نقش‌ها", isChecked: true },
    { id: "permissions", header_label: "دسترسی‌ها", isChecked: true },
    { id: "status", header_label: "وضعیت", isChecked: true },
    { id: "actions", header_label: "", isChecked: true, className: "w-[1%]" },
]
