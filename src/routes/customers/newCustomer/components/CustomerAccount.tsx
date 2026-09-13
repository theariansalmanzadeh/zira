'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Input } from '@/src/shared/components/ui/Input'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import {
    COOPERATION_LEVEL_OPTIONS,
    CUSTOMER_STATUS_OPTIONS,
    CUSTOMER_TYPE_OPTIONS,
    USER_LEVEL_OPTIONS,
    type NewCustomerFormValues,
} from '../schema'

const CustomerAccount = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<NewCustomerFormValues>()

    return (
        <div className="flex flex-col gap-6" dir="rtl">
            <div className="flex flex-col gap-3">
                <span className="text-label-lg text-on-surface">حساب کاربری</span>
                <div className="flex flex-col gap-4 rounded-card-md bg-surface-container-lowest p-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="نام کاربری"
                                    placeholder="cu-7363"
                                    dir="ltr"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.username}
                                    msg={errors.username?.message}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="رمز ورود"
                                    type="text"
                                    placeholder="حداقل ۸ کاراکتر"
                                    dir="ltr"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.password}
                                    msg={errors.password?.message}
                                />
                            )}
                        />
                    </div>

                    <div className="flex items-start gap-3 rounded-container-lg bg-info-container px-4 py-3.5">
                        <Icon
                            label="info300Linear"
                            className="mt-0.5 size-5! shrink-0 text-info"
                        />
                        <span className="text-label-md leading-relaxed text-info">
                            پس از تایید درخواست، نام کاربری و رمز ورود به‌صورت
                            پیامک برای مشتری ارسال می‌شود.
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <span className="text-label-lg text-on-surface">
                    سطح‌بندی و وضعیت
                </span>
                <div className="rounded-card-md bg-surface-container-lowest p-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <Controller
                            name="customerType"
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label="نوع مشتری"
                                    value={field.value}
                                    options={CUSTOMER_TYPE_OPTIONS}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name="cooperationLevel"
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label="سطح همکاری"
                                    value={field.value}
                                    options={COOPERATION_LEVEL_OPTIONS}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name="userLevel"
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label="سطح کاربر (۱ تا ۳)"
                                    value={field.value}
                                    options={USER_LEVEL_OPTIONS}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name="customerStatus"
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label="وضعیت مشتری"
                                    value={field.value}
                                    options={CUSTOMER_STATUS_OPTIONS}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerAccount
