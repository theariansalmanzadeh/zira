'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import type { NewCustomerFormValues } from '../schema'

const AddressAndContact = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<NewCustomerFormValues>()

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <span className="text-label-lg text-on-surface">تماس و آدرس</span>
            <div className="rounded-card-md bg-surface-container-lowest p-10">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Controller
                        name="mobile1"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="موبایل ۱"
                                placeholder="+98 912 000 0000"
                                inputMode="tel"
                                value={field.value}
                                onChange={field.onChange}
                                error={!!errors.mobile1}
                                msg={errors.mobile1?.message}
                            />
                        )}
                    />
                    <Controller
                        name="mobile2"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="موبایل ۲"
                                placeholder="+98 935 000 0000"
                                inputMode="tel"
                                value={field.value ?? ''}
                                onChange={field.onChange}
                                error={!!errors.mobile2}
                                msg={errors.mobile2?.message}
                            />
                        )}
                    />
                    <Controller
                        name="landline"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="تلفن ثابت"
                                placeholder="۰۲۱ ۰۰۰۰ ۰۰۰۰"
                                inputMode="tel"
                                value={field.value ?? ''}
                                onChange={field.onChange}
                                error={!!errors.landline}
                                msg={errors.landline?.message}
                            />
                        )}
                    />
                    <Controller
                        name="referrerName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="نام معرف"
                                placeholder="نام بازاریاب یا مشتری معرف"
                                value={field.value ?? ''}
                                onChange={field.onChange}
                                error={!!errors.referrerName}
                                msg={errors.referrerName?.message}
                            />
                        )}
                    />
                    <div className="sm:col-span-2">
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="آدرس"
                                    placeholder="استان، شهر، خیابان، پلاک"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.address}
                                    msg={errors.address?.message}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressAndContact
