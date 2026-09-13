import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "ticketId", header_label: "شناسه تیکت", isChecked: true },
    { id: "contact", header_label: "مخاطب", isChecked: true },
    { id: "subject", header_label: "موضوع", isChecked: true },
    { id: "department", header_label: "دپارتمان", isChecked: true },
    { id: "status", header_label: "وضعیت", isChecked: true },
    { id: "lastActivity", header_label: "آخرین فعالیت", isChecked: true },
    { id: "actions", header_label: "", isChecked: true, className: "w-[1%]" },
]
