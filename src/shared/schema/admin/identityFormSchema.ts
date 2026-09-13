import * as z from 'zod'
import {
    nationalIdSchema,
    postalCodeSchema,
    toEnglishDigits,
} from '@/src/shared/schema/generalSchema'

const requiredString = (message: string) =>
    z.string().trim().min(1, message)

const optionalString = z.string().trim().optional().or(z.literal(''))

const dropdownValue = (message: string) => z.string().min(1, message)

const optionalMobileSchema = z
    .string()
    .trim()
    .transform(toEnglishDigits)
    .refine(
        (value) => value === '' || /^09\d{9}$/.test(value),
        'شماره موبایل معتبر نیست'
    )

export const identityFormSchema = z.object({
    firstName: requiredString('نام الزامی است'),
    lastName: requiredString('نام خانوادگی الزامی است'),
    nationalId: nationalIdSchema,
    birthCertificateNumber: requiredString('شماره شناسنامه الزامی است'),
    placeOfIssue: requiredString('محل صدور الزامی است'),
    gender: dropdownValue('انتخاب جنسیت الزامی است'),
    fatherName: requiredString('نام پدر الزامی است'),
    birthDate: optionalString,
    maritalStatus: dropdownValue('انتخاب وضعیت تاهل الزامی است'),
    childrenCount: z
        .string()
        .trim()
        .min(1, 'تعداد فرزند الزامی است')
        .transform(toEnglishDigits)
        .refine((value) => /^\d+$/.test(value), 'تعداد فرزند معتبر نیست'),
    education: dropdownValue('انتخاب مدرک تحصیلی الزامی است'),
    socialSecurityNumber: optionalString,
})

export type IdentityFormValues = z.infer<typeof identityFormSchema>
