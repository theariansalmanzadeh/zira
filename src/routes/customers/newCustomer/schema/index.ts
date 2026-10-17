import * as z from 'zod'
import type { FormDropdownOption } from '@/src/shared/components/ui/FormDropdown'
import {
    mobileSchema,
    nationalIdSchema,
    toEnglishDigits,
} from '@/src/shared/schema/generalSchema'

const requiredString = (message: string) => z.string().trim().min(1, message)

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

const optionalAmountSchema = z
    .string()
    .trim()
    .transform(toEnglishDigits)
    .refine(
        (value) => value === '' || /^\d+$/.test(value.replace(/,/g, '')),
        'مبلغ معتبر نیست'
    )

const digitsOnly = (value: string) => toEnglishDigits(value).replace(/\D/g, '')

const guaranteeSchema = z
    .object({
        type: z.enum(['personal-cheque', 'promissory-note']),
        creditRelated: z.string(),
        amount: optionalAmountSchema,
        chequeNumber: z.string(),
        bank: z.string(),
        branch: z.string(),
        accountHolder: z.string(),
        noteNumber: z.string(),
        guarantorName: z.string(),
        guarantorNationalId: z.string(),
        dueDate: z.date().optional(),
        status: z.string(),
        fileName: z.string(),
    })
    .superRefine((values, ctx) => {
        const chequeNumber = digitsOnly(values.chequeNumber)
        if (chequeNumber && !/^\d{16}$/.test(chequeNumber)) {
            ctx.addIssue({
                code: 'custom',
                path: ['chequeNumber'],
                message: 'شماره چک باید ۱۶ رقم باشد',
            })
        }

        const guarantorNationalId = digitsOnly(values.guarantorNationalId)
        if (guarantorNationalId && !/^\d{10}$/.test(guarantorNationalId)) {
            ctx.addIssue({
                code: 'custom',
                path: ['guarantorNationalId'],
                message: 'کد ملی ضامن باید ۱۰ رقم باشد',
            })
        }
    })

export const newCustomerFormSchema = z.object({
    firstName: requiredString('نام الزامی است'),
    lastName: requiredString('نام خانوادگی الزامی است'),
    gender: z.string(),
    nationalId: nationalIdSchema,
    businessLicenseNumber: z
        .string()
        .trim()
        .transform(toEnglishDigits)
        .refine(
            (value) => value === '' || /^\d+$/.test(value),
            'شماره پروانه کسب معتبر نیست'
        ),
    mobile1: mobileSchema,
    mobile2: optionalMobileSchema,
    landline: optionalLandlineSchema,
    referrerName: optionalString,
    address: optionalString,
    marketerId: z.string(),
    marketerPercent: z
        .string()
        .trim()
        .transform(toEnglishDigits)
        .refine(
            (value) => value === '' || /^\d+(\.\d+)?$/.test(value),
            'درصد معتبر نیست'
        ),
    chequeCredit: optionalAmountSchema,
    chequeLevel: z.string(),
    goldCredit: optionalAmountSchema,
    goldStepIncrease: z.string(),
    guarantee: guaranteeSchema,
    username: optionalString,
    password: z
        .string()
        .trim()
        .refine(
            (value) => value === '' || value.length >= 8,
            'رمز ورود باید حداقل ۸ کاراکتر باشد'
        ),
    customerType: z
        .enum(['WHOLESALE', 'RETAIL', 'ORGANIZATIONAL', 'OTHER'])
        .or(z.literal('')),
    cooperationLevel: z.string(),
    userLevel: z.string(),
    customerStatus: z.string(),
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
    guarantee: {
        type: 'personal-cheque',
        creditRelated: 'cheque-credit',
        amount: '250000000',
        chequeNumber: '',
        bank: 'mellat',
        branch: '',
        accountHolder: '',
        noteNumber: '1234567',
        guarantorName: '',
        guarantorNationalId: '0072345689',
        dueDate: new Date('2026-06-05T00:00:00.000Z'),
        status: 'active',
        fileName: '',
    },
    username: 'cu-7363',
    password: '',
    customerType: 'WHOLESALE',
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
    { label: 'عمده‌فروش', value: 'WHOLESALE' },
    { label: 'خرده‌فروش', value: 'RETAIL' },
    { label: 'سازمانی', value: 'ORGANIZATIONAL' },
    { label: 'سایر', value: 'OTHER' },
]

export const COOPERATION_LEVEL_OPTIONS: FormDropdownOption[] = [
    { label: 'طلایی', value: 'GOLD' },
    { label: 'نقره‌ای', value: 'SILVER' },
    { label: 'برنزی', value: 'BRONZE' },
]

export const USER_LEVEL_OPTIONS: FormDropdownOption[] = [
    { label: 'سطح ۱ — تصاویر پایه', value: 'NORMAL' },
    { label: 'سطح ۲ — تصاویر مانکنی', value: 'PROFESSIONAL' },
    { label: 'سطح ۳ — دسترسی کامل', value: 'SPECIAL' },
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
    'guarantee',
] as const satisfies ReadonlyArray<keyof NewCustomerFormValues>

export const ACCOUNT_FIELDS = [
    'username',
    'password',
    'customerType',
    'cooperationLevel',
    'userLevel',
    'customerStatus',
] as const satisfies ReadonlyArray<keyof NewCustomerFormValues>
