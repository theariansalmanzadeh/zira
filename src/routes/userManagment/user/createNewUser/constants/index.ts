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

export const USER_TYPE_OPTIONS: FormDropdownOption[] = [
    { label: 'کارمند', value: 'STAFF' },
    { label: 'مدیر ارشد', value: 'SUPERADMIN' },
]

export const STAFF_DOCUMENT_SLOTS = [
    'BIRTH_CERTIFICATE_PAGE_1',
    'BIRTH_CERTIFICATE_PAGE_2',
    'BIRTH_CERTIFICATE_PAGE_3',
    'BIRTH_CERTIFICATE_PAGE_4',
    'CONTRACT',
    'EDUCATIONAL_DEGREE',
    'GUARANTEE',
    'NATIONAL_CARD',
    'OTHER',
    'PERSONNEL_PHOTO',
    'POSTAL_CODE_CONFIRMATION',
    'TRAINING_CERTIFICATE',
] as const

export type StaffDocumentSlot = (typeof STAFF_DOCUMENT_SLOTS)[number]

export const DOCUMENT_SLOT_OPTIONS: {
    label: string
    value: StaffDocumentSlot
}[] = [
    { label: 'تصویر کارت ملی', value: 'NATIONAL_CARD' },
    { label: 'تصویر شناسنامه ۱', value: 'BIRTH_CERTIFICATE_PAGE_1' },
    { label: 'تصویر شناسنامه ۲', value: 'BIRTH_CERTIFICATE_PAGE_2' },
    { label: 'تصویر شناسنامه ۳', value: 'BIRTH_CERTIFICATE_PAGE_3' },
    { label: 'تصویر شناسنامه ۴', value: 'BIRTH_CERTIFICATE_PAGE_4' },
    { label: 'تصویر مدرک تحصیلی', value: 'EDUCATIONAL_DEGREE' },
    { label: 'تصویر تاییدیه کد پستی', value: 'POSTAL_CODE_CONFIRMATION' },
    { label: 'تصویر ضمانت', value: 'GUARANTEE' },
    { label: 'تصویر قرارداد', value: 'CONTRACT' },
    { label: 'عکس پرسنلی', value: 'PERSONNEL_PHOTO' },
    { label: 'گواهی دوره آموزشی', value: 'TRAINING_CERTIFICATE' },
    { label: 'سایر', value: 'OTHER' },
]

/** مدارک الزامی برای ثبت کاربر (بدون OTHER) */
export const REQUIRED_DOCUMENT_SLOTS = DOCUMENT_SLOT_OPTIONS.filter(
    (slot) => slot.value !== 'OTHER'
)

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
