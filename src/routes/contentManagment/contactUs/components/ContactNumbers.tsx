'use client'

import { useFormContext } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import { registerInput } from '../registerInput'
import type { ContactUsFormValues } from '../schema'

const ContactNumbers = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<ContactUsFormValues>()
    const phoneErrors = errors.phones

    return (
        <section className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5">
            <h2 className="mb-4 text-title-md font-semibold text-on-surface">
                شماره‌های تماس
            </h2>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <Input
                    label="تلفن ثابت ۱"
                    {...registerInput(register('phones.landline1'))}
                    error={!!phoneErrors?.landline1}
                    msg={phoneErrors?.landline1?.message}
                    dir="ltr"
                    className="text-right"
                />
                <Input
                    label="تلفن ثابت ۲"
                    {...registerInput(register('phones.landline2'))}
                    error={!!phoneErrors?.landline2}
                    msg={phoneErrors?.landline2?.message}
                    dir="ltr"
                    className="text-right"
                />
                <Input
                    label="موبایل ۱"
                    {...registerInput(register('phones.mobile1'))}
                    error={!!phoneErrors?.mobile1}
                    msg={phoneErrors?.mobile1?.message}
                    dir="ltr"
                    className="text-right"
                />
                <Input
                    label="موبایل ۲ (پشتیبانی)"
                    {...registerInput(register('phones.mobile2'))}
                    error={!!phoneErrors?.mobile2}
                    msg={phoneErrors?.mobile2?.message}
                    dir="ltr"
                    className="text-right"
                />
            </div>
        </section>
    )
}

export default ContactNumbers
