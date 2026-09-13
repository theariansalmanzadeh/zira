'use client'

import { useState } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { cn } from '@shared/libs/utils'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import CustomerLevel from './CustomerLevel'

type InfoField = {
    label: string
    value: string
    dir?: 'rtl' | 'ltr'
    fullWidth?: boolean
}

const INFO_FIELDS: InfoField[] = [
    { label: 'نام', value: 'آیدا' },
    { label: 'نام خانوادگی', value: 'میرزایی' },
    { label: 'جنسیت', value: 'زن' },
    { label: 'نام کاربری', value: 'cu-7362', dir: 'ltr' },
    { label: 'کد ملی', value: formatFaNumber('0072345689') },
    { label: 'شماره پروانه کسب', value: formatFaNumber('0228451') },
    { label: 'موبایل ۱', value: '+۹۸ ۹۱۲ ۶۷۳ ۲۱۲۳', dir: 'ltr' },
    { label: 'موبایل ۲', value: '+۹۸ ۹۳۵ ۱۲۰ ۸۸۴۵', dir: 'ltr' },
    { label: 'تلفن ثابت', value: formatFaNumber('021 2284 5510') },
    { label: 'نام معرف', value: 'بهرام اکبری' },
    {
        label: 'آدرس',
        value: 'تهران، ولنجک، خیابان ۱۹، پلاک ۸، واحد ۳',
        fullWidth: true,
    },
]

type UserStatus = 'active' | 'inactive' | 'blocked'

const STATUS_OPTIONS: {
    value: UserStatus
    label: string
    sub: string
}[] = [
    {
        value: 'active',
        label: 'فعال',
        sub: 'دسترسی کامل به ثبت سفارش',
    },
    {
        value: 'inactive',
        label: 'غیرفعال',
        sub: 'حساب موقتاً غیرفعال',
    },
    {
        value: 'blocked',
        label: 'مسدود به دلایل مالی',
        sub: 'ثبت سفارش اعتباری ممنوع',
    },
]

const Infos = () => {
    const [status, setStatus] = useState<UserStatus>('active')

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
                    {INFO_FIELDS.map((field) => (
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

                <div className="mt-5 flex flex-row flex-wrap items-center gap-3 border-t border-outline-variant pt-4">
                    <div className="flex flex-row items-center gap-3">
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-[11px] bg-warning-container text-on-warning-container">
                            <Icon label="fileCheck400Linear" className="size-6!" />
                        </div>
                        <div>
                            <div className="text-label-md font-semibold text-on-surface-variant">
                                تصویر پروانه کسب
                            </div>
                            <div className="mt-0.5 text-label-sm text-outline">
                                شماره {formatFaNumber('0228451')} — صنف پوشاک
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="mr-auto border-primary/30 text-primary hover:bg-primary-container"
                    >
                        <span className="text-label-sm text-primary">نمایش تصویر</span>
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-4">
                <div className="rounded-card-md border border-outline-variant bg-surface-container-lowest p-5">
                    <h3 className="text-title-sm font-semibold text-on-surface">
                        وضعیت کاربر
                    </h3>
                    <p className="mt-1.5 mb-3.5 text-label-sm text-outline">
                        تغییر وضعیت بر دسترسی ثبت سفارش اثر می‌گذارد.
                    </p>
                    <div className="flex flex-col gap-2">
                        {STATUS_OPTIONS.map((option) => {
                            const selected = status === option.value
                            const isActiveOption = option.value === 'active'

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setStatus(option.value)}
                                    className={cn(
                                        'flex w-full flex-row items-center gap-2.5 rounded-[11px] border-[1.5px] p-3 text-right transition-colors',
                                        selected && isActiveOption
                                            ? 'border-success bg-success-container/40'
                                            : selected
                                                ? 'border-primary bg-primary-hovered'
                                                : 'border-outline-variant bg-surface-container-lowest'
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'flex size-[18px] shrink-0 items-center justify-center rounded-full border-2',
                                            selected && isActiveOption
                                                ? 'border-success'
                                                : selected
                                                    ? 'border-primary'
                                                    : 'border-outline-variant'
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                'size-2.5 rounded-full',
                                                selected && isActiveOption
                                                    ? 'bg-success'
                                                    : selected
                                                        ? 'bg-primary'
                                                        : 'bg-transparent'
                                            )}
                                        />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <div
                                            className={cn(
                                                'text-label-md font-bold',
                                                selected && isActiveOption
                                                    ? 'text-success'
                                                    : 'text-on-surface'
                                            )}
                                        >
                                            {option.label}
                                        </div>
                                        <div className="mt-0.5 text-label-sm text-outline">
                                            {option.sub}
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                <CustomerLevel />
            </div>
        </div>
    )
}

export default Infos
