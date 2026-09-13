'use client'

import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import { CopyableInput } from '@/src/shared/components/ui/CopyableInput'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { ACCOUNT_OPTIONS, PAYMENT_TYPE_OPTIONS } from '../constants'
import { useNewPayment } from '../provider/NewPaymentProvider'
import {
    NEW_PAYMENT_DEFAULT_VALUES,
    newPaymentSchema,
    type NewPaymentFormValues,
} from '../schema'

const Form = () => {
    const { setPaymentType, setSourceAccount, setPaymentAmount } = useNewPayment()
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<NewPaymentFormValues>({
        resolver: zodResolver(newPaymentSchema),
        defaultValues: NEW_PAYMENT_DEFAULT_VALUES,
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    })

    const onSubmit = () => {}

    return (
        <>
            <span className="text-sm text-gray-500">سرفصل پرداخت</span>
            <form
                className="mt-2 grid grid-cols-1 gap-6 rounded-card-md bg-surface-container-lowest p-6 md:grid-cols-3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Controller
                    name="paymentType"
                    control={control}
                    render={({ field }) => (
                        <FormDropdown
                            label="نوع پرداخت"
                            placeholder="انتخاب"
                            value={field.value}
                            options={PAYMENT_TYPE_OPTIONS}
                            onChange={(value) => {
                                field.onChange(value)
                                setPaymentType(value)
                            }}
                        />
                    )}
                />
                <Controller
                    name="trackingNumber"
                    control={control}
                    render={({ field }) => (
                        <CopyableInput
                            label="شناسه پرداخت"
                            placeholder="شناسه پرداخت"
                            value={field.value}
                            onChange={field.onChange}
                            readOnly
                        />
                    )}
                />
                <Controller
                    name="sourceAccount"
                    control={control}
                    render={({ field }) => (
                        <FormDropdown
                            label="حساب/صندوق مبدأ"
                            placeholder="انتخاب"
                            value={field.value}
                            options={ACCOUNT_OPTIONS}
                            onChange={(value) => {
                                field.onChange(value)
                                setSourceAccount(value)
                            }}
                        />
                    )}
                />
                <Controller
                    name="paymentDate"
                    control={control}
                    render={({ field }) => (
                        <CalendarButton
                            label="تاریخ پرداخت"
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
                    name="destinationAccount"
                    control={control}
                    render={({ field }) => (
                        <FormDropdown
                            label="حساب/صندوق مقصد"
                            placeholder="انتخاب"
                            value={field.value}
                            options={ACCOUNT_OPTIONS}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    name="paymentAmount"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="مبلغ (تومان)"
                            value={field.value}
                            onChange={(value) => {
                                field.onChange(value)
                                setPaymentAmount(value)
                            }}
                            inputMode="numeric"
                            error={!!errors.paymentAmount}
                            msg={errors.paymentAmount?.message}
                        />
                    )}
                />
            </form>
        </>
    )
}

export default Form
