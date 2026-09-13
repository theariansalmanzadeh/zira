import type { FormDropdownOption } from '@/src/shared/components/ui/FormDropdown'

export const PHONE_PLACEHOLDER = '+98 --- ---- ---'

export const GENDER_OPTIONS: FormDropdownOption[] = [
    { label: 'مرد', value: 'male' },
    { label: 'زن', value: 'female' },
]

export const MARITAL_STATUS_OPTIONS: FormDropdownOption[] = [
    { label: 'مجرد', value: 'single' },
    { label: 'متاهل', value: 'married' },
]

export const EDUCATION_OPTIONS: FormDropdownOption[] = [
    { label: 'دیپلم', value: 'diploma' },
    { label: 'کارشناسی', value: 'bachelor' },
    { label: 'کارشناسی ارشد', value: 'master' },
    { label: 'دکتری', value: 'phd' },
]

export const PROVINCE_OPTIONS: FormDropdownOption[] = [
    { label: 'تهران', value: 'tehran' },
    { label: 'اصفهان', value: 'isfahan' },
    { label: 'فارس', value: 'fars' },
]

export const CITY_OPTIONS: FormDropdownOption[] = [
    { label: 'تهران', value: 'tehran' },
    { label: 'کرج', value: 'karaj' },
    { label: 'شیراز', value: 'shiraz' },
]
