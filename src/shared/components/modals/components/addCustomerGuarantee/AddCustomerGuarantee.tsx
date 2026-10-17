'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import DocumentFileUpload from '@/src/routes/contentManagment/liecense/new/components/DocumentFileUpload'
import {
    useCreateCustomerGuarantee,
    useGetCustomerCreditSummary,
} from '@/src/routes/customers/hooks/customerDetails'
import { Button } from '@/src/shared/components/ui/button'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { onlyNumber } from '@/src/shared/schema/generalSchema'
import type { BaseModalProps } from '../../types'
import {
    addCustomerGuaranteeDefaultValues,
    addCustomerGuaranteeSchema,
    type AddCustomerGuaranteeFormValues,
} from './schema'

type AddCustomerGuaranteeModalData = {
    customerId?: string
}

const GUARANTEE_TYPE_OPTIONS = [
    { label: 'چک شخصی', value: 'PERSONAL_CHEQUE' },
    { label: 'سفته', value: 'PROMISSORY_NOTE' },
]

const formatFileSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) {
        return `${formatFaNumber(bytes / (1024 * 1024), { maximumFractionDigits: 1 })} مگابایت`
    }
    return `${formatFaNumber(Math.max(1, Math.round(bytes / 1024)))} کیلوبایت`
}

const toIsoDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const parseIsoDate = (value: string) => {
    const [year, month, day] = value.split('-').map(Number)
    if (!year || !month || !day) return undefined
    return new Date(year, month - 1, day)
}

const emptyToNull = (value: string) => {
    const trimmed = value.trim()
    return trimmed ? trimmed : null
}

const FieldError = ({ message }: { message?: string }) =>
    message ? <p className="mt-1 text-label-sm text-error">{message}</p> : null

const AddCustomerGuarantee = ({ closeModal, data }: BaseModalProps) => {
    const params = useParams<{ id: string }>()
    const modalData = (data as AddCustomerGuaranteeModalData | null | undefined) ?? {}
    const customerId = modalData.customerId || params?.id || ''
    const { data: summary } = useGetCustomerCreditSummary(
        customerId,
        Boolean(customerId)
    )
    const { mutate, isPending } = useCreateCustomerGuarantee()
    const { control, handleSubmit, setValue } = useForm<AddCustomerGuaranteeFormValues>({
        resolver: zodResolver(addCustomerGuaranteeSchema),
        defaultValues: addCustomerGuaranteeDefaultValues,
    })
    const file = useWatch({ control, name: 'file' })
    const accountOptions = (summary?.credit_accounts ?? []).map((account) => ({
        label: account.credit_type === 'GOLDEN' ? 'اعتبار طلایی' : 'اعتبار چکی',
        value: account.id,
    }))

    const onSubmit = (values: AddCustomerGuaranteeFormValues) => {
        if (!customerId || !(values.file instanceof File)) return

        mutate(
            {
                customerId,
                body: {
                    credit_account_id: values.credit_account_id,
                    guarantee_type: values.guarantee_type,
                    amount: Number(values.amount),
                    document_no: values.document_no,
                    bank_id: emptyToNull(values.bank_id),
                    bank_branch_name: emptyToNull(values.bank_branch_name),
                    owner_name: emptyToNull(values.owner_name),
                    guarantor_name: emptyToNull(values.guarantor_name),
                    guarantor_national_id: emptyToNull(onlyNumber(values.guarantor_national_id)),
                    issue_place: emptyToNull(values.issue_place),
                    due_date: emptyToNull(values.due_date),
                    file: values.file,
                },
            },
            {
                onSuccess: () => {
                    toast.success('ضمانت ثبت شد')
                    closeModal()
                },
                onError: () => {
                    toast.error('ثبت ضمانت انجام نشد')
                },
            }
        )
    }

    return (
        <form
            className="flex flex-col gap-4"
            dir="rtl"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Controller
                    control={control}
                    name="credit_account_id"
                    render={({ field, fieldState }) => (
                        <div>
                            <FormDropdown
                                label="حساب اعتباری *"
                                placeholder="انتخاب حساب"
                                value={field.value}
                                options={accountOptions}
                                onChange={field.onChange}
                            />
                            <FieldError message={fieldState.error?.message} />
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="guarantee_type"
                    render={({ field, fieldState }) => (
                        <div>
                            <FormDropdown
                                label="نوع ضمانت *"
                                value={field.value}
                                options={GUARANTEE_TYPE_OPTIONS}
                                onChange={field.onChange}
                            />
                            <FieldError message={fieldState.error?.message} />
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="amount"
                    render={({ field, fieldState }) => (
                        <Input
                            label="مبلغ *"
                            value={field.value}
                            onChange={(value) => field.onChange(onlyNumber(value))}
                            inputMode="numeric"
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="document_no"
                    render={({ field, fieldState }) => (
                        <Input
                            label="شماره سند *"
                            value={field.value}
                            onChange={field.onChange}
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="bank_id"
                    render={({ field }) => (
                        <Input
                            label="شناسه بانک"
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="bank_branch_name"
                    render={({ field }) => (
                        <Input
                            label="نام شعبه بانک"
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="owner_name"
                    render={({ field }) => (
                        <Input
                            label="نام صاحب حساب"
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="guarantor_name"
                    render={({ field }) => (
                        <Input
                            label="نام ضامن"
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="guarantor_national_id"
                    render={({ field, fieldState }) => (
                        <Input
                            label="کد ملی ضامن"
                            value={field.value}
                            onChange={(value) => field.onChange(onlyNumber(value))}
                            inputMode="numeric"
                            maxLength={10}
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="issue_place"
                    render={({ field }) => (
                        <Input
                            label="محل صدور"
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="due_date"
                    render={({ field }) => (
                        <CalendarButton
                            label="تاریخ سررسید"
                            value={field.value ? parseIsoDate(field.value) : undefined}
                            onChange={(date) =>
                                field.onChange(date ? toIsoDate(date) : '')
                            }
                        />
                    )}
                />
            </div>
            <Controller
                control={control}
                name="file"
                render={({ field, fieldState }) => (
                    <div>
                        <DocumentFileUpload
                            fileName={field.value?.name}
                            fileSize={
                                field.value
                                    ? formatFileSize(field.value.size)
                                    : undefined
                            }
                            onChange={(nextFile) => {
                                const selected = nextFile ?? null
                                field.onChange(selected)
                                setValue('file', selected, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                })
                            }}
                        />
                        <FieldError message={fieldState.error?.message} />
                    </div>
                )}
            />
            <div className="flex justify-end border-t border-outline-variant pt-4">
                <Button
                    type="submit"
                    variant="primary"
                    isLoading={isPending}
                    disabled={isPending || !customerId}
                >
                    ثبت ضمانت
                </Button>
            </div>
        </form>
    )
}

export default AddCustomerGuarantee
