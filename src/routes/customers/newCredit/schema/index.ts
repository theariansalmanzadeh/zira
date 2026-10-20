import * as z from 'zod'

export const CREDIT_TYPE_OPTIONS = [
    { label: 'اعتبار چکی', value: 'CHEQUE' },
    { label: 'اعتبار طلایی', value: 'GOLDEN' },
] as const

export const newCreditSchema = z.object({
    customer_id: z.string().trim().min(1, 'شناسه مشتری الزامی است'),
    credit_type: z.enum(['CHEQUE', 'GOLDEN']),
})

export type NewCreditFormValues = z.infer<typeof newCreditSchema>

export const NEW_CREDIT_DEFAULT_VALUES: NewCreditFormValues = {
    customer_id: '',
    credit_type: 'CHEQUE',
}
