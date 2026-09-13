'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { Button } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/Input'
import type { BaseModalProps } from '../../types'
import ImageAttachment from './components/ImageAttachment'
import {
    addBannerFormSchema,
    getAddBannerDefaultValues,
    type AddBannerFormValues,
    type AddBannerModalData,
} from './schema'

export type { AddBannerModalData, AddBannerPayload } from './schema'

const AddAndEditBanner = ({ closeModal, data }: BaseModalProps) => {
    const modalData = (data as AddBannerModalData | null | undefined) ?? {}
    const isEditing = Boolean(modalData.isEditing)

    const {
        control,
        handleSubmit,
        setValue,
        formState: { isValid },
    } = useForm<AddBannerFormValues>({
        resolver: zodResolver(addBannerFormSchema),
        defaultValues: getAddBannerDefaultValues(modalData.defaultValues),
        mode: 'onChange',
    })

    const fileName = useWatch({ control, name: 'fileName' })
    const status = useWatch({ control, name: 'status' })

    const handlePickFile = (file?: File | null) => {
        if (!file) return
        setValue('fileName', file.name, {
            shouldValidate: true,
            shouldDirty: true,
        })
        setValue(
            'fileSize',
            `${(file.size / (1024 * 1024)).toFixed(1)} مگابایت`,
            { shouldDirty: true }
        )
    }

    const onSubmit = (values: AddBannerFormValues) => {
        modalData.onSubmit?.({
            title: values.title,
            ctaLabel: values.ctaLabel,
            link: values.link,
            orderLabel: values.orderLabel,
            status: values.status,
            fileName: values.fileName,
        })
        closeModal()
    }

    return (
        <form
            className="flex w-full flex-col gap-4"
            dir="rtl"
            onSubmit={handleSubmit(onSubmit)}
        >
            <ImageAttachment fileName={fileName} onChange={handlePickFile} />

            <Controller
                control={control}
                name="title"
                render={({ field, fieldState }) => (
                    <Input
                        label="نام بنر *"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="مثلاً بنر کالکشن پاییز"
                        error={Boolean(fieldState.error)}
                        msg={fieldState.error?.message}
                    />
                )}
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Controller
                    control={control}
                    name="ctaLabel"
                    render={({ field }) => (
                        <Input
                            label="عنوان دکمه (CTA)"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="مشاهده کالکشن"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="link"
                    render={({ field }) => (
                        <Input
                            label="لینک مقصد"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="/collections/autumn"
                            dir="ltr"
                            className="text-left"
                        />
                    )}
                />
            </div>

            <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2">
                <Controller
                    control={control}
                    name="orderLabel"
                    render={({ field }) => (
                        <Input
                            label="ترتیب نمایش در اسلایدشو"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="اسلاید ۱"
                        />
                    )}
                />
                <div className="flex flex-col gap-1.5">
                    <span className="text-label-md text-on-surface">
                        وضعیت نمایش
                    </span>
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant={
                                status === 'published' ? 'primary' : 'outline'
                            }
                            className="h-10 flex-1"
                            onClick={() =>
                                setValue('status', 'published', {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                })
                            }
                        >
                            منتشرشده
                        </Button>
                        <Button
                            type="button"
                            variant={status === 'draft' ? 'primary' : 'outline'}
                            className="h-10 flex-1"
                            onClick={() =>
                                setValue('status', 'draft', {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                })
                            }
                        >
                            پیش‌نویس
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
                <Button
                    type="submit"
                    variant="primary"
                    className="h-11 flex-1 rounded-full"
                    disabled={!isValid}
                >
                    {isEditing ? 'ذخیره تغییرات' : 'ثبت و افزودن'}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="h-11 shrink-0 px-6"
                    onClick={closeModal}
                >
                    انصراف
                </Button>
            </div>
        </form>
    )
}

export default AddAndEditBanner
