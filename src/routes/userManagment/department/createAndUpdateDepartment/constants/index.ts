import { FormDropdownOption } from "@/src/shared/components/ui/FormDropdown"

export const RELATED_SECTION_OPTIONS: FormDropdownOption[] = [
    { label: 'پشتیبانی مالی', value: 'financial' },
    { label: 'فنی', value: 'technical' },
    { label: 'انبار', value: 'warehouse' },
]

export const MANAGER_OPTIONS: FormDropdownOption[] = [
    { label: 'نام کاربر ۱', value: 'user-1' },
    { label: 'نام کاربر ۲', value: 'user-2' },
    { label: 'نام کاربر ۳', value: 'user-3' },
]

export const SLA_OPTIONS: FormDropdownOption[] = [
    { label: '۱ ساعت', value: '1h' },
    { label: '۴ ساعت', value: '4h' },
    { label: '۲۴ ساعت', value: '24h' },
]

export const TIME_OPTIONS: FormDropdownOption[] = [
    { label: '08:00', value: '08:00' },
    { label: '09:00', value: '09:00' },
    { label: '12:00', value: '12:00' },
    { label: '18:00', value: '18:00' },
    { label: '20:00', value: '20:00' },
]