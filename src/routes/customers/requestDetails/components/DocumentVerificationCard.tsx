'use client'

import InfoCardField from '@/src/shared/components/infoCard/components/InfoCardField'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import type { DocumentVerificationData } from '../constants'

type DocumentVerificationCardProps = {
    data: DocumentVerificationData
}

const DocumentVerificationCard = ({ data }: DocumentVerificationCardProps) => {
    const fields = [
        { label: 'نام و نام خانوادگی', value: data.fullName },
        { label: 'جنسیت', value: data.gender },
        { label: 'نام کاربری درخواستی', value: data.username },
        { label: 'کد ملی', value: formatFaNumber(data.nationalId) },
        { label: 'شماره پروانه کسب', value: formatFaNumber(data.licenseNumber) },
        { label: 'موبایل ۱', value: data.mobile1 },
        { label: 'موبایل ۲', value: data.mobile2 },
        { label: 'تلفن ثابت', value: formatFaNumber(data.phone) },
        { label: 'نام معرف', value: data.referrerName },
        { label: 'آدرس', value: data.address },
    ]

    return (
        <div
            className="rounded-card-md bg-surface-container-lowest p-6"
            dir="rtl"
        >
            <div className="mb-6 flex flex-col gap-2 text-right">
                <h2 className="text-title-lg font-semibold text-on-surface">
                    تایید مدارک
                </h2>
                <p className="text-label-md text-outline">
                    اطلاعات و مدارک متقاضی را پیش از تایید بررسی کنید.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                {fields.map((field) => (
                    <InfoCardField
                        key={field.label}
                        label={field.label}
                        value={field.value}
                    />
                ))}
            </div>
        </div>
    )
}

export default DocumentVerificationCard
