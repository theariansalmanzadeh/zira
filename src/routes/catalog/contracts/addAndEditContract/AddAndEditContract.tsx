'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
    useCreateContract,
    useGetContract,
    useUpdateContract,
} from '@/src/routes/catalog/hooks/pricing'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import { Input } from '@/src/shared/components/ui/Input'
import { Spinner } from '@/src/shared/components/ui/spinner'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import {
    addAndEditContractSchema,
    getAddAndEditContractDefaultValues,
    type AddAndEditContractFormValues,
} from './schema'

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-4 flex items-center gap-2">
        <span className="h-4 w-1 shrink-0 rounded-full bg-primary" />
        <h3 className="text-title-md font-bold text-on-surface">{children}</h3>
    </div>
)

const toDate = (value?: string | null) => {
    if (!value) return undefined
    const [year, month, day] = value.slice(0, 10).split('-').map(Number)
    if (!year || !month || !day) return undefined
    return new Date(year, month - 1, day)
}

const toApiDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

type AddAndEditContractProps = {
    id?: string
}

const AddAndEditContract = ({ id }: AddAndEditContractProps) => {
    const { push } = useRouter()
    const { data: contract, isPending, isError } = useGetContract(id ?? '', Boolean(id))
    const { mutate: createContract, isPending: isCreating } = useCreateContract()
    const { mutate: updateContract, isPending: isUpdating } = useUpdateContract()

    const { control, handleSubmit, reset } = useForm<AddAndEditContractFormValues>({
        resolver: zodResolver(addAndEditContractSchema),
        defaultValues: getAddAndEditContractDefaultValues(),
        mode: 'onChange',
    })

    useEffect(() => {
        if (!contract) return
        const percent = Number(contract.adjustment_pct)

        reset(
            getAddAndEditContractDefaultValues({
                name: contract.name,
                adjustmentPercent:
                    contract.direction === 'DECREASE'
                        ? -Math.abs(percent)
                        : percent,
                validFrom: toDate(contract.valid_from),
                validTo: toDate(contract.valid_to),
                description: contract.description ?? '',
            })
        )
    }, [contract, reset])

    const onSubmit = (values: AddAndEditContractFormValues) => {
        const body = {
            name: values.name.trim(),
            adjustment_pct: values.adjustmentPercent,
            valid_from: toApiDate(values.validFrom),
            valid_to: toApiDate(values.validTo),
            description: values.description?.trim() ?? '',
        }
        const onSuccess = () => {
            toast.success(id ? 'قرارداد به‌روزرسانی شد' : 'قرارداد ایجاد شد')
            push('/admin/catalog?sub=contracts')
        }
        const onError = () => {
            toast.error(
                id ? 'به‌روزرسانی قرارداد انجام نشد' : 'ایجاد قرارداد انجام نشد'
            )
        }

        if (id) {
            updateContract({ contractId: id, body }, { onSuccess, onError })
            return
        }

        createContract({ ...body, scopes: [] }, { onSuccess, onError })
    }

    if (id && isPending) {
        return (
            <div className="flex justify-center py-10">
                <Spinner className="size-6" />
            </div>
        )
    }

    if (id && (isError || !contract)) {
        return (
            <div className="rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline">
                دریافت قرارداد با خطا مواجه شد.
            </div>
        )
    }

    return (
        <div className="flex w-full flex-col gap-4" dir="rtl">
            <form
                id="add-edit-contract-form"
                className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5"
                onSubmit={handleSubmit(onSubmit)}
            >
                <SectionTitle>مشخصات قرارداد</SectionTitle>

                <div className="flex flex-col gap-5">
                    <Controller
                        control={control}
                        name="name"
                        render={({ field, fieldState }) => (
                            <Input
                                label="نام قرارداد *"
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="مثال: قیمت همکار عمده"
                                error={Boolean(fieldState.error)}
                                msg={fieldState.error?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="adjustmentPercent"
                        render={({ field, fieldState }) => (
                            <div className="flex flex-col gap-1.5">
                                <label className="text-label-md text-on-surface-variant">
                                    درصد تعدیل *
                                </label>
                                <div className="flex flex-row items-center gap-1.5 rounded-container-lg bg-surface-container-high px-3 py-3">
                                    <input
                                        type="number"
                                        value={field.value}
                                        onChange={(event) =>
                                            field.onChange(
                                                event.target.value === ''
                                                    ? 0
                                                    : Number(event.target.value)
                                            )
                                        }
                                        disabled={isCreating || isUpdating}
                                        className="w-full bg-transparent text-label-lg text-on-surface outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    />
                                    <span className="shrink-0 text-label-md text-outline">
                                        ٪
                                    </span>
                                </div>
                                <p className="text-label-sm text-outline">
                                    مثال: ۱۸- برای ۱۸٪ کاهش قیمت
                                </p>
                                {fieldState.error?.message ? (
                                    <span className="text-sm text-error">
                                        {fieldState.error.message}
                                    </span>
                                ) : null}
                            </div>
                        )}
                    />

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Controller
                            control={control}
                            name="validFrom"
                            render={({ field, fieldState }) => (
                                <div className="flex flex-col gap-1.5">
                                    <CalendarButton
                                        label="تاریخ اثر *"
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={isCreating || isUpdating}
                                    />
                                    {fieldState.error?.message ? (
                                        <span className="text-sm text-error">
                                            {fieldState.error.message}
                                        </span>
                                    ) : null}
                                </div>
                            )}
                        />
                        <Controller
                            control={control}
                            name="validTo"
                            render={({ field, fieldState }) => (
                                <div className="flex flex-col gap-1.5">
                                    <CalendarButton
                                        label="تاریخ انقضا *"
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={isCreating || isUpdating}
                                    />
                                    {fieldState.error?.message ? (
                                        <span className="text-sm text-error">
                                            {fieldState.error.message}
                                        </span>
                                    ) : null}
                                </div>
                            )}
                        />
                    </div>

                    <Controller
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <div className="flex flex-col gap-1.5">
                                <label className="text-label-md text-on-surface-variant">
                                    توضیحات
                                </label>
                                <Textarea
                                    value={field.value ?? ''}
                                    onChange={(event) =>
                                        field.onChange(event.target.value)
                                    }
                                    placeholder="شرح کوتاه از کاربرد این قرارداد"
                                    className="min-h-28"
                                    disabled={isCreating || isUpdating}
                                />
                            </div>
                        )}
                    />
                </div>
            </form>
        </div>
    )
}

export default AddAndEditContract
