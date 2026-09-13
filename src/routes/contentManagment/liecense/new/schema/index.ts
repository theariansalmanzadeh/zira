import * as z from 'zod'

export type DocumentTab = 'certificate' | 'license'
export type DocumentFileType = 'pdf' | 'image'
export type DocumentVisibility = 'visible' | 'hidden'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const newLiecenseFormSchema = z.object({
    title: requiredString('عنوان سند الزامی است'),
    issuer: requiredString('مرجع صدور الزامی است'),
    documentNo: z.string().trim().optional().or(z.literal('')),
    issuedAt: z.custom<Date | undefined>(
        (value) => value instanceof Date,
        { message: 'تاریخ صدور الزامی است' }
    ),
    expiresAt: z.custom<Date | undefined>(
        (value) => value === undefined || value instanceof Date
    ),
    description: z.string().trim().optional().or(z.literal('')),
    tab: z.enum(['certificate', 'license']),
    fileType: z.enum(['pdf', 'image']),
    visibility: z.enum(['visible', 'hidden']),
    fileName: requiredString('انتخاب فایل الزامی است'),
    fileSize: z.string().optional().or(z.literal('')),
})

export type NewLiecenseFormValues = z.infer<typeof newLiecenseFormSchema>

export const NEW_LIECENSE_DEFAULT_VALUES: NewLiecenseFormValues = {
    title: '',
    issuer: '',
    documentNo: '',
    issuedAt: undefined,
    expiresAt: undefined,
    description: '',
    tab: 'certificate',
    fileType: 'pdf',
    visibility: 'visible',
    fileName: '',
    fileSize: '',
}
