'use client'

import { Input } from '@/src/shared/components/ui/Input'
import { CONTACT_EMAIL_HOURS_DEFAULT } from '../constants'

export type EmailAndHoursValues = {
    email: string
    hours: string
}

type EmailAndHoursProps = {
    values?: EmailAndHoursValues
    onChange?: (values: EmailAndHoursValues) => void
}

const EmailAndHours = ({
    values = CONTACT_EMAIL_HOURS_DEFAULT,
    onChange,
}: EmailAndHoursProps) => {
    const update = (key: keyof EmailAndHoursValues, value: string) => {
        onChange?.({ ...values, [key]: value })
    }

    return (
        <section className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5">
            <h2 className="mb-4 text-title-md font-semibold text-on-surface">
                ایمیل و ساعات کاری
            </h2>
            <div className="flex flex-col gap-3.5">
                <Input
                    label="ایمیل پشتیبانی"
                    value={values.email}
                    onChange={(value) => update('email', value)}
                    dir="ltr"
                    className="text-left"
                />
                <Input
                    label="ساعات کاری"
                    value={values.hours}
                    onChange={(value) => update('hours', value)}
                />
            </div>
        </section>
    )
}

export default EmailAndHours
