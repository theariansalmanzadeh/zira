'use client'

import { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import {
    addAndEditPricingSchema,
    getAddAndEditPricingDefaultValues,
    type AddAndEditPricingFormValues,
} from './schema'
import { PRICING_LIST_DUMMY } from '../Pricing'

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-4 flex items-center gap-2">
        <span className="h-4 w-1 shrink-0 rounded-full bg-primary" />
        <h3 className="text-title-md font-bold text-on-surface">{children}</h3>
    </div>
)

const parseAdjustmentPercent = (value: string) => {
    const normalized = value
        .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
        .replace(/٪/g, '')
        .replace(/%/g, '')
        .trim()

    const parsed = Number(normalized)
    return Number.isFinite(parsed) ? parsed : 0
}

const AddAndEditPricing = () => {
    const { push } = useRouter()
    const params = useParams<{ id?: string }>()
    const pricingId = params?.id

    const defaultValues = useMemo(() => {
        if (!pricingId) return getAddAndEditPricingDefaultValues()

        const existing = PRICING_LIST_DUMMY.find(
            (item) => item.data.contractId === pricingId
        )

        if (!existing) return getAddAndEditPricingDefaultValues()

        return getAddAndEditPricingDefaultValues({
            name: existing.data.contractTitle,
            adjustmentPercent: parseAdjustmentPercent(
                String(existing.data.percent)
            ),
            description: '',
        })
    }, [pricingId])

    const { control, handleSubmit } = useForm<AddAndEditPricingFormValues>({
        resolver: zodResolver(addAndEditPricingSchema),
        defaultValues,
        mode: 'onChange',
    })

    const onSubmit = (_values: AddAndEditPricingFormValues) => {
        push('/admin/categories?sub=pricing')
    }

    return (
        <div className="flex w-full flex-col gap-4" dir="rtl">
            <form
                id="add-edit-pricing-form"
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
                                />
                            </div>
                        )}
                    />
                </div>
            </form>
        </div>
    )
}

export default AddAndEditPricing
