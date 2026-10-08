'use client'

import { useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import ColorPicker from './components/ColorPicker'
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

const VariableForm = ({ editId }: { editId: string | null }) => {
    const { push } = useRouter()
    const isEditing = Boolean(editId)

    const defaultValues = useMemo(
        () => getAddAndUpdateVariableDefaultValues(editId),
        [editId]
    )

    const methods = useForm<AddAndUpdateVariableFormValues>({
        resolver: zodResolver(addAndUpdateVariableSchema),
        defaultValues,
        mode: 'onChange',
    })
    const formDisplayControl = useWatch({
        control: methods.control,
        name: 'formDisplayControl',
    })
    const [colorHex, setColorHex] = useState('#d64545')

    const onSubmit = () => {
        push('/admin/categories?sub=variable')
    }

    return (
        <FormProvider {...methods}>
            <form
                id="add-update-variable-form"
                className="flex w-full flex-col gap-4"
                dir="rtl"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <div className="flex flex-row items-center justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => push('/admin/categories?sub=variable')}
                    >
                        انصراف
                    </Button>
                    <Button type="submit" variant="primary">
                        {isEditing ? 'ذخیره تغییرات' : 'ثبت ویژگی'}
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-4 rounded-card-lg bg-surface-container-lowest p-6 sm:grid-cols-2">
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
                    {formDisplayControl === 'color-swatch' && (
                        <div className="sm:col-span-2">
                            <ColorPicker
                                value={colorHex}
                                onChange={(hex) => {
                                    if (hex) setColorHex(hex)
                                }}
                            />
                        </div>
                    )}
                    <VariableValues
                        formDisplayControl={formDisplayControl ?? ''}
                        colorHex={colorHex}
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
            </form>
        </FormProvider>
    )
}

const AddAndUpdateVariable = () => {
    const params = useParams<{ id?: string }>()
    const editId = params?.id ?? null

    return <VariableForm key={editId ?? 'new'} editId={editId} />
}

export default AddAndUpdateVariable
