'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
    useCreateColor,
    useDeleteColor,
    useListColors,
} from '@/src/routes/catalog/hooks/catalog'
import { Button } from '@/src/shared/components/ui/button'
import ColorPicker from './ColorPicker'
import ColorPill from '@/src/shared/components/ui/ColorPill'
import { Input } from '@/src/shared/components/ui/Input'
import { Switch } from '@/src/shared/components/ui/Switch'
import {
    COLOR_FORM_DEFAULT_VALUES,
    colorFormSchema,
    type ColorFormValues,
} from '../schema'

const ColorTab = () => {
    const { data: colorsPage } = useListColors({ page: 1, page_size: 100 })
    const { mutate: createColor, isPending } = useCreateColor()
    const { mutate: removeColor } = useDeleteColor()
    const {
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ColorFormValues>({
        resolver: zodResolver(colorFormSchema),
        defaultValues: COLOR_FORM_DEFAULT_VALUES,
        mode: 'onSubmit',
    })
    const isActive = watch('is_active')
    const colors = colorsPage?.results ?? []

    const onSubmit = (values: ColorFormValues) => {
        createColor(
            {
                code: values.code.trim().toUpperCase(),
                name: values.name.trim(),
                hex_code: values.hex_code.trim(),
                is_active: values.is_active,
            },
            {
                onSuccess: () => {
                    reset(COLOR_FORM_DEFAULT_VALUES)
                    toast.success('رنگ ثبت شد')
                },
            }
        )
    }

    return (
        <div className="flex w-full flex-col gap-4" dir="rtl">
            <form
                className="grid grid-cols-1 gap-4 rounded-card-lg bg-surface-container-lowest p-6 sm:grid-cols-2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Controller
                    control={control}
                    name="code"
                    render={({ field }) => (
                        <Input
                            label="کد *"
                            value={field.value}
                            onChange={(value) =>
                                field.onChange(value.toUpperCase())
                            }
                            error={Boolean(errors.code)}
                            msg={errors.code?.message}
                            placeholder="مثلاً RED-01"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <Input
                            label="نام *"
                            value={field.value}
                            onChange={field.onChange}
                            error={Boolean(errors.name)}
                            msg={errors.name?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="hex_code"
                    render={({ field }) => (
                        <div className="flex flex-col gap-3 sm:col-span-2">
                            <Input
                                label="کد رنگ *"
                                value={field.value}
                                onChange={field.onChange}
                                error={Boolean(errors.hex_code)}
                                msg={errors.hex_code?.message}
                            />
                            <ColorPicker
                                value={field.value}
                                onChange={(hex) => {
                                    if (hex) field.onChange(hex)
                                }}
                            />
                        </div>
                    )}
                />
                <label className="flex items-center justify-between gap-3 rounded-container-lg bg-surface-container-high px-4 py-3">
                    <span className="text-label-md text-on-surface">فعال</span>
                    <Switch
                        checked={isActive}
                        onCheckedChange={(checked) =>
                            setValue('is_active', checked, { shouldDirty: true })
                        }
                    />
                </label>
                <div className="sm:col-span-2">
                    <Button
                        type="submit"
                        variant="primary"
                        isLoading={isPending}
                        disabled={isPending}
                    >
                        ثبت رنگ
                    </Button>
                </div>
            </form>

            <div className="flex flex-wrap gap-2 rounded-card-lg bg-surface-container-lowest p-6">
                {colors.length === 0 ? (
                    <span className="text-label-md text-outline">
                        رنگی ثبت نشده است
                    </span>
                ) : (
                    colors.map((color) => (
                        <ColorPill
                            key={color.id}
                            hex={color.hex_code}
                            label={color.name || color.code}
                            onClose={() => removeColor(color.id)}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default ColorTab
