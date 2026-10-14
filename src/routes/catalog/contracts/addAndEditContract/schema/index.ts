import * as z from 'zod'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const addAndEditContractSchema = z.object({
    name: requiredString('نام قرارداد الزامی است'),
    adjustmentPercent: z
        .number({ error: 'درصد تعدیل الزامی است' })
        .refine((value) => Number.isFinite(value) && value !== 0, {
            message: 'درصد تعدیل نمی‌تواند صفر باشد',
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
        adjustmentPercent: 0,
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
