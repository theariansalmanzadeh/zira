'use client'

import { Controller, useFormContext } from 'react-hook-form'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import DocumentFileUpload from '@/src/shared/components/ui/DocumentFileUpload'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import SelectItem from '@/src/shared/components/ui/SelectItem'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { toEnglishDigits } from '@/src/shared/schema/generalSchema'
import { cn } from '@shared/libs/utils'
import {
    BANK_OPTIONS,
    CREDIT_RELATED_OPTIONS,
    GUARANTEE_STATUS_OPTIONS,
} from '../constants/creditProof'
import type { NewCustomerFormValues } from '../schema'

const sanitizeNumericInput = (value: string) =>
    toEnglishDigits(value).replace(/[^\d]/g, '')

const FieldError = ({ message }: { message?: string }) =>
    message ? <span className="text-sm text-error">{message}</span> : null

const PersonalChequeForm = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<NewCustomerFormValues>()
    const guaranteeErrors = errors.guarantee

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                    <Controller
                        name="guarantee.creditRelated"
                        control={control}
                        render={({ field }) => (
                            <FormDropdown
                                label="مربوط به اعتبار"
                                value={field.value}
                                options={CREDIT_RELATED_OPTIONS}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <FieldError message={guaranteeErrors?.creditRelated?.message} />
                </div>
                <Controller
                    name="guarantee.amount"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="مبلغ ضمانت (تومان)"
                            inputMode="numeric"
                            value={field.value ? formatFaNumber(field.value) : ''}
                            onChange={(value) =>
                                field.onChange(sanitizeNumericInput(value))
                            }
                            error={!!guaranteeErrors?.amount}
                            msg={guaranteeErrors?.amount?.message}
                        />
                    )}
                />
                <Controller
                    name="guarantee.chequeNumber"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="شماره چک (صیادی)"
                            placeholder="رقم شناسه صیاد ۱۶"
                            inputMode="numeric"
                            value={field.value ? formatFaNumber(field.value) : ''}
                            onChange={(value) =>
                                field.onChange(sanitizeNumericInput(value))
                            }
                            error={!!guaranteeErrors?.chequeNumber}
                            msg={guaranteeErrors?.chequeNumber?.message}
                        />
                    )}
                />
                <div className="flex flex-col gap-1">
                    <Controller
                        name="guarantee.bank"
                        control={control}
                        render={({ field }) => (
                            <FormDropdown
                                label="نام بانک"
                                value={field.value}
                                options={BANK_OPTIONS}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <FieldError message={guaranteeErrors?.bank?.message} />
                </div>
                <Controller
                    name="guarantee.branch"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="شعبه"
                            placeholder="مثلاً شعبه ولنجک"
                            value={field.value}
                            onChange={field.onChange}
                            error={!!guaranteeErrors?.branch}
                            msg={guaranteeErrors?.branch?.message}
                        />
                    )}
                />
                <Controller
                    name="guarantee.accountHolder"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="صاحب حساب / صادرکننده"
                            placeholder="نام و نام خانوادگی"
                            value={field.value}
                            onChange={field.onChange}
                            error={!!guaranteeErrors?.accountHolder}
                            msg={guaranteeErrors?.accountHolder?.message}
                        />
                    )}
                />
                <div className="flex flex-col gap-1">
                    <Controller
                        name="guarantee.dueDate"
                        control={control}
                        render={({ field }) => (
                            <CalendarButton
                                label="تاریخ سررسید چک"
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <FieldError message={guaranteeErrors?.dueDate?.message} />
                </div>
                <div className="flex flex-col gap-1">
                    <Controller
                        name="guarantee.status"
                        control={control}
                        render={({ field }) => (
                            <FormDropdown
                                label="وضعیت ضمانت"
                                value={field.value}
                                options={GUARANTEE_STATUS_OPTIONS}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <FieldError message={guaranteeErrors?.status?.message} />
                </div>
            </div>

            <Controller
                name="guarantee.fileName"
                control={control}
                render={({ field }) => (
                    <div className="flex flex-col gap-1">
                        <DocumentFileUpload
                            title="تصویر چک"
                            hint="روی چک عبارت «ضمانت» درج شده باشد — JPG یا PDF"
                            fileName={field.value || undefined}
                            onChange={(file) => field.onChange(file?.name ?? '')}
                        />
                        <FieldError message={guaranteeErrors?.fileName?.message} />
                    </div>
                )}
            />
        </div>
    )
}

const PromissoryNoteForm = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<NewCustomerFormValues>()
    const guaranteeErrors = errors.guarantee

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                    <Controller
                        name="guarantee.creditRelated"
                        control={control}
                        render={({ field }) => (
                            <FormDropdown
                                label="مربوط به اعتبار"
                                value={field.value}
                                options={CREDIT_RELATED_OPTIONS}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <FieldError message={guaranteeErrors?.creditRelated?.message} />
                </div>
                <Controller
                    name="guarantee.amount"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="مبلغ ضمانت (تومان)"
                            inputMode="numeric"
                            value={field.value ? formatFaNumber(field.value) : ''}
                            onChange={(value) =>
                                field.onChange(sanitizeNumericInput(value))
                            }
                            error={!!guaranteeErrors?.amount}
                            msg={guaranteeErrors?.amount?.message}
                        />
                    )}
                />
                <Controller
                    name="guarantee.noteNumber"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="شماره سفته"
                            inputMode="numeric"
                            value={field.value ? formatFaNumber(field.value) : ''}
                            onChange={(value) =>
                                field.onChange(sanitizeNumericInput(value))
                            }
                            error={!!guaranteeErrors?.noteNumber}
                            msg={guaranteeErrors?.noteNumber?.message}
                        />
                    )}
                />
                <Controller
                    name="guarantee.guarantorName"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="نام ضامن"
                            placeholder="نام و نام خانوادگی ضامن"
                            value={field.value}
                            onChange={field.onChange}
                            error={!!guaranteeErrors?.guarantorName}
                            msg={guaranteeErrors?.guarantorName?.message}
                        />
                    )}
                />
                <Controller
                    name="guarantee.guarantorNationalId"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="کد ملی ضامن"
                            inputMode="numeric"
                            value={field.value ? formatFaNumber(field.value) : ''}
                            onChange={(value) =>
                                field.onChange(sanitizeNumericInput(value))
                            }
                            error={!!guaranteeErrors?.guarantorNationalId}
                            msg={guaranteeErrors?.guarantorNationalId?.message}
                        />
                    )}
                />
                <div className="flex flex-col gap-1">
                    <Controller
                        name="guarantee.dueDate"
                        control={control}
                        render={({ field }) => (
                            <CalendarButton
                                label="تاریخ سررسید سفته"
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <FieldError message={guaranteeErrors?.dueDate?.message} />
                </div>
                <div className="flex flex-col gap-1">
                    <Controller
                        name="guarantee.status"
                        control={control}
                        render={({ field }) => (
                            <FormDropdown
                                label="وضعیت ضمانت"
                                value={field.value}
                                options={GUARANTEE_STATUS_OPTIONS}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <FieldError message={guaranteeErrors?.status?.message} />
                </div>
            </div>

            <Controller
                name="guarantee.fileName"
                control={control}
                render={({ field }) => (
                    <div className="flex flex-col gap-1">
                        <DocumentFileUpload
                            title="تصویر سفته"
                            hint="سفته با امضای ضامن — JPG یا PDF"
                            fileName={field.value || undefined}
                            onChange={(file) => field.onChange(file?.name ?? '')}
                        />
                        <FieldError message={guaranteeErrors?.fileName?.message} />
                    </div>
                )}
            />
        </div>
    )
}

const CreditProof = () => {
    const { control, watch } = useFormContext<NewCustomerFormValues>()
    const guaranteeType = watch('guarantee.type')

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <div className="flex flex-col gap-1">
                <span className="text-label-lg font-semibold text-on-surface">
                    ضمانت
                </span>
                <span className="text-label-md text-outline">
                    ضمانت فقط از نوع چک شخصی یا سفته است — می‌توانید چند ضمانت
                    ثبت کنید.
                </span>
            </div>

            <div className="flex flex-col gap-6 rounded-card-md border border-outline-variant bg-surface-container-lowest p-6">
                <div className="flex flex-col gap-3 rounded-container-lg border border-outline-variant p-4">
                    <span className="text-label-md text-on-surface-variant">
                        نوع ضمانت
                    </span>
                    <Controller
                        name="guarantee.type"
                        control={control}
                        render={({ field }) => (
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <SelectItem
                                    title="چک شخصی"
                                    description="چک صیادی به نام مشتری"
                                    icon="description400Linear"
                                    selected={field.value === 'personal-cheque'}
                                    onClick={() => field.onChange('personal-cheque')}
                                    className={cn(
                                        field.value === 'personal-cheque' &&
                                            'bg-primary-container/40'
                                    )}
                                />
                                <SelectItem
                                    title="سفته"
                                    description="سفته با امضای ضامن"
                                    icon="fileNew400Linear"
                                    selected={field.value === 'promissory-note'}
                                    onClick={() => field.onChange('promissory-note')}
                                    className={cn(
                                        field.value === 'promissory-note' &&
                                            'bg-primary-container/40'
                                    )}
                                />
                            </div>
                        )}
                    />
                </div>

                {guaranteeType === 'personal-cheque' ? (
                    <PersonalChequeForm />
                ) : (
                    <PromissoryNoteForm />
                )}
            </div>
        </div>
    )
}

export default CreditProof
