'use client'

import { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import {
    GENDER_OPTIONS,
    type NewCustomerFormValues,
} from '../schema'

const IdentityInfo = () => {
    const licenseInputRef = useRef<HTMLInputElement>(null)
    const {
        control,
        formState: { errors },
    } = useFormContext<NewCustomerFormValues>()

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <span className="text-label-lg text-on-surface">اطلاعات هویتی</span>
            <div className="flex flex-col gap-6 rounded-card-md bg-surface-container-lowest p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="نام"
                                placeholder="مثلاً آریا"
                                value={field.value}
                                onChange={field.onChange}
                                error={!!errors.firstName}
                                msg={errors.firstName?.message}
                            />
                        )}
                    />
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="نام خانوادگی"
                                placeholder="مثلاً صفوی"
                                value={field.value}
                                onChange={field.onChange}
                                error={!!errors.lastName}
                                msg={errors.lastName?.message}
                            />
                        )}
                    />
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <FormDropdown
                                label="جنسیت"
                                placeholder="انتخاب کنید"
                                value={field.value}
                                options={GENDER_OPTIONS}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        name="nationalId"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="کد ملی"
                                placeholder="۰۰۷۲۳۴۵۶۸۹"
                                inputMode="numeric"
                                value={field.value}
                                onChange={field.onChange}
                                error={!!errors.nationalId}
                                msg={errors.nationalId?.message}
                            />
                        )}
                    />
                    <Controller
                        name="businessLicenseNumber"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="شماره پروانه کسب"
                                placeholder="۰۲۲۸۴۵۱"
                                inputMode="numeric"
                                value={field.value}
                                onChange={field.onChange}
                                error={!!errors.businessLicenseNumber}
                                msg={errors.businessLicenseNumber?.message}
                            />
                        )}
                    />
                </div>

                <div className="flex flex-col items-stretch justify-between gap-4 rounded-container-lg border border-dashed border-outline-variant bg-surface-container-high/40 p-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-container-md bg-primary-container">
                            <Icon
                                label="upload300Linear"
                                className="size-6 text-on-primary-container"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-label-lg text-on-surface">
                                تصویر پروانه کسب
                            </span>
                            <span className="text-label-md text-outline">
                                فرمت JPG یا PNG — حداکثر ۵ مگابایت
                            </span>
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant="primary-outline"
                        className="shrink-0"
                        onClick={() => licenseInputRef.current?.click()}
                    >
                        انتخاب فایل
                    </Button>
                    <input
                        ref={licenseInputRef}
                        type="file"
                        accept="image/jpeg,image/png"
                        className="hidden"
                    />
                </div>
            </div>
        </div>
    )
}

export default IdentityInfo
