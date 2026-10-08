import * as z from 'zod'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const contactEmailSchema = z.object({
    name: requiredString('نام الزامی است'),
    phone: requiredString('شماره تماس الزامی است'),
    title: requiredString('عنوان الزامی است'),
    message: requiredString('متن پیام الزامی است'),
})

export type ContactEmailValues = z.infer<typeof contactEmailSchema>

export const CONTACT_EMAIL_DEFAULTS: ContactEmailValues = {
    name: '',
    phone: '',
    title: '',
    message: '',
}
