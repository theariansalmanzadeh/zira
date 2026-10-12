'use client'

import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { cn } from '@shared/libs/utils'
import {
    useCreateFaqItem,
    useListFaqCategories,
    useUpdateFaqItem,
} from '@/src/routes/contentManagment/hooks/faq'
import type { BaseModalProps } from '../../types'
import {
    addNewFaqFormSchema,
    getAddNewFaqDefaultValues,
    type AddNewFaqFormValues,
    type AddNewFaqModalData,
} from './schema'

export type { AddNewFaqModalData, AddNewFaqPayload } from './schema'

const AddNewFaq = ({ closeModal, data }: BaseModalProps) => {
    const modalData = (data as AddNewFaqModalData | null | undefined) ?? {}
    const isEditing = Boolean(modalData.id)
    const { mutate: createFaqItem, isPending: isCreating } = useCreateFaqItem()
    const { mutate: updateFaqItem, isPending: isUpdating } = useUpdateFaqItem()
    const { data: categoryPage } = useListFaqCategories()
    const isPending = isCreating || isUpdating

    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { isValid },
    } = useForm<AddNewFaqFormValues>({
        resolver: zodResolver(addNewFaqFormSchema),
        defaultValues: getAddNewFaqDefaultValues(modalData.defaultValues),
        mode: 'onSubmit',
    })

    const [categories, categoryId, isAddingCategory] = useWatch({
        control,
        name: ['categories', 'categoryId', 'isAddingCategory'],
    })

    useEffect(() => {
        const nextCategories = (categoryPage?.results ?? []).map((category) => ({
            id: category.id,
            label: category.name,
        }))
        if (!nextCategories.length) return

        setValue('categories', nextCategories)
        const currentId = getValues('categoryId')
        if (nextCategories.some((category) => category.id === currentId)) return

        const preferredId = modalData.defaultValues?.categoryId
        const nextId = nextCategories.some((category) => category.id === preferredId)
            ? preferredId
            : nextCategories[0].id
        if (nextId) setValue('categoryId', nextId)
    }, [categoryPage, getValues, modalData.defaultValues?.categoryId, setValue])

    const selectedCategory = useMemo(
        () => categories?.find((category) => category.id === categoryId),
        [categories, categoryId]
    )

    const handleAddCategory = () => {
        const label = getValues('newCategoryName').trim()
        if (!label) return

        const id = `custom-${Date.now()}`
        const nextCategories = [...getValues('categories'), { id, label }]
        setValue('categories', nextCategories, { shouldDirty: true })
        setValue('categoryId', id, { shouldValidate: true, shouldDirty: true })
        setValue('newCategoryName', '')
        setValue('isAddingCategory', false)
    }

    const onSubmit = (values: AddNewFaqFormValues) => {
        const category = values.categories.find(
            (item) => item.id === values.categoryId
        )
        if (!category) return

        const body = {
            category_id: category.id,
            question: values.question.trim(),
            answer: values.answer.trim(),
        }

        if (isEditing && modalData.id) {
            updateFaqItem(
                { itemId: modalData.id, body },
                {
                    onSuccess: () => {
                        toast.success('تغییرات ذخیره شد')
                        closeModal()
                    },
                }
            )
            return
        }

        createFaqItem(
            { body },
            {
                onSuccess: () => {
                    toast.success('سوال ثبت شد')
                    closeModal()
                },
            }
        )
    }

    return (
        <form
            className="flex w-full flex-col gap-4"
            dir="rtl"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col gap-2">
                <span className="text-label-md font-semibold text-on-surface-variant">
                    گروه مرتبط
                </span>
                <div className="flex flex-wrap items-center gap-2">
                    {(categories ?? []).map((category) => {
                        const selected = category.id === categoryId

                        return (
                            <button
                                key={category.id}
                                type="button"
                                onClick={() =>
                                    setValue('categoryId', category.id, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    })
                                }
                                className={cn(
                                    'rounded-card-sm border-[1.5px] px-3.5 py-1.5 text-label-md font-semibold transition-colors',
                                    selected
                                        ? 'border-primary bg-primary/8 text-primary'
                                        : 'border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
                                )}
                            >
                                {category.label}
                            </button>
                        )
                    })}

                    {!isAddingCategory && (
                        <button
                            type="button"
                            onClick={() => setValue('isAddingCategory', true)}
                            className="inline-flex items-center gap-1 rounded-card-sm border-[1.5px] border-dashed border-[#d9c9e4] px-3.5 py-1.5 text-label-md font-bold text-[#8E6CB0] transition-colors hover:bg-[#F5F0F9]"
                        >
                            <span className="text-base leading-none">+</span>
                            گروه جدید
                        </button>
                    )}
                </div>

                {isAddingCategory && (
                    <div className="mt-1 flex items-center gap-2 rounded-card-md border border-outline-variant bg-surface-container-high/60 p-2.5">
                        <div className="min-w-0 flex-1">
                            <Controller
                                control={control}
                                name="newCategoryName"
                                render={({ field }) => (
                                    <Input
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="نام گروه جدید، مثلاً ارسال و تحویل"
                                    />
                                )}
                            />
                        </div>
                        <Button
                            type="button"
                            variant="primary"
                            className="shrink-0 bg-[#8E6CB0]! hover:bg-[#7d5c9e]!"
                            onClick={handleAddCategory}
                        >
                            افزودن
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="size-9! shrink-0 p-0!"
                            onClick={() => {
                                setValue('isAddingCategory', false)
                                setValue('newCategoryName', '')
                            }}
                        >
                            <Icon label="closeSm400Linear" className="size-4!" />
                        </Button>
                    </div>
                )}
            </div>

            <Controller
                control={control}
                name="question"
                render={({ field, fieldState }) => (
                    <Input
                        label="سوال"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="متن سوال را وارد کنید"
                        error={Boolean(fieldState.error)}
                        msg={fieldState.error?.message}
                    />
                )}
            />

            <div className="flex flex-col">
                <label className="mb-1.5 text-label-md text-on-surface-variant">
                    پاسخ
                </label>
                <Controller
                    control={control}
                    name="answer"
                    render={({ field, fieldState }) => (
                        <>
                            <Textarea
                                value={field.value}
                                onChange={(event) =>
                                    field.onChange(event.target.value)
                                }
                                placeholder="پاسخ کامل را بنویسید"
                            />
                            {fieldState.error?.message && (
                                <span className="mt-1 text-label-sm text-error">
                                    {fieldState.error.message}
                                </span>
                            )}
                        </>
                    )}
                />
            </div>

            <div className="flex items-center gap-2.5 pt-4">
                <Button
                    type="submit"
                    variant="primary"
                    className="flex-1 gap-2"
                    disabled={!isValid || !selectedCategory || isPending}
                    isLoading={isPending}
                >
                    <Icon label="checkSm400Linear" className="size-4! text-on-primary" />
                    {isEditing ? 'ذخیره تغییرات' : 'ثبت سوال'}
                </Button>
                <Button type="button" variant="outline" onClick={closeModal}>
                    انصراف
                </Button>
            </div>
        </form>
    )
}

export default AddNewFaq
