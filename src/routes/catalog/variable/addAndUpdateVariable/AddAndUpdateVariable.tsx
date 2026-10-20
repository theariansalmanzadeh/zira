'use client'

import { useMemo, useState } from 'react'
import {
    useParams,
    usePathname,
    useRouter,
    useSearchParams,
} from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import type {
    AttributeIn,
    AttributeInputControl,
    AttributeKind,
    AttributeRole,
} from '@/src/api/types/admin/catalog'
import {
    catalogKeys,
    useCreateAttribute,
    useDeleteAttribute,
    useGetAttribute,
    useUpdateAttribute,
} from '@/src/routes/catalog/hooks/catalog'
import { Button } from '@/src/shared/components/ui/button'
import {
    ToggleGroup,
    ToggleGroupItem,
} from '@/src/shared/components/ui/ToggleGroup'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import ColorTab from './components/ColorTab'
import SizeTab from './components/SizeTab'
import VariableSettings from './components/VariableSettings'
import VariableValues from './components/VariableValues'
import {
    FORM_DISPLAY_OPTIONS,
    INPUT_TYPE_OPTIONS,
    PRODUCT_ROLE_OPTIONS,
    addAndUpdateVariableSchema,
    getAddAndUpdateVariableDefaultValues,
    type AddAndUpdateVariableFormValues,
} from './schema'

const PRESET_ATTRIBUTES = [
    { code: 'material', name: 'جنس' },
    { code: 'color', name: 'رنگ' },
    { code: 'size', name: 'سایز' },
    { code: 'pack', name: 'پک' },
    { code: 'unit', name: 'واحد' },
] as const

const toAttributeCode = (name: string) => {
    const code = name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '')
    return code || `attr_${Date.now()}`
}

const toAttributeIn = (
    values: AddAndUpdateVariableFormValues,
    code?: string
): AttributeIn => ({
    code: code || toAttributeCode(values.name),
    name: values.name.trim(),
    kind: values.inputType as AttributeKind,
    role: values.productRole as AttributeRole,
    input_control: values.formDisplayControl
        ? (values.formDisplayControl as AttributeInputControl)
        : undefined,
    hint: values.shortDescription.trim() || undefined,
    is_required: values.required,
    is_filterable: values.showInStoreFilters,
    show_in_public: values.showOnPublicProductPage,
    values: values.values.map((item, index) => ({
        value: item.value,
        sort_order: index,
        ...(values.formDisplayControl === 'SWATCH' && item.hexCode
            ? { hex_code: item.hexCode }
            : {}),
    })),
})

const VariableForm = ({ editId }: { editId: string | null }) => {
    const { push } = useRouter()
    const queryClient = useQueryClient()
    const isEditing = Boolean(editId)
    const { data: attribute } = useGetAttribute(editId ?? '', isEditing)
    const { mutate: createAttribute, isPending: isCreating } =
        useCreateAttribute()
    const { mutate: updateAttribute, isPending: isUpdating } =
        useUpdateAttribute()
    const { mutate: removeAttribute, isPending: isDeleting } =
        useDeleteAttribute()
    const isPending = isCreating || isUpdating || isDeleting

    const defaultValues = useMemo(
        () => getAddAndUpdateVariableDefaultValues(attribute),
        [attribute]
    )

    const methods = useForm<AddAndUpdateVariableFormValues>({
        resolver: zodResolver(addAndUpdateVariableSchema),
        defaultValues,
        values: defaultValues,
        mode: 'onChange',
    })
    const formDisplayControl = useWatch({
        control: methods.control,
        name: 'formDisplayControl',
    })
    const [presetEnabled, setPresetEnabled] = useState(false)
    const [presetCode, setPresetCode] = useState('')

    const applyPreset = (code: string) => {
        setPresetCode(code)
        const preset = PRESET_ATTRIBUTES.find((item) => item.code === code)
        if (!preset) return
        methods.setValue('name', preset.name, {
            shouldDirty: true,
            shouldValidate: true,
        })
    }

    const handleDelete = () => {
        if (!editId) return
        removeAttribute(editId, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: catalogKeys.attributes.lists(),
                })
                toast.success('ویژگی حذف شد')
                push('/admin/catalog?sub=variable')
            },
        })
    }

    const onSubmit = (values: AddAndUpdateVariableFormValues) => {
        const onSuccess = () => {
            queryClient.invalidateQueries({
                queryKey: catalogKeys.attributes.lists(),
            })
            toast.success(isEditing ? 'ویژگی به‌روزرسانی شد' : 'ویژگی ثبت شد')
            push('/admin/catalog?sub=variable')
        }

        if (editId) {
            updateAttribute(
                {
                    attributeId: editId,
                    body: {
                        name: values.name.trim(),
                        role: values.productRole as AttributeRole,
                        input_control: values.formDisplayControl
                            ? (values.formDisplayControl as AttributeInputControl)
                            : null,
                        hint: values.shortDescription.trim(),
                        is_required: values.required,
                        is_filterable: values.showInStoreFilters,
                        show_in_public: values.showOnPublicProductPage,
                    },
                },
                { onSuccess }
            )
            return
        }

        createAttribute(
            toAttributeIn(
                values,
                presetEnabled && presetCode ? presetCode : undefined
            ),
            { onSuccess }
        )
    }

    return (
        <FormProvider {...methods}>
            <form
                id="add-update-variable-form"
                className="flex w-full flex-col gap-4 bg-surface-container-lowest p-6"
                dir="rtl"
                onSubmit={methods.handleSubmit(onSubmit)}
            >

                <div className="grid grid-cols-1 gap-4 rounded-card-lg sm:grid-cols-2">
                    <Controller
                        control={methods.control}
                        name="name"
                        render={({ field, fieldState }) => (
                            <Input
                                label="نام ویژگی *"
                                value={field.value}
                                onChange={field.onChange}
                                error={Boolean(fieldState.error)}
                                msg={fieldState.error?.message}
                            />
                        )}
                    />

                    <Controller
                        control={methods.control}
                        name="inputType"
                        render={({ field, fieldState }) => (
                            <div className="flex flex-col gap-1">
                                <FormDropdown
                                    label="نوع ورودی *"
                                    placeholder="انتخاب"
                                    value={field.value}
                                    options={INPUT_TYPE_OPTIONS}
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
                        control={methods.control}
                        name="productRole"
                        render={({ field, fieldState }) => (
                            <div className="flex flex-col gap-1">
                                <FormDropdown
                                    label="نقش در تعریف کالا *"
                                    placeholder="انتخاب"
                                    value={field.value}
                                    options={PRODUCT_ROLE_OPTIONS}
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
                        control={methods.control}
                        name="formDisplayControl"
                        render={({ field }) => (
                            <FormDropdown
                                label="کنترل نمایش در فرم"
                                placeholder="انتخاب"
                                value={field.value}
                                options={FORM_DISPLAY_OPTIONS}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <VariableValues
                        formDisplayControl={formDisplayControl ?? ''}
                    />
                    <Controller
                        control={methods.control}
                        name="shortDescription"
                        render={({ field }) => (
                            <div className="sm:col-span-2">
                                <Input
                                    label="توضیح کوتاه"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="رنگ‌های قابل تعریف در ماتریس کالا"
                                />
                            </div>
                        )}
                    />
                </div>

                <VariableSettings />
                <div className="flex flex-row items-center justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => push('/admin/catalog?sub=variable')}
                    >
                        انصراف
                    </Button>
                    {isEditing && (
                        <Button
                            type="button"
                            variant="error"
                            onClick={handleDelete}
                            isLoading={isDeleting}
                            disabled={isPending}
                        >
                            حذف ویژگی
                        </Button>
                    )}
                    <Button
                        type="submit"
                        variant="primary"
                        isLoading={isPending}
                        disabled={isPending}
                    >
                        {isEditing ? 'ذخیره تغییرات' : 'ثبت ویژگی'}
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}

const VARIABLE_SECTIONS = [
    { value: 'variable', label: 'ویژگی' },
    { value: 'size', label: 'سایز' },
    { value: 'color', label: 'رنگ' },
] as const

type VariableSection = (typeof VARIABLE_SECTIONS)[number]['value']

const isVariableSection = (value: string | null): value is VariableSection =>
    VARIABLE_SECTIONS.some((item) => item.value === value)

const AddAndUpdateVariable = () => {
    const params = useParams<{ id?: string }>()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const editId = params?.id ?? null
    const cat = searchParams.get('cat')
    const section: VariableSection = isVariableSection(cat) ? cat : 'variable'

    const setSection = (value: VariableSection) => {
        const next = new URLSearchParams(searchParams.toString())
        if (value === 'variable') {
            next.delete('cat')
        } else {
            next.set('cat', value)
        }
        const query = next.toString()
        replace(query ? `${pathname}?${query}` : pathname)
    }

    return (
        <div className="flex w-full flex-col gap-4" dir="rtl">
            <ToggleGroup
                type="single"
                value={section}
                onValueChange={(value) => {
                    if (value && isVariableSection(value)) setSection(value)
                }}
                variant="filled"
                className="w-full rounded-container-md! bg-surface-container-lowest p-2"
            >
                {VARIABLE_SECTIONS.map((item) => (
                    <ToggleGroupItem
                        key={item.value}
                        value={item.value}
                        className="flex-1"
                    >
                        {item.label}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>

            {section === 'variable' ? (
                <VariableForm key={editId ?? 'new'} editId={editId} />
            ) : null}
            {section === 'size' ? <SizeTab /> : null}
            {section === 'color' ? <ColorTab /> : null}
        </div>
    )
}

export default AddAndUpdateVariable
