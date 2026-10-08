'use client'

import { Controller, useFormContext } from 'react-hook-form'
import DocumentFileUpload from '@/src/shared/components/ui/DocumentFileUpload'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import {
    GENDER_OPTIONS,
    type NewCustomerFormValues,
} from '../schema'

const IdentityInfo = () => {
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

                <DocumentFileUpload
                    title="تصویر پروانه کسب"
                    hint="فرمت JPG یا PNG — حداکثر ۵ مگابایت"
                    accept="image/jpeg,image/png"
                />
            </div>
        </div>
    )
}

export default IdentityInfo
