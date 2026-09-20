import type { FormDropdownOption } from '@/src/shared/components/ui/FormDropdown'

export const INVENTORY_STEPS = [
    { step: 1, label: 'اطلاعات کلی' },
    { step: 2, label: 'مسئول انبار' },
    { step: 3, label: 'نقشه انبار — ویزارد آدرس‌دهی' },
] as const

export const MANAGER_OPTIONS: FormDropdownOption[] = [
    { label: 'رضا کاظمی', value: 'reza-kazemi' },
    { label: 'مریم احمدی', value: 'maryam-ahmadi' },
    { label: 'علی رضایی', value: 'ali-rezaei' },
]

export const INSURANCE_STATUS_OPTIONS: FormDropdownOption[] = [
    { label: 'دارای بیمه معتبر', value: 'insured' },
    { label: 'بدون بیمه', value: 'uninsured' },
]

export const WAREHOUSE_STATUS_OPTIONS: FormDropdownOption[] = [
    { label: 'فعال', value: 'active' },
    { label: 'غیرفعال', value: 'inactive' },
]

export const DEFAULT_WAREHOUSE_CODE = 'WH-1005'
