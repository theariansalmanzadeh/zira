'use client'

import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import { Pill } from '@/src/shared/components/ui/Pill'
import { cn } from '@shared/libs/utils'
import { BLOG_FORM_CATEGORIES } from '../constants'
import type { AddAndEditBlogFormValues } from '../schema'

export type BlogCategoryOption = {
    id: string
    label: string
}

type CategoriesProps = {
    onAddCategory?: () => void
}

const Categories = ({ onAddCategory }: CategoriesProps) => {
    const { control, setValue } = useFormContext<AddAndEditBlogFormValues>()
    const selectedCategoryIds =
        useWatch({ control, name: 'categories.selectedCategoryIds' }) ?? []

    const toggleCategory = (id: string) => {
        const selected = selectedCategoryIds.includes(id)
            ? selectedCategoryIds.filter((item) => item !== id)
            : [...selectedCategoryIds, id]

        setValue('categories.selectedCategoryIds', selected, {
            shouldDirty: true,
            shouldValidate: true,
        })
    }

    return (
        <div
            className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5"
            dir="rtl"
        >
            <h3 className="mb-3.5 text-label-lg font-semibold text-on-surface">
                دسته‌بندی و فراداده
            </h3>

            <div className="mb-4 flex flex-col gap-2">
                <span className="text-label-md text-on-surface-variant">
                    دسته‌بندی
                </span>
                <div className="flex flex-wrap items-center gap-2">
                    {BLOG_FORM_CATEGORIES.map((category) => {
                        const isSelected = selectedCategoryIds.includes(
                            category.id
                        )

                        return (
                            <Pill
                                key={category.id}
                                text={category.label}
                                variant="tonal"
                                size="sm"
                                className={cn(
                                    'cursor-pointer border-0 bg-primary-container [&_span]:text-primary',
                                    !isSelected && 'opacity-70'
                                )}
                                onClose={() => toggleCategory(category.id)}
                            />
                        )
                    })}

                    <button
                        type="button"
                        onClick={onAddCategory}
                        className="inline-flex items-center rounded-full border border-dashed border-primary/40 px-3 py-1 text-label-md font-bold text-primary transition-colors hover:bg-primary/5"
                    >
                        + افزودن دسته
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div className="flex flex-col">
                    <label className="mb-1.5 text-label-md text-on-surface-variant">
                        نویسنده
                    </label>
                    <Controller
                        control={control}
                        name="categories.author"
                        render={({ field }) => (
                            <Input
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="نام نویسنده"
                            />
                        )}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1.5 text-label-md text-on-surface-variant">
                        منبع
                    </label>
                    <Controller
                        control={control}
                        name="categories.source"
                        render={({ field }) => (
                            <Input
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="اختیاری"
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default Categories
