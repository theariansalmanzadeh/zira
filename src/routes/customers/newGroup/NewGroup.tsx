'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import type { CreateCustomerGroupRequest } from '@/src/api/types/admin/customers'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { toEnglishDigits } from '@/src/shared/schema/generalSchema'
import { customerKeys, useCreateCustomerGroup } from '../hooks/customers'
import {
    GROUP_CHEQUE_LEVEL_OPTIONS,
    GROUP_GOLD_LEVEL_OPTIONS,
    GROUP_USER_LEVEL_OPTIONS,
    GROUP_USER_STATUS_OPTIONS,
    NEW_GROUP_DEFAULT_VALUES,
    newGroupFormSchema,
    type NewGroupFormValues,
} from './schema'

const sanitizeNumericInput = (value: string) =>
    toEnglishDigits(value).replace(/[^\d.]/g, '')

const NewGroup = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { mutate, isPending } = useCreateCustomerGroup()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<NewGroupFormValues>({
        resolver: zodResolver(newGroupFormSchema),
        defaultValues: NEW_GROUP_DEFAULT_VALUES,
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    })

    const onSubmit = (values: NewGroupFormValues) => {
        const payload: CreateCustomerGroupRequest = {
            name: values.groupName,
            description: values.groupCode ? `کد گروه: ${values.groupCode}` : '',
            default_tier: values.userLevel,
            default_payment_due_days: 0,
            default_golden_credit_amount: Number(values.goldLevel) || 0,
            default_max_cheque_maturity_months: Number(values.chequeLevel) || 0,
        }

        mutate(payload, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: customerKeys.groups.lists(),
                })
                router.push('/admin/customers?sub=list&cat=groups')
            },
        })
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto flex w-full max-w-[900px] flex-col gap-6"
            dir="rtl"
        >
            <div className="flex flex-col gap-3">
                <span className="text-label-lg font-semibold text-on-surface">
                    مشخصات گروه
                </span>

                <div className="flex flex-col gap-6 rounded-card-md bg-surface-container-lowest p-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <Controller
                            name="groupCode"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="کد گروه"
                                    placeholder="CG-732760"
                                    dir="ltr"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.groupCode}
                                    msg={errors.groupCode?.message}
                                />
                            )}
                        />
                        <Controller
                            name="groupName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="نام گروه"
                                    placeholder="مثلاً پوشاک اصفهان"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.groupName}
                                    msg={errors.groupName?.message}
                                />
                            )}
                        />

                        <Controller
                            name="userLevel"
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label="سطح کاربران گروه"
                                    value={field.value}
                                    options={GROUP_USER_LEVEL_OPTIONS}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name="discountPercent"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="درصد تخفیف گروه"
                                    placeholder={formatFaNumber(9, {
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
                                        field.onChange(
                                            sanitizeNumericInput(value)
                                        )
                                    }
                                    error={!!errors.discountPercent}
                                    msg={errors.discountPercent?.message}
                                />
                            )}
                        />

                        <Controller
                            name="chequeLevel"
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label="سطح اعتبار چک"
                                    value={field.value}
                                    options={GROUP_CHEQUE_LEVEL_OPTIONS}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name="goldLevel"
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label="سطح اعتبار طلایی"
                                    value={field.value}
                                    options={GROUP_GOLD_LEVEL_OPTIONS}
                                    onChange={field.onChange}
                                />
                            )}
                        />

                        <Controller
                            name="userStatus"
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label="وضعیت کاربران گروه"
                                    value={field.value}
                                    options={GROUP_USER_STATUS_OPTIONS}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className="flex w-full items-center gap-3">
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={isPending}
                    isLoading={isPending}
                >
                    ایجاد گروه
                </Button>
            </div>
        </form>
    )
}

export default NewGroup
