import { DropdownOption } from "@/src/routes/categories/addProducts/types"

export const MAIN_CATEGORY_OPTIONS: DropdownOption[] = [
    { label: 'لباس زیر زنانه', value: 'women-underwear' },
    { label: 'لباس خواب', value: 'sleepwear' },
    { label: 'لباس ورزشی', value: 'sportswear' },
]

export const SUB_CATEGORY_OPTIONS: DropdownOption[] = [
    { label: 'بادی', value: 'bodysuit' },
    { label: 'سوتین', value: 'bra' },
    { label: 'شورت', value: 'shorts' },
]

export const BRAND_OPTIONS: DropdownOption[] = [
    { label: 'Lorenzo', value: 'lorenzo' },
    { label: 'Victoria', value: 'victoria' },
    { label: 'Calvin Klein', value: 'calvin-klein' },
]

export const SUPPLIER_OPTIONS: DropdownOption[] = [
    { label: 'تأمین‌کننده ۱', value: 'supplier-1' },
    { label: 'تأمین‌کننده ۲', value: 'supplier-2' },
    { label: 'تأمین‌کننده ۳', value: 'supplier-3' },
]

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