import type { FormDropdownOption } from '@/src/shared/components/ui/FormDropdown'

export const CREDIT_RELATED_OPTIONS: FormDropdownOption[] = [
    { label: 'اعتبار چکی', value: 'cheque-credit' },
    { label: 'اعتبار طلایی', value: 'gold-credit' },
]

export const BANK_OPTIONS: FormDropdownOption[] = [
    { label: 'بانک ملت', value: 'mellat' },
    { label: 'بانک ملی', value: 'melli' },
    { label: 'بانک صادرات', value: 'saderat' },
    { label: 'بانک پاسارگاد', value: 'pasargad' },
]

export const GUARANTEE_STATUS_OPTIONS: FormDropdownOption[] = [
    { label: 'فعال', value: 'active' },
    { label: 'در انتظار تایید', value: 'pending' },
    { label: 'غیرفعال', value: 'inactive' },
]
