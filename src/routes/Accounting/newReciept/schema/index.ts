import * as z from 'zod'
import { toEnglishDigits } from '@/src/shared/schema/generalSchema'

const dropdownValue = (message: string) => z.string().min(1, message)

export const newReceiptSchema = z.object({
    receiptType: dropdownValue('انتخاب نوع رسید الزامی است'),
    receiptId: z.string().trim().min(1, 'شناسه رسید الزامی است'),
    party: dropdownValue('انتخاب طرف حساب الزامی است'),
    receiptDate: z.string().trim().min(1, 'تاریخ الزامی است'),
    destinationFund: dropdownValue('انتخاب صندوق مقصد الزامی است'),
    amount: z
        .string()
        .trim()
        .min(1, 'مبلغ الزامی است')
        .transform(toEnglishDigits)
        .refine((value) => /^\d+$/.test(value), 'مبلغ معتبر نیست'),
    description: z.string().trim().optional().or(z.literal('')),
    receiptImage: z.instanceof(File).optional().nullable(),
})

export type NewReceiptFormValues = z.infer<typeof newReceiptSchema>

export const NEW_RECEIPT_DEFAULT_VALUES: NewReceiptFormValues = {
    receiptType: '',
    receiptId: '5318_92',
    party: '',
    receiptDate: '',
    destinationFund: '',
    amount: '',
    description: '',
    receiptImage: null,
}
