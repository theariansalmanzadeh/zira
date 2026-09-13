'use client'

import type { LucideIcon } from 'lucide-react'
import { Globe, Instagram, MessageCircle, Send } from 'lucide-react'
import { Input } from '@/src/shared/components/ui/Input'
import { cn } from '@shared/libs/utils'
import { CONTACT_SOCIALS_DEFAULT } from '../constants'

export type SocialNetworksValues = {
    instagram: string
    telegram: string
    whatsapp: string
    website: string
}

type SocialNetworksProps = {
    values?: SocialNetworksValues
    onChange?: (values: SocialNetworksValues) => void
}

const SOCIAL_FIELDS: {
    key: keyof SocialNetworksValues
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

const SocialNetworks = ({
    values = CONTACT_SOCIALS_DEFAULT,
    onChange,
}: SocialNetworksProps) => {
    const update = (key: keyof SocialNetworksValues, value: string) => {
        onChange?.({ ...values, [key]: value })
    }

    return (
        <section className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5">
            <h2 className="mb-4 text-title-md font-semibold text-on-surface">
                شبکه‌های اجتماعی
            </h2>
            <div className="flex flex-col gap-3">
                {SOCIAL_FIELDS.map(
                    ({ key, label, icon: Icon, boxClassName, iconClassName }) => (
                        <div key={key} className="flex flex-col">
                            <span className="mb-1.5 text-label-md text-on-surface-variant">
                                {label}
                            </span>
                            <div className="flex items-center gap-2.5">
                                <div
                                    className={cn(
                                        'flex size-10 shrink-0 items-center justify-center rounded-card-md',
                                        boxClassName
                                    )}
                                >
                                    <Icon
                                        className={cn('size-4', iconClassName)}
                                        strokeWidth={1.8}
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <Input
                                        value={values[key]}
                                        onChange={(value) => update(key, value)}
                                        dir="ltr"
                                        className="text-left"
                                    />
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    )
}

export default SocialNetworks
