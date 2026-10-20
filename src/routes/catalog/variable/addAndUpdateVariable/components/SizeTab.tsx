'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
    useCreateSize,
    useDeleteSize,
    useListSizes,
} from '@/src/routes/catalog/hooks/catalog'
import { Button } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/Input'
import { Pill } from '@/src/shared/components/ui/Pill'
import { Switch } from '@/src/shared/components/ui/Switch'
import {
    SIZE_FORM_DEFAULT_VALUES,
    sizeFormSchema,
    type SizeFormValues,
} from '../schema'

const SizeTab = () => {
    const { data: sizesPage } = useListSizes({ page: 1, page_size: 100 })
    const { mutate: createSize, isPending } = useCreateSize()
    const { mutate: removeSize } = useDeleteSize()
    const {
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<SizeFormValues>({
        resolver: zodResolver(sizeFormSchema),
        defaultValues: SIZE_FORM_DEFAULT_VALUES,
        mode: 'onSubmit',
    })
    const isActive = watch('is_active')
    const sizes = sizesPage?.results ?? []

    const onSubmit = (values: SizeFormValues) => {
        createSize(
            {
                code: values.code.trim().toUpperCase(),
                name: values.name.trim(),
                is_active: values.is_active,
            },
            {
                onSuccess: () => {
                    reset(SIZE_FORM_DEFAULT_VALUES)
                    toast.success('سایز ثبت شد')
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
                            placeholder="مثلاً XL-01"
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
                <label className="flex items-center justify-between gap-3 rounded-container-lg bg-surface-container-high px-4 py-3 sm:col-span-2">
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
                        ثبت سایز
                    </Button>
                </div>
            </form>

            <div className="flex flex-wrap gap-2 rounded-card-lg bg-surface-container-lowest p-6">
                {sizes.length === 0 ? (
                    <span className="text-label-md text-outline">
                        سایزی ثبت نشده است
                    </span>
                ) : (
                    sizes.map((size) => (
                        <Pill
                            key={size.id}
                            text={size.name || size.code}
                            variant="tonal"
                            onClose={() => removeSize(size.id)}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default SizeTab
