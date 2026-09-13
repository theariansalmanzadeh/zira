import * as z from 'zod'
import { toEnglishDigits } from '@/src/shared/schema/generalSchema'

const dropdownValue = (message: string) => z.string().min(1, message)

export const newPaymentSchema = z.object({
    paymentType: dropdownValue('انتخاب نوع پرداخت الزامی است'),
    trackingNumber: z.string().trim().min(1, 'شناسه پرداخت الزامی است'),
    sourceAccount: dropdownValue('انتخاب حساب/صندوق مبدأ الزامی است'),
    paymentDate: z.string().trim().min(1, 'تاریخ پرداخت الزامی است'),
    destinationAccount: dropdownValue('انتخاب حساب/صندوق مقصد الزامی است'),
    paymentAmount: z
        .string()
        .trim()
        .min(1, 'مبلغ الزامی است')
        .transform(toEnglishDigits)
        .refine((value) => /^\d+$/.test(value), 'مبلغ معتبر نیست'),
})

export type NewPaymentFormValues = z.infer<typeof newPaymentSchema>

export const NEW_PAYMENT_DEFAULT_VALUES: NewPaymentFormValues = {
    paymentType: '',
    trackingNumber: 'PN-7363',
    sourceAccount: '',
    paymentDate: '',
    destinationAccount: '',
    paymentAmount: '',
}
