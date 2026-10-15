'use client'

import type { LucideIcon } from 'lucide-react'
import { Globe, Instagram, MapPin, MessageCircle, Phone, Send, User } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { cn } from '@shared/libs/utils'
import { Button } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import type { PublicContactInfoOut, SocialPlatformEnum } from '@/src/api/types/public/cms'
import { useSendEmail } from './hook/useSendEmail'
import {
    CONTACT_EMAIL_DEFAULTS,
    contactEmailSchema,
    type ContactEmailValues,
} from './schema'
import {
    CONTACT_ADDRESS_DEFAULT,
    CONTACT_EMAIL_HOURS_DEFAULT,
    CONTACT_NUMBERS_DEFAULT,
    CONTACT_SOCIALS_DEFAULT,
} from '@/src/routes/contentManagment/contactUs/constants'

const SOCIAL_FIELDS: {
    key: keyof typeof CONTACT_SOCIALS_DEFAULT
    label: string
    icon: LucideIcon
    iconClassName: string
    boxClassName: string
}[] = [
        {
            key: 'instagram',
            label: 'اینستاگرام',
            icon: Instagram,
            boxClassName: 'bg-[#FBEDED]',
            iconClassName: 'text-[#D74E54]',
        },
        {
            key: 'telegram',
            label: 'تلگرام',
            icon: Send,
            boxClassName: 'bg-[#E8F0FB]',
            iconClassName: 'text-[#2A6FDB]',
        },
        {
            key: 'whatsapp',
            label: 'واتس‌آپ',
            icon: MessageCircle,
            boxClassName: 'bg-[#E8F5EF]',
            iconClassName: 'text-[#1F8A5B]',
        },
        {
            key: 'website',
            label: 'وب‌سایت',
            icon: Globe,
            boxClassName: 'bg-[#F1ECF7]',
            iconClassName: 'text-[#8E6CB0]',
        },
    ]

const MAP_SRC =
    'https://www.openstreetmap.org/export/embed.html?bbox=51.30%2C35.68%2C51.38%2C35.72&layer=mapnik&marker=35.6997%2C51.3380'

const SOCIAL_PLATFORM: Record<
    keyof typeof CONTACT_SOCIALS_DEFAULT,
    SocialPlatformEnum
> = {
    instagram: 'INSTAGRAM',
    telegram: 'TELEGRAM',
    whatsapp: 'WHATSAPP',
    website: 'WEBSITE',
}

const textOrDefault = (value: string | null | undefined, fallback: string) =>
    value?.trim() || fallback

const socialHref = (value: string) =>
    /^https?:\/\//i.test(value) ? value : `https://${value}`

const socialLabel = (value: string) => value.replace(/^https?:\/\//i, '')

const mapSrc = (latitude?: string | null, longitude?: string | null) => {
    const lat = Number(latitude)
    const lon = Number(longitude)
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return MAP_SRC

    const pad = 0.04
    const bbox = [lon - pad, lat - pad, lon + pad, lat + pad].join('%2C')
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`
}

type ContactUsProps = {
    contactInfo?: PublicContactInfoOut | null
}

const ContactUs = ({ contactInfo }: ContactUsProps) => {
    const numbers = {
        landline1: textOrDefault(
            contactInfo?.phone_numbers?.[0]?.value,
            CONTACT_NUMBERS_DEFAULT.landline1
        ),
        landline2: textOrDefault(
            contactInfo?.phone_numbers?.[1]?.value,
            CONTACT_NUMBERS_DEFAULT.landline2
        ),
        mobile1: textOrDefault(
            contactInfo?.mobile_numbers?.[0]?.value,
            CONTACT_NUMBERS_DEFAULT.mobile1
        ),
        mobile2: textOrDefault(
            contactInfo?.mobile_numbers?.[1]?.value,
            CONTACT_NUMBERS_DEFAULT.mobile2
        ),
    }
    const address = textOrDefault(contactInfo?.address, CONTACT_ADDRESS_DEFAULT)
    const emailHours = {
        email: textOrDefault(
            contactInfo?.email,
            CONTACT_EMAIL_HOURS_DEFAULT.email
        ),
        hours: textOrDefault(
            contactInfo?.working_hours,
            CONTACT_EMAIL_HOURS_DEFAULT.hours
        ),
    }
    const socials = SOCIAL_FIELDS.reduce(
        (result, field) => {
            const link = contactInfo?.social_links?.find(
                (item) => item.platform === SOCIAL_PLATFORM[field.key]
            )
            result[field.key] = textOrDefault(
                link?.url,
                CONTACT_SOCIALS_DEFAULT[field.key]
            )
            return result
        },
        {} as Record<keyof typeof CONTACT_SOCIALS_DEFAULT, string>
    )
    const { mutate: sendEmail, isPending } = useSendEmail()
    const { control, handleSubmit, reset, formState } = useForm<ContactEmailValues>({
        resolver: zodResolver(contactEmailSchema),
        defaultValues: CONTACT_EMAIL_DEFAULTS,
        mode: 'onChange',
    })

    const submitEmail = (values: ContactEmailValues) => {
        sendEmail(values, {
            onSuccess: () => reset(CONTACT_EMAIL_DEFAULTS),
        })
    }

    return (
        <section className='flex w-full flex-col gap-8 bg-surface-container-lowest py-10 lg:py-6xl' dir='rtl'>
            <h1 className='text-title-lg font-bold text-on-surface'>تماس با ما</h1>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='flex flex-col gap-6'>
                    {numbers && (
                        <div className='flex flex-col gap-2'>
                            <h2 className='text-title-md font-semibold text-on-surface'>شماره‌های تماس</h2>
                            {numbers.landline1 && (
                                <p className='text-body-md text-on-surface-variant'>{numbers.landline1}</p>
                            )}
                            {numbers.landline2 && (
                                <p className='text-body-md text-on-surface-variant'>{numbers.landline2}</p>
                            )}
                            {numbers.mobile1 && (
                                <p className='text-body-md text-on-surface-variant'>{numbers.mobile1}</p>
                            )}
                            {numbers.mobile2 && (
                                <p className='text-body-md text-on-surface-variant'>{numbers.mobile2}</p>
                            )}
                        </div>
                    )}
                    {address && (
                        <div className='flex flex-col gap-3'>
                            <h2 className='flex items-center gap-2 text-title-md font-semibold text-on-surface'>
                                <MapPin className='size-4' strokeWidth={1.8} />
                                آدرس
                            </h2>
                            <p className='text-body-md leading-8 text-on-surface-variant'>{address}</p>
                            <iframe
                                title='موقعیت روی نقشه'
                                src={mapSrc(contactInfo?.latitude, contactInfo?.longitude)}
                                className='h-[280px] w-full rounded-card-lg border border-outline-variant'
                                loading='lazy'
                            />
                        </div>
                    )}
                </div>
                <div className='flex flex-col gap-6'>
                    {emailHours && (
                        <div className='flex flex-col gap-2'>
                            <h2 className='text-title-md font-semibold text-on-surface'>ایمیل و ساعات کاری</h2>
                            {emailHours.email && (
                                <p className='text-body-md text-on-surface-variant'>{emailHours.email}</p>
                            )}
                            {emailHours.hours && (
                                <p className='text-body-md text-on-surface-variant'>{emailHours.hours}</p>
                            )}
                        </div>
                    )}
                    {socials && (
                        <div className='flex flex-col gap-3'>
                            <h2 className='text-title-md font-semibold text-on-surface'>شبکه‌های اجتماعی</h2>
                            {SOCIAL_FIELDS.map(({ key, label, icon: Icon, boxClassName, iconClassName }) => (
                                socials[key] && (
                                    <a
                                        key={key}
                                        href={socialHref(socials[key])}
                                        className='flex items-center gap-2.5'
                                    >
                                        <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-card-md', boxClassName)}>
                                            <Icon className={cn('size-4', iconClassName)} strokeWidth={1.8} />
                                        </span>
                                        <span className='flex flex-col'>
                                            <span className='text-label-md text-on-surface-variant'>{label}</span>
                                            <span className='text-body-md text-on-surface' dir='ltr'>{socialLabel(socials[key])}</span>
                                        </span>
                                    </a>
                                )
                            ))}
                        </div>
                    )}
                </div>
                <form
                    className='flex flex-col gap-3 rounded-card-lg bg-surface-container-high p-5 md:col-span-2'
                    onSubmit={handleSubmit(submitEmail)}
                >
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-title-md font-semibold text-on-surface-variant'>
                            ارسال ایمیل
                        </h2>
                        <p className='text-body-md text-outline'>
                            پیام خود را بنویسید تا از طریق ایمیل برای پشتیبانی ارسال شود.
                        </p>
                    </div>
                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-4'>
                        <Controller
                            name='name'
                            control={control}
                            render={({ field, fieldState }) => (
                                <Input
                                    label='نام'
                                    placeholder='نام'
                                    icon={<User className='size-5 shrink-0 text-on-surface-variant' strokeWidth={1.8} />}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!fieldState.error}
                                    msg={fieldState.error?.message}
                                    wrapperClassName='bg-surface-container-lowest'
                                />
                            )}
                        />
                        <Controller
                            name='phone'
                            control={control}
                            render={({ field, fieldState }) => (
                                <Input
                                    label='شماره تماس'
                                    placeholder='شماره تماس'
                                    type='tel'
                                    dir='ltr'
                                    icon={<Phone className='size-5 shrink-0 text-on-surface-variant' strokeWidth={1.8} />}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!fieldState.error}
                                    msg={fieldState.error?.message}
                                    wrapperClassName='bg-surface-container-lowest'
                                />
                            )}
                        />
                        <Controller
                            name='title'
                            control={control}
                            render={({ field, fieldState }) => (
                                <Input
                                    label='عنوان'
                                    placeholder='عنوان'
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!fieldState.error}
                                    msg={fieldState.error?.message}
                                    wrapperClassName='bg-surface-container-lowest'
                                    containerClassName='row-start-2 col-span-2'
                                />
                            )}
                        />
                    </div>
                    <Controller
                        name='message'
                        control={control}
                        render={({ field, fieldState }) => (
                            <Textarea
                                {...field}
                                placeholder='متن پیام'
                                aria-invalid={!!fieldState.error}
                                className='min-h-28 bg-surface-container-lowest resize-none'
                            />
                        )}
                    />
                    <Button
                        type='submit'
                        className='w-fit'
                        isLoading={isPending}
                        disabled={isPending}
                    >
                        ارسال
                    </Button>
                </form>
            </div>
        </section>
    )
}

export default ContactUs
