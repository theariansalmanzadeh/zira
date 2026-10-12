import { DropdownOption } from "@/src/routes/catalog/addProducts/types"

export const DISPLAY_STATUS_OPTIONS: DropdownOption[] = [
    { label: 'به زودی', value: 'coming-soon' },
    { label: 'فعال', value: 'active' },
    { label: 'غیرفعال', value: 'inactive' },
]

export const ACCUMULATION_CEILING_OPTIONS: DropdownOption[] = [
    { label: '۱۰ عدد', value: '10' },
    { label: '۲۰ عدد', value: '20' },
    { label: '۵۰ عدد', value: '50' },
]

export const PURCHASE_THRESHOLD_OPTIONS: DropdownOption[] = [
    { label: '۵ عدد', value: '5' },
    { label: '۱۰ عدد', value: '10' },
    { label: '۱۵ عدد', value: '15' },
]