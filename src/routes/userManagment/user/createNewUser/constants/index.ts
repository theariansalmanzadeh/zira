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

export const BANK_OPTIONS: FormDropdownOption[] = [
    { label: 'ملی', value: 'melli' },
    { label: 'ملت', value: 'mellat' },
    { label: 'صادرات', value: 'saderat' },
    { label: 'تجارت', value: 'tejarat' },
    { label: 'پارسیان', value: 'parsian' },
    { label: 'پاسارگاد', value: 'pasargad' },
]

export const USER_TYPE_OPTIONS: FormDropdownOption[] = [
    { label: 'کارمند', value: 'STAFF' },
    { label: 'مدیر ارشد', value: 'SUPERADMIN' },
]

export const REQUIRED_DOCUMENT_SLOTS = [
    { label: 'شناسنامه صفحه ۱', value: 'BIRTH_CERTIFICATE_PAGE_1' },
    { label: 'شناسنامه صفحه ۲', value: 'BIRTH_CERTIFICATE_PAGE_2' },
    { label: 'شناسنامه صفحه ۳', value: 'BIRTH_CERTIFICATE_PAGE_3' },
    { label: 'شناسنامه صفحه ۴', value: 'BIRTH_CERTIFICATE_PAGE_4' },
    { label: 'قرارداد', value: 'CONTRACT' },
    { label: 'ضمانت', value: 'GUARANTEE' },
] as const

export const USER_ROLE_OPTIONS: FormDropdownOption[] = [
    { label: 'مدیر سیستم', value: 'system_admin' },
    { label: 'مدیر فروش', value: 'sales_manager' },
    { label: 'کارشناس', value: 'expert' },
    { label: 'اپراتور', value: 'operator' },
]

export const ACCOUNT_STATUS_OPTIONS: FormDropdownOption[] = [
    { label: 'فعال', value: 'active' },
    { label: 'غیرفعال', value: 'inactive' },
    { label: 'قفل', value: 'locked' },
]

export const DEPARTMENT_OPTIONS: FormDropdownOption[] = [
    { label: 'پشتیبانی مالی', value: 'financial_support' },
    { label: 'فنی', value: 'technical' },
    { label: 'فروش', value: 'sales' },
    { label: 'انبار', value: 'warehouse' },
]

export const MANAGER_OPTIONS: FormDropdownOption[] = [
    { label: 'علی رضایی', value: 'user-1' },
    { label: 'سارا احمدی', value: 'user-2' },
    { label: 'حسین کریمی', value: 'user-3' },
]

export const BRANCH_OPTIONS: FormDropdownOption[] = [
    { label: 'شعبه ونک', value: 'vanak' },
    { label: 'شعبه سعادت‌آباد', value: 'saadat' },
    { label: 'شعبه مرکزی', value: 'central' },
]
