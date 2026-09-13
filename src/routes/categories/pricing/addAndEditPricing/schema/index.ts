import * as z from 'zod'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const addAndEditPricingSchema = z.object({
    name: requiredString('نام قرارداد الزامی است'),
    adjustmentPercent: z
        .number({ error: 'درصد تعدیل الزامی است' })
        .refine((value) => Number.isFinite(value), {
            message: 'درصد تعدیل معتبر نیست',
        }),
    description: z.string().optional().or(z.literal('')),
})

export type AddAndEditPricingFormValues = z.infer<
    typeof addAndEditPricingSchema
>

export const ADD_AND_EDIT_PRICING_DEFAULT_VALUES: AddAndEditPricingFormValues =
    {
        name: '',
        adjustmentPercent: 0,
        description: '',
    }

export const getAddAndEditPricingDefaultValues = (
    overrides?: Partial<AddAndEditPricingFormValues>
): AddAndEditPricingFormValues => ({
    ...ADD_AND_EDIT_PRICING_DEFAULT_VALUES,
    ...overrides,
})
