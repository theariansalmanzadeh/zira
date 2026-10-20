'use client'

import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { openCustomerCreditAccount } from '@/src/api/admin/customerDetails'
import type { BaseModalProps } from '@/src/shared/components/modals/types'
import { Button } from '@/src/shared/components/ui/button'
import { CopyableInput } from '@/src/shared/components/ui/CopyableInput'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { customerDetailsKeys } from '../hooks/customerDetails'
import { customerKeys } from '../hooks/customers'
import {
    CREDIT_TYPE_OPTIONS,
    NEW_CREDIT_DEFAULT_VALUES,
    newCreditSchema,
    type NewCreditFormValues,
} from './schema'

type NewCreditModalData = {
    customerId?: string
    tier?: number
}

const GOLDEN_TIER = 3

const NewCredit = ({ closeModal, data }: BaseModalProps) => {
    const params = useParams<{ id: string }>()
    const modalData = (data as NewCreditModalData | null | undefined) ?? {}
    const customerId = modalData.customerId || params.id || ''
    const tier = modalData.tier
    const queryClient = useQueryClient()
    const { control, handleSubmit } = useForm<NewCreditFormValues>({
        resolver: zodResolver(newCreditSchema),
        defaultValues: {
            ...NEW_CREDIT_DEFAULT_VALUES,
            customer_id: customerId,
        },
        mode: 'onChange',
    })
    const creditType = useWatch({ control, name: 'credit_type' })
    const goldenBlocked =
        creditType === 'GOLDEN' && Number(tier) !== GOLDEN_TIER

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: NewCreditFormValues) => {
            const opened = await openCustomerCreditAccount(
                values.customer_id,
                values.credit_type
            )
            if (!opened.success) throw opened.error
            return opened.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: customerKeys.profiles.detail(customerId),
            })
            queryClient.invalidateQueries({
                queryKey: customerDetailsKeys.creditSummary(customerId),
            })
            toast.success('حساب اعتباری ثبت شد')
            closeModal()
        },
        onError: () => {
            toast.error('ثبت حساب اعتباری انجام نشد')
        },
    })

    return (
        <form
            className="flex flex-col gap-4 pt-2"
            dir="rtl"
            onSubmit={handleSubmit((values) => {
                if (
                    values.credit_type === 'GOLDEN' &&
                    Number(tier) !== GOLDEN_TIER
                ) {
                    return
                }
                mutate(values)
            })}
        >
            <div className="flex flex-col gap-4">
                <Controller
                    control={control}
                    name="customer_id"
                    render={({ field }) => (
                        <CopyableInput
                            label="شناسه مشتری"
                            value={field.value}
                            onChange={field.onChange}
                            readOnly
                            dir="ltr"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="credit_type"
                    render={({ field, fieldState }) => (
                        <div className="flex flex-col gap-1">
                            <FormDropdown
                                label="نوع اعتبار *"
                                value={field.value}
                                onChange={field.onChange}
                                options={[...CREDIT_TYPE_OPTIONS]}
                            />
                            {fieldState.error?.message && (
                                <span className="text-label-sm text-error">
                                    {fieldState.error.message}
                                </span>
                            )}
                        </div>
                    )}
                />
            </div>
            {goldenBlocked && (
                <div className="rounded-card-md bg-warning-container px-4 py-3 text-label-md text-on-warning-container">
                    اعتبار طلایی فقط برای مشتریان سطح ۳ فعال است.
                </div>
            )}
            <div className="flex items-center gap-3 border-t border-outline-variant pt-4">
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isPending || goldenBlocked}
                >
                    ثبت حساب
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={closeModal}
                    disabled={isPending}
                >
                    انصراف
                </Button>
            </div>
        </form>
    )
}

export default NewCredit
