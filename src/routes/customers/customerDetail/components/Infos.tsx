'use client'

import { useParams } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { useGetCustomerProfile } from '@/src/routes/customers/hooks/customers'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useModalStore } from '@/src/shared/store/modal-store'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import { displayValue } from '../display'
import { useCustomerProfileDocuments } from '../hooks/useCustomerProfileDocuments'
import CustomerLevel from './CustomerLevel'
import CustomerStatus from './CustomerStatus'

type InfoField = {
    label: string
    value: string
    dir?: 'rtl' | 'ltr'
    fullWidth?: boolean
}

const shown = (value?: string | number | null, numeric = false) => {
    const text = displayValue(value)
    if (text === '-' || !numeric) return text
    return formatFaNumber(text)
}

const Infos = () => {
    const params = useParams<{ id: string }>()
    const customerId = params.id ?? ''
    const openModal = useModalStore((state) => state.openModal)
    const { data: profile } = useGetCustomerProfile(
        customerId,
        Boolean(customerId)
    )
    const { rows } = useCustomerProfileDocuments(customerId)
    const identity = profile?.identity
    const fields: InfoField[] = [
        { label: 'نام', value: displayValue(identity?.first_name) },
        { label: 'نام خانوادگی', value: displayValue(identity?.last_name) },
        { label: 'جنسیت', value: displayValue(identity?.gender) },
        { label: 'نام کاربری', value: '-', dir: 'ltr' },
        { label: 'کد ملی', value: shown(identity?.national_id, true) },
        {
            label: 'شماره پروانه کسب',
            value: shown(profile?.business_license_no, true),
        },
        { label: 'موبایل ۱', value: shown(identity?.mobile, true), dir: 'ltr' },
        { label: 'موبایل ۲', value: shown(profile?.mobile_2, true), dir: 'ltr' },
        { label: 'تلفن ثابت', value: shown(profile?.phone, true), dir: 'ltr' },
        { label: 'نام معرف', value: displayValue(profile?.referrer_name) },
        { label: 'آدرس', value: '-', fullWidth: true },
    ]
    const openDocument = (downloadUrl: string) => {
        if (!downloadUrl) return
        const link = window.document.createElement('a')
        link.href = downloadUrl
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        window.document.body.appendChild(link)
        link.click()
        link.remove()
    }

    return (
        <div
            className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start"
            dir="rtl"
        >
            <div className="rounded-card-md border border-outline-variant bg-surface-container-lowest p-5 lg:col-span-8">
                <h3 className="mb-4 text-title-md font-semibold text-on-surface">
                    اطلاعات هویتی و تماس
                </h3>

                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                    {fields.map((field) => (
                        <div
                            key={field.label}
                            className={cn(field.fullWidth && 'sm:col-span-2')}
                        >
                            <div className="mb-1 text-label-sm text-outline">
                                {field.label}
                            </div>
                            <div
                                className="text-label-lg font-semibold text-on-surface-variant"
                                dir={field.dir}
                            >
                                {field.value}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-5 flex flex-col gap-3 border-t border-outline-variant pt-4">
                    {rows.length === 0 ? (
                        <p className="text-label-md text-outline">-</p>
                    ) : (
                        rows.map((row) => (
                            <div
                                key={row.id}
                                className="flex flex-row flex-wrap items-center gap-3"
                            >
                                <div className="flex flex-row items-center gap-3">
                                    <div className="flex size-14 shrink-0 items-center justify-center rounded-[11px] bg-warning-container text-on-warning-container">
                                        <Icon
                                            label="fileCheck400Linear"
                                            className="size-6!"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-label-md font-semibold text-on-surface-variant">
                                            {row.title}
                                        </div>
                                        <div className="mt-0.5 text-label-sm text-outline">
                                            {row.subtitle}
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="mr-auto border-primary/30 text-primary hover:bg-primary-container"
                                    disabled={!row.downloadUrl}
                                    onClick={() => openDocument(row.downloadUrl)}
                                >
                                    <span className="text-label-sm text-primary">
                                        نمایش تصویر
                                    </span>
                                </Button>
                            </div>
                        ))
                    )}
                    <Button
                        type="button"
                        variant="primary-outline"
                        className="self-start"
                        onClick={() =>
                            openModal(ModalTypes.ADD_CUSTOMER_DOCUMENTS, {
                                customerId,
                            })
                        }
                    >
                        افزودن مدرک
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-4">
                <CustomerStatus />
                <CustomerLevel userLevel={profile?.verification_level} />
            </div>
        </div>
    )
}

export default Infos
