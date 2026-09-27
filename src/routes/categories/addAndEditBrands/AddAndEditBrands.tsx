'use client'

import { useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, useWatch } from 'react-hook-form'
import DocumentFileUpload from '@/src/routes/contentManagment/liecense/new/components/DocumentFileUpload'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import {
    ToggleGroup,
    ToggleGroupItem,
} from '@/src/shared/components/ui/ToggleGroup'
import { BRANDS_LIST_DUMMY } from '../brands/constants'
import {
    ACTIVITY_FIELD_OPTIONS,
    BRAND_FORM_PRESETS,
    BRAND_ORIGIN_OPTIONS,
    BRAND_STATUS_OPTIONS,
    COUNTRY_OPTIONS,
    addAndEditBrandSchema,
    getAddAndEditBrandDefaultValues,
    type AddAndEditBrandFormValues,
} from './schema'

const activityByLabel = Object.fromEntries(
    ACTIVITY_FIELD_OPTIONS.map((option) => [option.label, option.value])
)
const countryByLabel = Object.fromEntries(
    COUNTRY_OPTIONS.map((option) => [option.label, option.value])
)

const choiceGroupClassName =
    'w-fit rounded-container-md bg-surface-container-high p-1'

const AddAndEditBrands = () => {
    const { push } = useRouter()
    const params = useParams<{ id?: string }>()
    const brandId = params?.id
    const isEditing = Boolean(brandId)
    const [logo, setLogo] = useState<File | null>(null)

    const defaultValues = useMemo(() => {
        if (!brandId) return getAddAndEditBrandDefaultValues()

        const preset = BRAND_FORM_PRESETS[brandId]
        if (preset) return getAddAndEditBrandDefaultValues(preset)

        const existing = BRANDS_LIST_DUMMY.find((item) => item.id === brandId)
        if (!existing) return getAddAndEditBrandDefaultValues()

        return getAddAndEditBrandDefaultValues({
            persianName: existing.name,
            activityField: activityByLabel[existing.field] ?? '',
            country: countryByLabel[existing.country] ?? '',
            status: existing.status === 'active' ? 'active' : 'inactive',
        })
    }, [brandId])

    const { control, handleSubmit } = useForm<AddAndEditBrandFormValues>({
        resolver: zodResolver(addAndEditBrandSchema),
        defaultValues,
        mode: 'onChange',
    })

    const persianName = useWatch({ control, name: 'persianName' })
    const latinName = useWatch({ control, name: 'latinName' })

    const onSubmit = (_values: AddAndEditBrandFormValues) => {
        push('/admin/categories/brands')
    }

    return (
        <form
            id="add-edit-brand-form"
            className="flex w-full flex-col gap-4 rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5"
            dir="rtl"
            onSubmit={handleSubmit(onSubmit)}
        >
            {isEditing ? (
                <div className="flex items-center gap-4 rounded-card-lg bg-surface-container-high p-3">
                    <div className="flex items-center gap-2">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-card-md bg-success-container text-title-md font-bold text-on-success-container">
                            {(
                                latinName.trim().charAt(0) ||
                                persianName.trim().charAt(0) ||
                                '—'
                            ).toUpperCase()}
                        </span>
                        <span className="text-title-md font-bold text-on-surface">
                            {persianName || 'نام برند'}
                        </span>
                    </div>
                    <div className="min-w-0 flex-1 rounded-card-md bg-surface-container-lowest px-4 py-3 text-right text-label-md text-outline">
                        {latinName || persianName || 'پیش‌نمایش نام برند'}
                    </div>
                </div>
            ) : (
                <DocumentFileUpload
                    fileName={logo?.name}
                    onChange={(file) => setLogo(file ?? null)}
                />
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Controller
                    control={control}
                    name="persianName"
                    render={({ field, fieldState }) => (
                        <Input
                            label="نام برند (فارسی) *"
                            value={field.value}
                            onChange={field.onChange}
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="latinName"
                    render={({ field }) => (
                        <Input
                            label="نام لاتین برند"
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="activityField"
                    render={({ field, fieldState }) => (
                        <div className="flex flex-col gap-1">
                            <FormDropdown
                                label="حوزه فعالیت *"
                                placeholder="انتخاب"
                                value={field.value}
                                options={ACTIVITY_FIELD_OPTIONS}
                                onChange={field.onChange}
                            />
                            {fieldState.error?.message && (
                                <span className="text-sm text-error">
                                    {fieldState.error.message}
                                </span>
                            )}
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="country"
                    render={({ field }) => (
                        <FormDropdown
                            label="کشور سازنده"
                            placeholder="انتخاب"
                            value={field.value}
                            options={COUNTRY_OPTIONS}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="origin"
                    render={({ field }) => (
                        <div className="flex flex-col gap-1.5">
                            <span className="text-label-md text-on-surface-variant">
                                منشأ برند
                            </span>
                            <ToggleGroup
                                type="single"
                                variant="filled"
                                value={field.value}
                                onValueChange={(value) => {
                                    if (!value) return
                                    field.onChange(value)
                                }}
                                className={choiceGroupClassName}
                            >
                                {BRAND_ORIGIN_OPTIONS.map((option) => (
                                    <ToggleGroupItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                        <div className="flex flex-col gap-1.5">
                            <span className="text-label-md text-on-surface-variant">
                                وضعیت برند
                            </span>
                            <ToggleGroup
                                type="single"
                                variant="filled"
                                value={field.value}
                                onValueChange={(value) => {
                                    if (!value) return
                                    field.onChange(value)
                                }}
                                className={choiceGroupClassName}
                            >
                                {BRAND_STATUS_OPTIONS.map((option) => (
                                    <ToggleGroupItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="website"
                    render={({ field }) => (
                        <Input
                            label="وب‌سایت یا صفحه برند"
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="description"
                    render={({ field }) => (
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label
                                htmlFor="brand-description"
                                className="text-label-md text-on-surface-variant"
                            >
                                توضیحات برند
                            </label>
                            <Textarea
                                id="brand-description"
                                value={field.value}
                                onChange={(event) =>
                                    field.onChange(event.target.value)
                                }
                                placeholder="توضیحات برند را بنویسید"
                                className="min-h-28 rounded-container-lg border border-outline-variant bg-surface-container-high"
                            />
                        </div>
                    )}
                />
            </div>
        </form>
    )
}

export default AddAndEditBrands
