'use client'

import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import { CopyableInput } from '@/src/shared/components/ui/CopyableInput'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import { Icon } from '@/src/shared/components/Icons/Icon'
import Seperator from '@/src/shared/components/ui/Seperator'
import {
    FUND_OPTIONS,
    PARTY_OPTIONS,
    RECEIPT_TYPE_OPTIONS,
} from './constants'
import {
    NEW_RECEIPT_DEFAULT_VALUES,
    newReceiptSchema,
    type NewReceiptFormValues,
} from './schema'

const NewReciept = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<NewReceiptFormValues>({
        resolver: zodResolver(newReceiptSchema),
        defaultValues: NEW_RECEIPT_DEFAULT_VALUES,
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    })

    const onSubmit = () => {}

    return (
        <div className="grid grid-cols-12 gap-4" dir="rtl">
            <div className="col-span-8">
                <span className="text-sm text-gray-500">سرفصل رسید</span>
                <form
                    id="new-receipt-form"
                    className="mt-2 grid grid-cols-1 gap-6 rounded-card-md bg-surface-container-lowest p-6 md:grid-cols-3"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Controller
                        name="receiptType"
                        control={control}
                        render={({ field }) => (
                            <FormDropdown
                                label="نوع رسید دریافت"
                                placeholder="انتخاب"
                                value={field.value}
                                options={RECEIPT_TYPE_OPTIONS}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        name="receiptId"
                        control={control}
                        render={({ field }) => (
                            <CopyableInput
                                label="شناسه رسید"
                                value={field.value}
                                onChange={field.onChange}
                                readOnly
                            />
                        )}
                    />
                    <Controller
                        name="party"
                        control={control}
                        render={({ field }) => (
                            <FormDropdown
                                label="طرف حساب"
                                placeholder="انتخاب"
                                value={field.value}
                                options={PARTY_OPTIONS}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        name="receiptDate"
                        control={control}
                        render={({ field }) => (
                            <CalendarButton
                                label="تاریخ"
                                placeholder=""
                                value={
                                    field.value
                                        ? new Date(field.value)
                                        : undefined
                                }
                                onChange={(date) =>
                                    field.onChange(
                                        date ? date.toISOString() : ''
                                    )
                                }
                            />
                        )}
                    />
                    <Controller
                        name="destinationFund"
                        control={control}
                        render={({ field }) => (
                            <FormDropdown
                                label="صندوق مقصد"
                                placeholder="انتخاب"
                                value={field.value}
                                options={FUND_OPTIONS}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        name="amount"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="مبلغ (تومان)"
                                value={field.value}
                                onChange={field.onChange}
                                inputMode="numeric"
                                error={!!errors.amount}
                                msg={errors.amount?.message}
                            />
                        )}
                    />
                    <div className="md:col-span-3">
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="شرح سند"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>

                    <Seperator className="md:col-span-3" />

                    <div className="flex flex-row items-center justify-between gap-4 md:col-span-3">
                        <span className="shrink-0 text-label-md text-on-surface-variant">
                            تصویر رسید
                        </span>
                        <Button
                            type="button"
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Icon
                                label="attachment400Linear"
                                className="size-5!"
                            />
                            <span className="text-label-md">بارگذاری</span>
                        </Button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(event) => {
                                const file = event.target.files?.[0] ?? null
                                setValue('receiptImage', file, {
                                    shouldValidate: true,
                                })
                            }}
                        />
                    </div>
                </form>
            </div>
            <div className="col-span-4">
                <span className="text-sm text-gray-500">خلاصه</span>
                <div className="flex justify-between">
                    <span>نوع رسید</span>
                </div>
                <div className="flex justify-between">
                    <span>طرف حساب</span>
                </div>
                <div className="flex justify-between">
                    <span>مبلغ</span>
                </div>
                <Button type="submit" form="new-receipt-form" variant="primary">
                    ثبت رسید
                </Button>
            </div>
        </div>
    )
}

export default NewReciept
