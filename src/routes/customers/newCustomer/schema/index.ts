import * as z from 'zod'
import type { FormDropdownOption } from '@/src/shared/components/ui/FormDropdown'
import {
    mobileSchema,
    nationalIdSchema,
    toEnglishDigits,
} from '@/src/shared/schema/generalSchema'

const requiredString = (message: string) => z.string().trim().min(1, message)

const dropdownValue = (message: string) => z.string().min(1, message)

const optionalString = z.string().trim().optional().or(z.literal(''))

const optionalMobileSchema = z
    .string()
    .trim()
    .transform(toEnglishDigits)
    .refine(
        (value) => value === '' || /^09\d{9}$/.test(value),
        'شماره موبایل معتبر نیست'
    )

const optionalLandlineSchema = z
    .string()
    .trim()
    .transform(toEnglishDigits)
    .refine(
        (value) => value === '' || /^[0-9+\-\s]+$/.test(value),
        'شماره تلفن ثابت معتبر نیست'
    )

const amountSchema = z
    .string()
    .trim()
    .min(1, 'این فیلد الزامی است')
    .transform(toEnglishDigits)
    .refine((value) => /^\d+$/.test(value.replace(/,/g, '')), 'مبلغ معتبر نیست')

export const newCustomerFormSchema = z.object({
    firstName: requiredString('نام الزامی است'),
    lastName: requiredString('نام خانوادگی الزامی است'),
    gender: dropdownValue('انتخاب جنسیت الزامی است'),
    nationalId: nationalIdSchema,
    businessLicenseNumber: z
        .string()
        .trim()
        .min(1, 'شماره پروانه کسب الزامی است')
        .transform(toEnglishDigits)
        .refine((value) => /^\d+$/.test(value), 'شماره پروانه کسب معتبر نیست'),
    mobile1: mobileSchema,
    mobile2: optionalMobileSchema,
    landline: optionalLandlineSchema,
    referrerName: optionalString,
    address: requiredString('آدرس الزامی است'),
    marketerId: dropdownValue('تخصیص بازاریاب الزامی است'),
    marketerPercent: z
        .string()
        .trim()
        .min(1, 'درصد بازاریاب الزامی است')
        .transform(toEnglishDigits)
        .refine((value) => /^\d+(\.\d+)?$/.test(value), 'درصد معتبر نیست'),
    chequeCredit: amountSchema,
    chequeLevel: dropdownValue('سطح اعتبار چک الزامی است'),
    goldCredit: amountSchema,
    goldStepIncrease: dropdownValue('انتخاب افزایش پله‌ای الزامی است'),
    username: requiredString('نام کاربری الزامی است'),
    password: z
        .string()
        .trim()
        .min(8, 'رمز ورود باید حداقل ۸ کاراکتر باشد'),
    customerType: dropdownValue('انتخاب نوع مشتری الزامی است'),
    cooperationLevel: dropdownValue('انتخاب سطح همکاری الزامی است'),
    userLevel: dropdownValue('انتخاب سطح کاربر الزامی است'),
    customerStatus: dropdownValue('انتخاب وضعیت مشتری الزامی است'),
})

export type NewCustomerFormValues = z.infer<typeof newCustomerFormSchema>

export const NEW_CUSTOMER_DEFAULT_VALUES: NewCustomerFormValues = {
    firstName: '',
    lastName: '',
    gender: '',
    nationalId: '',
    businessLicenseNumber: '',
    mobile1: '',
    mobile2: '',
    landline: '',
    referrerName: '',
    address: '',
    marketerId: 'reza-karimi',
    marketerPercent: '3',
    chequeCredit: '200000000',
    chequeLevel: '4',
    goldCredit: '150000000',
    goldStepIncrease: 'active',
    username: 'cu-7363',
    password: '',
    customerType: 'wholesaler',
    cooperationLevel: 'gold',
    userLevel: '2',
    customerStatus: 'pending',
}

export const GENDER_OPTIONS: FormDropdownOption[] = [
    { label: 'زن', value: 'female' },
    { label: 'مرد', value: 'male' },
]

export const MARKETER_OPTIONS: FormDropdownOption[] = [
    { label: 'رضا کریمی', value: 'reza-karimi' },
    { label: 'مهدی رشیدی', value: 'mehdi-rashidi' },
    { label: 'سحر نوری', value: 'sahar-nouri' },
]

export const CHEQUE_LEVEL_OPTIONS: FormDropdownOption[] = [
    { label: 'سطح ۱ — راس تا ۱ ماه', value: '1' },
    { label: 'سطح ۲ — راس تا ۲ ماه', value: '2' },
    { label: 'سطح ۳ — راس تا ۳ ماه', value: '3' },
    { label: 'سطح ۴ — راس تا ۴ ماه', value: '4' },
    { label: 'سطح ۵ — راس تا ۵ ماه', value: '5' },
    { label: 'سطح ۶ — راس تا ۶ ماه', value: '6' },
    { label: 'سطح ۷ — راس تا ۷ ماه', value: '7' },
]

export const GOLD_STEP_INCREASE_OPTIONS: FormDropdownOption[] = [
    { label: 'فعال', value: 'active' },
    { label: 'غیرفعال', value: 'inactive' },
]

export const CUSTOMER_TYPE_OPTIONS: FormDropdownOption[] = [
    { label: 'عمده‌فروش', value: 'wholesaler' },
    { label: 'خرده‌فروش', value: 'retailer' },
]

export const COOPERATION_LEVEL_OPTIONS: FormDropdownOption[] = [
    { label: 'طلایی', value: 'gold' },
    { label: 'نقره‌ای', value: 'silver' },
    { label: 'برنزی', value: 'bronze' },
]

export const USER_LEVEL_OPTIONS: FormDropdownOption[] = [
    { label: 'سطح ۱ — تصاویر پایه', value: '1' },
    { label: 'سطح ۲ — تصاویر مانکنی', value: '2' },
    { label: 'سطح ۳ — دسترسی کامل', value: '3' },
]

export const CUSTOMER_STATUS_OPTIONS: FormDropdownOption[] = [
    { label: 'در انتظار تایید', value: 'pending' },
    { label: 'تایید شده', value: 'approved' },
    { label: 'رد شده', value: 'rejected' },
]

export const IDENTITY_FIELDS = [
    'firstName',
    'lastName',
    'gender',
    'nationalId',
    'businessLicenseNumber',
] as const satisfies ReadonlyArray<keyof NewCustomerFormValues>

export const CONTACT_FIELDS = [
    'mobile1',
    'mobile2',
    'landline',
    'referrerName',
    'address',
] as const satisfies ReadonlyArray<keyof NewCustomerFormValues>

export const CREDIT_FIELDS = [
    'marketerId',
    'marketerPercent',
    'chequeCredit',
    'chequeLevel',
    'goldCredit',
    'goldStepIncrease',
] as const satisfies ReadonlyArray<keyof NewCustomerFormValues>

export const ACCOUNT_FIELDS = [
    'username',
    'password',
    'customerType',
    'cooperationLevel',
    'userLevel',
    'customerStatus',
] as const satisfies ReadonlyArray<keyof NewCustomerFormValues>
