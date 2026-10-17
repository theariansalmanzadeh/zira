'use client'

import { useFormContext } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import { registerInput } from '../registerInput'
import type { ContactUsFormValues } from '../schema'

const EmailAndHours = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<ContactUsFormValues>()
    const emailHoursErrors = errors.emailHours

    return (
        <section className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5">
            <h2 className="mb-4 text-title-md font-semibold text-on-surface">
                ایمیل و ساعات کاری
            </h2>
            <div className="flex flex-col gap-3.5">
                <Input
                    label="ایمیل پشتیبانی"
                    {...registerInput(register('emailHours.email'))}
                    error={!!emailHoursErrors?.email}
                    msg={emailHoursErrors?.email?.message}
                    dir="ltr"
                    className="text-left"
                />
                <Input
                    label="ساعات کاری"
                    {...registerInput(register('emailHours.hours'))}
                    error={!!emailHoursErrors?.hours}
                    msg={emailHoursErrors?.hours?.message}
                />
            </div>
        </section>
    )
}

export default EmailAndHours
