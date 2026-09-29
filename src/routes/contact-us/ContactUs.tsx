'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Globe, Instagram, MapPin, MessageCircle, Send } from 'lucide-react'
import { cn } from '@shared/libs/utils'
import { Button } from '@/src/shared/components/ui/button'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { useSendEmail } from './hook/useSendEmail'
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

const ContactUs = () => {
    const [message, setMessage] = useState('')
    const sendEmail = useSendEmail()

    const submitEmail = () => {
        const trimmed = message.trim()
        if (!trimmed) return

        sendEmail.mutate(
            { message: trimmed },
            { onSuccess: () => setMessage('') }
        )
    }

    return (
        <section className='flex w-full flex-col gap-8 bg-surface-container-lowest py-10 lg:py-6xl' dir='rtl'>
            <h1 className='text-title-lg font-bold text-on-surface'>تماس با ما</h1>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='flex flex-col gap-6'>
                    {CONTACT_NUMBERS_DEFAULT && (
                        <div className='flex flex-col gap-2'>
                            <h2 className='text-title-md font-semibold text-on-surface'>شماره‌های تماس</h2>
                            {CONTACT_NUMBERS_DEFAULT.landline1 && (
                                <p className='text-body-md text-on-surface-variant'>{CONTACT_NUMBERS_DEFAULT.landline1}</p>
                            )}
                            {CONTACT_NUMBERS_DEFAULT.landline2 && (
                                <p className='text-body-md text-on-surface-variant'>{CONTACT_NUMBERS_DEFAULT.landline2}</p>
                            )}
                            {CONTACT_NUMBERS_DEFAULT.mobile1 && (
                                <p className='text-body-md text-on-surface-variant'>{CONTACT_NUMBERS_DEFAULT.mobile1}</p>
                            )}
                            {CONTACT_NUMBERS_DEFAULT.mobile2 && (
                                <p className='text-body-md text-on-surface-variant'>{CONTACT_NUMBERS_DEFAULT.mobile2}</p>
                            )}
                        </div>
                    )}
                    {CONTACT_ADDRESS_DEFAULT && (
                        <div className='flex flex-col gap-3'>
                            <h2 className='flex items-center gap-2 text-title-md font-semibold text-on-surface'>
                                <MapPin className='size-4' strokeWidth={1.8} />
                                آدرس
                            </h2>
                            <p className='text-body-md leading-8 text-on-surface-variant'>{CONTACT_ADDRESS_DEFAULT}</p>
                            <iframe
                                title='موقعیت روی نقشه'
                                src={MAP_SRC}
                                className='h-[280px] w-full rounded-card-lg border border-outline-variant'
                                loading='lazy'
                            />
                        </div>
                    )}
                </div>
                <div className='flex flex-col gap-6'>
                    {CONTACT_EMAIL_HOURS_DEFAULT && (
                        <div className='flex flex-col gap-2'>
                            <h2 className='text-title-md font-semibold text-on-surface'>ایمیل و ساعات کاری</h2>
                            {CONTACT_EMAIL_HOURS_DEFAULT.email && (
                                <p className='text-body-md text-on-surface-variant'>{CONTACT_EMAIL_HOURS_DEFAULT.email}</p>
                            )}
                            {CONTACT_EMAIL_HOURS_DEFAULT.hours && (
                                <p className='text-body-md text-on-surface-variant'>{CONTACT_EMAIL_HOURS_DEFAULT.hours}</p>
                            )}
                        </div>
                    )}
                    {CONTACT_SOCIALS_DEFAULT && (
                        <div className='flex flex-col gap-3'>
                            <h2 className='text-title-md font-semibold text-on-surface'>شبکه‌های اجتماعی</h2>
                            {SOCIAL_FIELDS.map(({ key, label, icon: Icon, boxClassName, iconClassName }) => (
                                CONTACT_SOCIALS_DEFAULT[key] && (
                                    <a
                                        key={key}
                                        href={`https://${CONTACT_SOCIALS_DEFAULT[key]}`}
                                        className='flex items-center gap-2.5'
                                    >
                                        <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-card-md', boxClassName)}>
                                            <Icon className={cn('size-4', iconClassName)} strokeWidth={1.8} />
                                        </span>
                                        <span className='flex flex-col'>
                                            <span className='text-label-md text-on-surface-variant'>{label}</span>
                                            <span className='text-body-md text-on-surface' dir='ltr'>{CONTACT_SOCIALS_DEFAULT[key]}</span>
                                        </span>
                                    </a>
                                )
                            ))}
                        </div>
                    )}
                </div>
                <div className='flex flex-col gap-3 rounded-card-lg bg-surface-container-high p-5 md:col-span-2'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-title-md font-semibold text-on-surface-variant'>
                            ارسال ایمیل
                        </h2>
                        <p className='text-body-md text-outline'>
                            پیام خود را بنویسید تا از طریق ایمیل برای پشتیبانی ارسال شود.
                        </p>
                    </div>
                    <Textarea
                        value={message}
                        placeholder='متن پیام'
                        className='min-h-28 bg-surface-container-lowest'
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <Button
                        type='button'
                        className='w-fit'
                        disabled={!message.trim() || sendEmail.isPending}
                        isLoading={sendEmail.isPending}
                        onClick={submitEmail}
                    >
                        ارسال
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default ContactUs
