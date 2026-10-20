import * as z from 'zod'
import {
    postalCodeSchema,
    toEnglishDigits,
} from '@/src/shared/schema/generalSchema'

const dropdownValue = (message: string) => z.string().min(1, message)

const optionalString = z.string().trim().optional().or(z.literal(''))

const optionalMobileSchema = z
    .string()
    .trim()
    .transform(toEnglishDigits)
    .refine(
        (value) => value === '' || /^09\d{9}$/.test(value),
        'شماره موبایل معتبر نیست'
    )

const optionalLandlineSchema = z
    .string()
    .trim()
    .transform(toEnglishDigits)
    .refine(
        (value) => value === '' || /^[0-9+\-\s]+$/.test(value),
        'شماره تلفن ثابت معتبر نیست'
    )

const optionalEmailSchema = z
    .string()
    .trim()
    .refine(
        (value) => value === '' || z.string().email().safeParse(value).success,
        'ایمیل معتبر نیست'
    )

export const addressFormSchema = z.object({
    province: dropdownValue('انتخاب استان الزامی است'),
    city: dropdownValue('انتخاب شهر الزامی است'),
    fullAddress: z.string().trim().min(1, 'آدرس کامل الزامی است'),
    plaque: optionalString,
    unit: optionalString,
    postalCode: postalCodeSchema,
    addressEmail: optionalEmailSchema,
    mobilePhone: optionalMobileSchema,
    landlinePhone: optionalLandlineSchema,
})

export type AddressFormValues = z.infer<typeof addressFormSchema>
