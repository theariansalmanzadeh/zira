import * as z from 'zod'
import { mobileSchema, toEnglishDigits } from '@/src/shared/schema/generalSchema'

const requiredString = (message: string) =>
    z.string().trim().min(1, message)

const optionalLandlineSchema = z
    .string()
    .trim()
    .transform(toEnglishDigits)
    .refine(
        (value) => value === '' || /^[0-9+\-\s]+$/.test(value),
        'شماره تلفن ثابت معتبر نیست'
    )

const emergencyContactSchema = z.object({
    firstName: requiredString('نام الزامی است'),
    lastName: requiredString('نام خانوادگی الزامی است'),
    landline: optionalLandlineSchema,
    mobile: mobileSchema,
})

export const emergencyFormSchema = z.object({
    contact1: emergencyContactSchema,
    contact2: emergencyContactSchema,
})

export type EmergencyContactValues = z.infer<typeof emergencyContactSchema>
export type EmergencyFormValues = z.infer<typeof emergencyFormSchema>

export const emergencyFormFlatSchema = z.object({
    contact1FirstName: requiredString('نام مخاطب ضروری ۱ الزامی است'),
    contact1LastName: requiredString('نام خانوادگی مخاطب ضروری ۱ الزامی است'),
    contact1Landline: optionalLandlineSchema,
    contact1Mobile: mobileSchema,
    contact1Relation: requiredString('نسبت مخاطب ضروری ۱ الزامی است'),
    contact2FirstName: requiredString('نام مخاطب ضروری ۲ الزامی است'),
    contact2LastName: requiredString('نام خانوادگی مخاطب ضروری ۲ الزامی است'),
    contact2Landline: optionalLandlineSchema,
    contact2Mobile: mobileSchema,
    contact2Relation: requiredString('نسبت مخاطب ضروری ۲ الزامی است'),
})

export type EmergencyFormFlatValues = z.infer<typeof emergencyFormFlatSchema>
