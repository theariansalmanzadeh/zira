import { z } from 'zod'
import {
    isValidIranianNationalId,
    toEnglishDigits,
} from '@/src/shared/schema/generalSchema'

const optionalText = z.string()

export const addCustomerGuaranteeSchema = z.object({
    credit_account_id: z.string().min(1, 'حساب اعتباری الزامی است'),
    guarantee_type: z.enum(['PERSONAL_CHEQUE', 'PROMISSORY_NOTE'], {
        error: 'نوع ضمانت الزامی است',
    }),
    amount: z
        .string()
        .trim()
        .min(1, 'مبلغ الزامی است')
        .transform(toEnglishDigits)
        .refine((value) => /^\d+$/.test(value) && Number(value) > 0, 'مبلغ معتبر نیست'),
    document_no: z.string().trim().min(1, 'شماره سند الزامی است'),
    bank_id: optionalText,
    bank_branch_name: optionalText,
    owner_name: optionalText,
    guarantor_name: optionalText,
    guarantor_national_id: z.string().superRefine((value, ctx) => {
        const digits = toEnglishDigits(value.trim())
        if (!digits) return
        if (!/^\d{10}$/.test(digits) || !isValidIranianNationalId(digits)) {
            ctx.addIssue({ code: 'custom', message: 'کدملی معتبر نیست' })
        }
    }),
    issue_place: optionalText,
    due_date: z.string(),
    file: z.custom<File | null>(
        (value) => value instanceof File,
        'فایل سند الزامی است'
    ),
})

export type AddCustomerGuaranteeFormValues = z.infer<
    typeof addCustomerGuaranteeSchema
>

export const addCustomerGuaranteeDefaultValues: AddCustomerGuaranteeFormValues =
    {
        credit_account_id: '',
        guarantee_type: 'PERSONAL_CHEQUE',
        amount: '',
        document_no: '',
        bank_id: '',
        bank_branch_name: '',
        owner_name: '',
        guarantor_name: '',
        guarantor_national_id: '',
        issue_place: '',
        due_date: '',
        file: null,
    }
