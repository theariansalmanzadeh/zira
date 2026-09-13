import * as z from 'zod'
import type { FormDropdownOption } from '@/src/shared/components/ui/FormDropdown'
import { toEnglishDigits } from '@/src/shared/schema/generalSchema'

const requiredString = (message: string) => z.string().trim().min(1, message)

const dropdownValue = (message: string) => z.string().min(1, message)

const percentSchema = (message: string) =>
    z
        .string()
        .trim()
        .min(1, message)
        .transform(toEnglishDigits)
        .refine(
            (value) => /^\d+(\.\d+)?$/.test(value),
            'درصد معتبر نیست'
        )
        .refine((value) => {
            const n = Number(value)
            return n >= 0 && n <= 100
        }, 'درصد باید بین ۰ تا ۱۰۰ باشد')

export const newGroupFormSchema = z.object({
    groupCode: requiredString('کد گروه الزامی است'),
    groupName: requiredString('نام گروه الزامی است'),
    userLevel: dropdownValue('سطح کاربران گروه الزامی است'),
    marketerId: dropdownValue('انتخاب بازاریاب الزامی است'),
    marketerPercent: percentSchema('درصد بازاریاب الزامی است'),
    discountPercent: percentSchema('درصد تخفیف گروه الزامی است'),
    chequeLevel: dropdownValue('سطح اعتبار چک الزامی است'),
    goldLevel: dropdownValue('سطح اعتبار طلایی الزامی است'),
    userStatus: dropdownValue('وضعیت کاربران گروه الزامی است'),
})

export type NewGroupFormValues = z.infer<typeof newGroupFormSchema>

export const NEW_GROUP_DEFAULT_VALUES: NewGroupFormValues = {
    groupCode: '',
    groupName: '',
    userLevel: '2',
    marketerId: '',
    marketerPercent: '3',
    discountPercent: '9',
    chequeLevel: '4',
    goldLevel: '3',
    userStatus: 'active',
}

export const GROUP_USER_LEVEL_OPTIONS: FormDropdownOption[] = [
    { label: 'سطح ۱', value: '1' },
    { label: 'سطح ۲', value: '2' },
    { label: 'سطح ۳', value: '3' },
]

export const GROUP_MARKETER_OPTIONS: FormDropdownOption[] = [
    { label: 'رضا کریمی', value: 'reza-karimi' },
    { label: 'مهدی رشیدی', value: 'mehdi-rashidi' },
    { label: 'سحر نوری', value: 'sahar-nouri' },
]

export const GROUP_CHEQUE_LEVEL_OPTIONS: FormDropdownOption[] = [
    { label: 'سطح ۱ (راس تا ۱ ماه)', value: '1' },
    { label: 'سطح ۲ (راس تا ۲ ماه)', value: '2' },
    { label: 'سطح ۳ (راس تا ۳ ماه)', value: '3' },
    { label: 'سطح ۴ (راس تا ۴ ماه)', value: '4' },
    { label: 'سطح ۵ (راس تا ۵ ماه)', value: '5' },
    { label: 'سطح ۶ (راس تا ۶ ماه)', value: '6' },
    { label: 'سطح ۷ (راس تا ۷ ماه)', value: '7' },
]

export const GROUP_GOLD_LEVEL_OPTIONS: FormDropdownOption[] = [
    { label: 'سطح ۱', value: '1' },
    { label: 'سطح ۲', value: '2' },
    { label: 'سطح ۳', value: '3' },
    { label: 'سطح ۴', value: '4' },
    { label: 'سطح ۵', value: '5' },
    { label: 'سطح ۶', value: '6' },
    { label: 'سطح ۷', value: '7' },
]

export const GROUP_USER_STATUS_OPTIONS: FormDropdownOption[] = [
    { label: 'فعال', value: 'active' },
    { label: 'غیرفعال', value: 'inactive' },
]
