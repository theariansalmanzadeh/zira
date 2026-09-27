'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { Button } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import type { BaseModalProps } from '../../types'
import ImageAttachment from '../addBanner/components/ImageAttachment'
import {
    addBrandFormSchema,
    getAddBrandDefaultValues,
    type AddBrandFormValues,
    type AddBrandModalData,
} from './schema'

export type { AddBrandModalData, AddBrandPayload } from './schema'

const LOGO_HINT = 'PNG با پس‌زمینه شفاف · حداقل ۴۰۰ × ۴۰۰ پیکسل'

const AddAndEditBrand = ({ closeModal, data }: BaseModalProps) => {
    const modalData = (data as AddBrandModalData | null | undefined) ?? {}
    const isEditing = Boolean(modalData.isEditing)

    const {
        control,
        handleSubmit,
        setValue,
        formState: { isValid },
    } = useForm<AddBrandFormValues>({
        resolver: zodResolver(addBrandFormSchema),
        defaultValues: getAddBrandDefaultValues(modalData.defaultValues),
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

    const onSubmit = (values: AddBrandFormValues) => {
        modalData.onSubmit?.({
            title: values.title,
            slogan: values.slogan,
            description: values.description,
            status: values.status,
            fileName: values.fileName ?? '',
        })
        closeModal()
    }

    return (
        <form
            className="flex w-full flex-col gap-4"
            dir="rtl"
            onSubmit={handleSubmit(onSubmit)}
        >
            <ImageAttachment
                label="لوگوی برند"
                required={false}
                hint={LOGO_HINT}
                fileName={fileName}
                accept="image/png"
                previewClassName="bg-[#C4A35A]"
                onChange={handlePickFile}
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Controller
                    control={control}
                    name="title"
                    render={({ field, fieldState }) => (
                        <Input
                            label="نام برند *"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="مثلاً زیرا کیدز"
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="slogan"
                    render={({ field }) => (
                        <Input
                            label="شعار / حوزه فعالیت"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="پوشاک کودک و نوزاد"
                        />
                    )}
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <span className="text-label-md text-on-surface">معرفی برند</span>
                <Controller
                    control={control}
                    name="description"
                    render={({ field }) => (
                        <Textarea
                            value={field.value}
                            onChange={(event) => field.onChange(event.target.value)}
                            placeholder="در دو یا سه جمله برند را معرفی کنید..."
                            className="min-h-24 resize-y rounded-card-md border border-outline-variant bg-surface-container-lowest px-3 py-2"
                        />
                    )}
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <span className="text-label-md text-on-surface">وضعیت نمایش</span>
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        type="button"
                        variant={status === 'published' ? 'primary-outline' : 'outline'}
                        className="h-10"
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
                        variant={status === 'draft' ? 'primary-outline' : 'outline'}
                        className="h-10"
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

export default AddAndEditBrand
