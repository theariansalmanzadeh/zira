'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { toEnglishDigits } from '@/src/shared/schema/generalSchema'
import {
    CHEQUE_LEVEL_OPTIONS,
    GOLD_STEP_INCREASE_OPTIONS,
    MARKETER_OPTIONS,
    type NewCustomerFormValues,
} from '../schema'
import CreditProof from './CreditProof'

const sanitizeNumericInput = (value: string) =>
    toEnglishDigits(value).replace(/[^\d.]/g, '')

const Credit = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<NewCustomerFormValues>()

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <div className="flex flex-col gap-1">
                <span className="text-label-lg text-on-surface">
                    بازاریاب و اعتبار
                </span>
                <span className="text-label-md text-outline">
                    این مقادیر توسط کارشناس تعیین می‌شود و در پنل مشتری نمایش داده
                    نمی‌شود.
                </span>
            </div>

            <div className="flex flex-col gap-6 rounded-card-md bg-surface-container-lowest p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Controller
                        name="marketerId"
                        control={control}
                        render={({ field }) => (
                            <FormDropdown
                                label="تخصیص بازاریاب"
                                value={field.value}
                                options={MARKETER_OPTIONS}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        name="marketerPercent"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="درصد بازاریاب"
                                placeholder={formatFaNumber(3, {
                                    useGrouping: false,
                                })}
                                inputMode="decimal"
                                value={
                                    field.value
                                        ? formatFaNumber(field.value, {
                                            useGrouping: false,
                                        })
                                        : ''
                                }
                                onChange={(value) =>
                                    field.onChange(sanitizeNumericInput(value))
                                }
                                error={!!errors.marketerPercent}
                                msg={errors.marketerPercent?.message}
                            />
                        )}
                    />
                    <Controller
                        name="chequeCredit"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="تخصیص اعتبار چکی (تومان)"
                                placeholder={formatFaNumber(200000000)}
                                inputMode="numeric"
                                value={
                                    field.value
                                        ? formatFaNumber(field.value)
                                        : ''
                                }
                                onChange={(value) =>
                                    field.onChange(sanitizeNumericInput(value))
                                }
                                error={!!errors.chequeCredit}
                                msg={errors.chequeCredit?.message}
                            />
                        )}
                    />
                    <Controller
                        name="chequeLevel"
                        control={control}
                        render={({ field }) => (
                            <FormDropdown
                                label="سطح اعتبار چک (۱ تا ۷)"
                                value={field.value}
                                options={CHEQUE_LEVEL_OPTIONS}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        name="goldCredit"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="تخصیص اعتبار طلایی (تومان)"
                                placeholder={formatFaNumber(150000000)}
                                inputMode="numeric"
                                value={
                                    field.value
                                        ? formatFaNumber(field.value)
                                        : ''
                                }
                                onChange={(value) =>
                                    field.onChange(sanitizeNumericInput(value))
                                }
                                error={!!errors.goldCredit}
                                msg={errors.goldCredit?.message}
                            />
                        )}
                    />
                    <Controller
                        name="goldStepIncrease"
                        control={control}
                        render={({ field }) => (
                            <FormDropdown
                                label="افزایش پله‌ای اعتبار طلایی"
                                value={field.value}
                                options={GOLD_STEP_INCREASE_OPTIONS}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>
            </div>
            <CreditProof />
        </div>
    )
}

export default Credit
