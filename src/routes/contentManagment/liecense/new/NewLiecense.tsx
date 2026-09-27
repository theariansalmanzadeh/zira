'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { Button } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import IconButton from '@/src/shared/components/ui/IconButton'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { DOCUMENT_TAB_OPTIONS } from './constants'
import {
    NEW_LIECENSE_DEFAULT_VALUES,
    newLiecenseFormSchema,
    type NewLiecenseFormValues,
} from './schema'
import ChoiceGroup from './components/ChoiceGroup'
import DocumentFileUpload from './components/DocumentFileUpload'
import FileAndVisibilityFields from './components/FileAndVisibilityFields'

const NewLiecense = () => {
    const { push, back } = useRouter()

    const methods = useForm<NewLiecenseFormValues>({
        resolver: zodResolver(newLiecenseFormSchema),
        defaultValues: NEW_LIECENSE_DEFAULT_VALUES,
        mode: 'onChange',
    })

    const {
        control,
        handleSubmit,
        setValue,
        formState: { isValid },
    } = methods

    const [fileName, fileSize] = useWatch({
        control,
        name: ['fileName', 'fileSize'],
    })

    const handlePickFile = (file?: File | null) => {
        if (!file) return

        const isPdf = file.type === 'application/pdf'
        setValue('fileName', file.name, { shouldValidate: true, shouldDirty: true })
        setValue(
            'fileSize',
            `${(file.size / (1024 * 1024)).toFixed(1)} مگابایت`,
            { shouldDirty: true }
        )
        setValue('fileType', isPdf ? 'pdf' : 'image', {
            shouldValidate: true,
            shouldDirty: true,
        })
    }

    const onSubmit = () => {
        push('/admin/content-managment/liecense')
    }

    return (
        <FormProvider {...methods}>
            <form
                className="mx-auto flex w-full max-w-[680px] flex-col gap-4"
                dir="rtl"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex items-center gap-3">
                    <IconButton
                        icon="arrorwRight400Linear"
                        variant="ghost"
                        className="size-10!"
                        iconClassName="size-6!"
                        onClick={() => back()}
                    />
                    <div className="min-w-0">
                        <h1 className="text-title-md font-semibold text-on-surface">
                            بارگذاری گواهی جدید
                        </h1>
                        <p className="mt-0.5 text-label-sm text-outline">
                            فیلدهای ستاره‌دار الزامی هستند
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 overflow-hidden rounded-card-lg border border-outline-variant bg-surface-container-lowest px-5 py-4.5">
                    <DocumentFileUpload
                        fileName={fileName}
                        fileSize={fileSize}
                        onChange={handlePickFile}
                    />

                    <Controller
                        control={control}
                        name="tab"
                        render={({ field }) => (
                            <ChoiceGroup
                                label="دسته سند"
                                options={DOCUMENT_TAB_OPTIONS}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />

                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <Controller
                                control={control}
                                name="title"
                                render={({ field, fieldState }) => (
                                    <Input
                                        label="عنوان سند *"
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="مثلاً گواهی استاندارد ملی نساجی"
                                        error={Boolean(fieldState.error)}
                                        msg={fieldState.error?.message}
                                    />
                                )}
                            />
                        </div>
                        <Controller
                            control={control}
                            name="issuer"
                            render={({ field, fieldState }) => (
                                <Input
                                    label="مرجع صدور *"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="سازمان صادرکننده"
                                    error={Boolean(fieldState.error)}
                                    msg={fieldState.error?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="documentNo"
                            render={({ field }) => (
                                <Input
                                    label="شماره سند"
                                    value={field.value ?? ''}
                                    onChange={field.onChange}
                                    placeholder="ZR-C1000"
                                    dir="ltr"
                                    className="text-left"
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="issuedAt"
                            render={({ field }) => (
                                <CalendarButton
                                    label="تاریخ صدور *"
                                    placeholder="انتخاب تاریخ"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="expiresAt"
                            render={({ field }) => (
                                <CalendarButton
                                    label="تاریخ انقضا"
                                    placeholder="انتخاب تاریخ"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <div className="sm:col-span-2">
                            <label className="mb-1.5 block text-label-md text-on-surface-variant">
                                توضیحات
                            </label>
                            <Controller
                                control={control}
                                name="description"
                                render={({ field }) => (
                                    <Textarea
                                        value={field.value ?? ''}
                                        onChange={(event) =>
                                            field.onChange(event.target.value)
                                        }
                                        placeholder="توضیح کوتاه درباره دامنه اعتبار سند…"
                                        className="min-h-16 resize-y"
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <FileAndVisibilityFields />
                </div>

                <div className="flex items-center gap-2.5">
                    <Button
                        type="submit"
                        variant="primary"
                        className="flex-1 gap-2"
                    >
                        <Icon
                            label="checkSm400Linear"
                            className="size-4! text-on-primary"
                        />
                        ثبت سند
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => back()}
                    >
                        انصراف
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}

export default NewLiecense
