import * as z from 'zod'
import { toEnglishDigits } from '@/src/shared/schema/generalSchema'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const parseAdjustmentPercent = (value: string) => {
    const normalized = toEnglishDigits(value).trim().replace(/,/g, '')
    const negative = normalized.startsWith('-') || normalized.endsWith('-')
    const amountText = normalized.replace(/-/g, '')
    if (!/^\d+(\.\d+)?$/.test(amountText)) return null
    const amount = Number(amountText)
    if (!Number.isFinite(amount) || amount === 0) return null
    return negative ? -amount : amount
}

export const addAndEditContractSchema = z.object({
    name: requiredString('نام قرارداد الزامی است'),
    adjustmentPercent: z
        .string()
        .trim()
        .min(1, 'درصد تعدیل الزامی است')
        .refine((value) => parseAdjustmentPercent(value) !== null, {
            message: 'درصد تعدیل معتبر نیست',
        }),
    validFrom: z.date({ error: 'تاریخ اثر الزامی است' }),
    validTo: z.date({ error: 'تاریخ انقضا الزامی است' }),
    description: z.string().optional().or(z.literal('')),
})

export type AddAndEditContractFormValues = z.infer<
    typeof addAndEditContractSchema
>

export const ADD_AND_EDIT_CONTRACT_DEFAULT_VALUES: AddAndEditContractFormValues =
    {
        name: '',
        adjustmentPercent: '',
        validFrom: undefined as unknown as Date,
        validTo: undefined as unknown as Date,
        description: '',
    }

export const getAddAndEditContractDefaultValues = (
    overrides?: Partial<AddAndEditContractFormValues>
): AddAndEditContractFormValues => ({
    ...ADD_AND_EDIT_CONTRACT_DEFAULT_VALUES,
    ...overrides,
})
