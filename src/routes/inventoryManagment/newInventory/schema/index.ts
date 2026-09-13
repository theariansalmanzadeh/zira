import * as z from 'zod'
import type { FieldPath } from 'react-hook-form'
import type { FormDropdownOption } from '@/src/shared/components/ui/FormDropdown'
import { addressFormSchema } from '@/src/shared/schema/admin/addressFormSchema'
import { toEnglishDigits } from '@/src/shared/schema/generalSchema'

const requiredString = (message: string) => z.string().trim().min(1, message)

const dropdownValue = (message: string) => z.string().min(1, message)

const optionalString = z.string().trim().optional().or(z.literal(''))

const optionalAreaSchema = z
    .string()
    .trim()
    .transform(toEnglishDigits)
    .refine(
        (value) => value === '' || /^\d+$/.test(value),
        'متراژ معتبر نیست'
    )

export const defineInventorySchema = z
    .object({
        name: requiredString('نام انبار الزامی است'),
        code: z.string().trim(),
        managerId: dropdownValue('انتخاب مسئول انبار الزامی است'),
        startDate: optionalString,
        area: optionalAreaSchema,
        insuranceStatus: dropdownValue('انتخاب وضعیت بیمه الزامی است'),
        isActive: z.boolean(),
        description: optionalString,
    })
    .merge(
        addressFormSchema.pick({
            province: true,
            city: true,
            fullAddress: true,
            plaque: true,
            unit: true,
            postalCode: true,
            landlinePhone: true,
        })
    )

export type DefineInventoryFormValues = z.infer<typeof defineInventorySchema>

export const DEFAULT_INVENTORY_CODE = 'WR-1005'

export const DEFINE_INVENTORY_DEFAULT_VALUES: DefineInventoryFormValues = {
    name: '',
    code: DEFAULT_INVENTORY_CODE,
    managerId: '',
    startDate: '',
    area: '',
    insuranceStatus: '',
    isActive: true,
    description: '',
    province: '',
    city: '',
    fullAddress: '',
    plaque: '',
    unit: '',
    postalCode: '',
    landlinePhone: '',
}

export const DEFINE_INVENTORY_FIELDS = [
    'name',
    'code',
    'managerId',
    'startDate',
    'area',
    'insuranceStatus',
    'isActive',
    'description',
    'province',
    'city',
    'fullAddress',
    'plaque',
    'unit',
    'postalCode',
    'landlinePhone',
] as const satisfies readonly FieldPath<DefineInventoryFormValues>[]

export const PHONE_PLACEHOLDER = '+98 --- ---- ---'

export const INVENTORY_MANAGER_OPTIONS: FormDropdownOption[] = [
    { label: 'رضا کاظمی', value: 'reza-kazemi' },
    { label: 'مریم احمدی', value: 'maryam-ahmadi' },
    { label: 'علی رضایی', value: 'ali-rezaei' },
]

export const INSURANCE_STATUS_OPTIONS: FormDropdownOption[] = [
    { label: 'بیمه شده', value: 'insured' },
    { label: 'فاقد بیمه', value: 'uninsured' },
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
