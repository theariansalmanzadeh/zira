import * as z from 'zod'
import type {
    ContactInfoIn,
    ContactInfoOut,
    SocialPlatformEnum,
} from '@/src/api/types/admin/cms/contact'
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

const SOCIAL_FIELDS = [
    ['instagram', 'INSTAGRAM'],
    ['telegram', 'TELEGRAM'],
    ['whatsapp', 'WHATSAPP'],
    ['website', 'WEBSITE'],
] as const

const socialUrl = (info: ContactInfoOut, platform: SocialPlatformEnum) =>
    info.social_links.find((link) => link.platform === platform)?.url ?? ''

export const toContactUsFormValues = (
    info: ContactInfoOut
): ContactUsFormValues => ({
    phones: {
        landline1: info.phone_numbers[0]?.value ?? '',
        landline2: info.phone_numbers[1]?.value ?? '',
        mobile1: info.mobile_numbers[0]?.value ?? '',
        mobile2: info.mobile_numbers[1]?.value ?? '',
    },
    emailHours: {
        email: info.email ?? '',
        hours: info.working_hours ?? '',
    },
    address: info.address ?? '',
    socials: {
        instagram: socialUrl(info, 'INSTAGRAM'),
        telegram: socialUrl(info, 'TELEGRAM'),
        whatsapp: socialUrl(info, 'WHATSAPP'),
        website: socialUrl(info, 'WEBSITE'),
    },
})

const labeledValue = (
    label: string,
    value: string
): { label: string; value: string } | null => {
    const trimmed = value.trim()
    if (!trimmed) return null
    return { label, value: trimmed }
}

export const toContactInfoIn = (
    values: ContactUsFormValues,
    info?: ContactInfoOut | null
): ContactInfoIn => ({
    phone_numbers: [
        labeledValue(
            info?.phone_numbers[0]?.label || 'تلفن ثابت ۱',
            values.phones.landline1
        ),
        labeledValue(
            info?.phone_numbers[1]?.label || 'تلفن ثابت ۲',
            values.phones.landline2
        ),
    ].filter((item) => item !== null),
    mobile_numbers: [
        labeledValue(
            info?.mobile_numbers[0]?.label || 'موبایل ۱',
            values.phones.mobile1
        ),
        labeledValue(
            info?.mobile_numbers[1]?.label || 'موبایل ۲',
            values.phones.mobile2
        ),
    ].filter((item) => item !== null),
    email: values.emailHours.email.trim(),
    working_hours: values.emailHours.hours.trim(),
    address: values.address.trim(),
    latitude: info?.latitude ?? null,
    longitude: info?.longitude ?? null,
    social_links: SOCIAL_FIELDS.flatMap(([key, platform]) => {
        const url = values.socials[key].trim()
        if (!url) return []
        return [{ platform, url }]
    }),
})
