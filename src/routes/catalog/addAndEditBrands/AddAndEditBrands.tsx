'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Controller, useForm, useWatch } from 'react-hook-form'
import type { BrandIn } from '@/src/api/types/admin/catalog'
import DocumentFileUpload from '@/src/routes/contentManagment/liecense/new/components/DocumentFileUpload'
import {
    catalogKeys,
    useCreateBrand,
    useGetBrand,
    useUpdateBrand,
} from '@/src/routes/catalog/hooks/catalog'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { Button } from '@/src/shared/components/ui/button'
import { Spinner } from '@/src/shared/components/ui/spinner'
import {
    ToggleGroup,
    ToggleGroupItem,
} from '@/src/shared/components/ui/ToggleGroup'
import {
    ACTIVITY_FIELD_OPTIONS,
    BRAND_ORIGIN_OPTIONS,
    BRAND_STATUS_OPTIONS,
    COUNTRY_OPTIONS,
    addAndEditBrandSchema,
    getAddAndEditBrandDefaultValues,
    mapBrandToFormValues,
    type AddAndEditBrandFormValues,
} from './schema'

const choiceGroupClassName =
    'w-fit rounded-container-md bg-surface-container-high p-1'

const toBrandRequest = (values: AddAndEditBrandFormValues): BrandIn => ({
    name: values.persianName,
    latin_name: values.latinName,
    scope: values.activityField,
    logo: values.logo,
    country: values.country,
    origin: values.origin,
    status: values.status,
    website: '',
    description: values.description,
})

type AddAndEditBrandsProps = {
    id?: string
}

const AddAndEditBrands = ({ id }: AddAndEditBrandsProps) => {
    const { push } = useRouter()
    const queryClient = useQueryClient()
    const isEditing = Boolean(id)
    const { data: brand, isPending: isLoadingBrand, isError } = useGetBrand(
        id ?? '',
        isEditing
    )
    const { mutate: createBrand, isPending: isCreating } = useCreateBrand()
    const { mutate: updateBrand, isPending: isUpdating } = useUpdateBrand()
    const isPending = isCreating || isUpdating
    const { control, handleSubmit, setValue, reset } =
        useForm<AddAndEditBrandFormValues>({
            resolver: zodResolver(addAndEditBrandSchema),
            defaultValues: getAddAndEditBrandDefaultValues(),
            mode: 'onChange',
        })

    const persianName = useWatch({ control, name: 'persianName' })
    const latinName = useWatch({ control, name: 'latinName' })
    const logo = useWatch({ control, name: 'logo' })
    const [logoPreview, setLogoPreview] = useState<string | null>(null)

    useEffect(() => {
        if (!brand) return
        reset(mapBrandToFormValues(brand))
    }, [brand, reset])

    useEffect(() => {
        if (!logo) {
            setLogoPreview(null)
            return
        }

        const previewUrl = URL.createObjectURL(logo)
        setLogoPreview(previewUrl)
        return () => URL.revokeObjectURL(previewUrl)
    }, [logo])

    const onSubmit = (values: AddAndEditBrandFormValues) => {
        const body = toBrandRequest(values)
        const onSuccess = () => {
            queryClient.invalidateQueries({
                queryKey: catalogKeys.brands.lists(),
            })
            if (id) {
                queryClient.invalidateQueries({
                    queryKey: catalogKeys.brands.detail(id),
                })
            }
            toast.success(isEditing ? 'برند به‌روزرسانی شد' : 'برند ایجاد شد')
            push('/admin/catalog/brands')
        }
        const onError = () => {
            toast.error(
                isEditing ? 'به‌روزرسانی برند انجام نشد' : 'ایجاد برند انجام نشد'
            )
        }

        if (id) {
            updateBrand({ brandId: id, body }, { onSuccess, onError })
            return
        }

        createBrand(body, { onSuccess, onError })
    }

    if (isEditing && isLoadingBrand) {
        return (
            <div className='flex justify-center py-16'>
                <Spinner className='size-6' />
            </div>
        )
    }

    if (isEditing && (isError || !brand)) {
        return (
            <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                دریافت اطلاعات برند با خطا مواجه شد.
            </div>
        )
    }

    return (
        <form
            id="add-edit-brand-form"
            className="flex w-full flex-col gap-4 rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5"
            dir="rtl"
            onSubmit={handleSubmit(onSubmit)}
            aria-busy={isPending}
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
                <div className="flex items-center gap-3">
                    {logoPreview ? (
                        <img
                            src={logoPreview}
                            alt=""
                            className="size-16 shrink-0 rounded-card-md object-cover"
                        />
                    ) : null}
                    <div className="min-w-0 flex-1">
                        <DocumentFileUpload
                            fileName={logo?.name}
                            onChange={(file) =>
                                setValue('logo', file ?? null, {
                                    shouldDirty: true,
                                })
                            }
                        />
                    </div>
                </div>
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
            <Button
                type="submit"
                variant="primary"
                size="lg"
                className="self-end"
                isLoading={isPending}
            >
                {isEditing ? 'ذخیره تغییرات' : 'ثبت برند'}
            </Button>
        </form>
    )
}

export default AddAndEditBrands
