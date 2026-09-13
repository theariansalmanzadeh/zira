'use client'

import { Input } from '@/src/shared/components/ui/Input'
import { CONTACT_NUMBERS_DEFAULT } from '../constants'

export type ContactNumbersValues = {
    landline1: string
    landline2: string
    mobile1: string
    mobile2: string
}

type ContactNumbersProps = {
    values?: ContactNumbersValues
    onChange?: (values: ContactNumbersValues) => void
}

const ContactNumbers = ({
    values = CONTACT_NUMBERS_DEFAULT,
    onChange,
}: ContactNumbersProps) => {
    const update = (key: keyof ContactNumbersValues, value: string) => {
        onChange?.({ ...values, [key]: value })
    }

    return (
        <section className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5">
            <h2 className="mb-4 text-title-md font-semibold text-on-surface">
                شماره‌های تماس
            </h2>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <Input
                    label="تلفن ثابت ۱"
                    value={values.landline1}
                    onChange={(value) => update('landline1', value)}
                    dir="ltr"
                    className="text-right"
                />
                <Input
                    label="تلفن ثابت ۲"
                    value={values.landline2}
                    onChange={(value) => update('landline2', value)}
                    dir="ltr"
                    className="text-right"
                />
                <Input
                    label="موبایل ۱"
                    value={values.mobile1}
                    onChange={(value) => update('mobile1', value)}
                    dir="ltr"
                    className="text-right"
                />
                <Input
                    label="موبایل ۲ (پشتیبانی)"
                    value={values.mobile2}
                    onChange={(value) => update('mobile2', value)}
                    dir="ltr"
                    className="text-right"
                />
            </div>
        </section>
    )
}

export default ContactNumbers
