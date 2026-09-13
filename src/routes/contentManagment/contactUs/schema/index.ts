import * as z from 'zod'
import {
    CONTACT_ADDRESS_DEFAULT,
    CONTACT_EMAIL_HOURS_DEFAULT,
    CONTACT_NUMBERS_DEFAULT,
    CONTACT_SOCIALS_DEFAULT,
} from '../constants'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const contactUsFormSchema = z.object({
    phones: z.object({
        landline1: requiredString('تلفن ثابت ۱ الزامی است'),
        landline2: z.string(),
        mobile1: requiredString('موبایل ۱ الزامی است'),
        mobile2: z.string(),
    }),
    emailHours: z.object({
        email: requiredString('ایمیل پشتیبانی الزامی است'),
        hours: requiredString('ساعات کاری الزامی است'),
    }),
    address: requiredString('آدرس الزامی است'),
    socials: z.object({
        instagram: z.string(),
        telegram: z.string(),
        whatsapp: z.string(),
        website: z.string(),
    }),
})

export type ContactUsFormValues = z.infer<typeof contactUsFormSchema>

export const CONTACT_US_DEFAULT_VALUES: ContactUsFormValues = {
    phones: { ...CONTACT_NUMBERS_DEFAULT },
    emailHours: { ...CONTACT_EMAIL_HOURS_DEFAULT },
    address: CONTACT_ADDRESS_DEFAULT,
    socials: { ...CONTACT_SOCIALS_DEFAULT },
}
