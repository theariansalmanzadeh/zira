'use client'

import { useState, type KeyboardEvent } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { Button } from '@/src/shared/components/ui/button'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Pill } from '@/src/shared/components/ui/Pill'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import type { AddAndEditBlogFormValues } from '../schema'

const TAGS_HINT =
    'برچسب‌ها مسیر ورود مخاطب از موتورهای جستجو هستند. کلیدواژه‌های دقیق و مرتبط با متن مقاله را اضافه کنید.'

const SeoCard = () => {
    const { control, setValue } = useFormContext<AddAndEditBlogFormValues>()
    const tags = useWatch({ control, name: 'seo.tags' }) ?? []
    const [tagInput, setTagInput] = useState('')

    const addTag = () => {
        const nextTag = tagInput.trim()
        if (!nextTag) return
        if (tags.includes(nextTag)) {
            setTagInput('')
            return
        }

        setValue('seo.tags', [...tags, nextTag], {
            shouldDirty: true,
            shouldValidate: true,
        })
        setTagInput('')
    }

    const removeTag = (tag: string) => {
        setValue(
            'seo.tags',
            tags.filter((item) => item !== tag),
            { shouldDirty: true, shouldValidate: true }
        )
    }

    const handleTagKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return
        event.preventDefault()
        addTag()
    }

    return (
        <div
            className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5"
            dir="rtl"
        >
            <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="text-label-lg font-semibold text-on-surface">
                            برچسب‌ها <span className="text-error">*</span>
                        </h3>
                        <p className="mt-1 text-label-sm leading-6 text-outline">
                            {TAGS_HINT}
                        </p>
                    </div>
                    <span className="shrink-0 rounded-card-sm bg-info-container px-2.5 py-1 text-label-sm font-semibold text-info">
                        {formatFaNumber(tags.length)} برچسب
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="min-w-0 flex-1">
                        <Input
                            value={tagInput}
                            onChange={setTagInput}
                            onKeyDown={handleTagKeyDown}
                            placeholder="برچسب را بنویسید و Enter بزنید…"
                        />
                    </div>
                    <Button
                        type="button"
                        variant="primary"
                        className="shrink-0 gap-1.5"
                        onClick={addTag}
                    >
                        <Icon
                            label="addSm400Linear"
                            className="size-4! text-on-primary"
                        />
                        افزودن
                    </Button>
                </div>

                {tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                        {tags.map((tag) => (
                            <Pill
                                key={tag}
                                text={tag}
                                variant="info"
                                size="sm"
                                onClose={() => removeTag(tag)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <hr className="my-5 border-0 border-t border-outline-variant" />

            <div className="flex flex-col gap-3.5">
                <h3 className="text-label-lg font-semibold text-on-surface">
                    تنظیمات سئو
                </h3>

                <div className="flex flex-col">
                    <label className="mb-1.5 text-label-md text-on-surface-variant">
                        نامک (URL)
                    </label>
                    <Controller
                        control={control}
                        name="seo.slug"
                        render={({ field }) => (
                            <Input
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="zira-article-1038"
                                dir="ltr"
                                className="text-left"
                            />
                        )}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1.5 text-label-md text-on-surface-variant">
                        عنوان متا
                    </label>
                    <Controller
                        control={control}
                        name="seo.metaTitle"
                        render={({ field }) => (
                            <Input
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="عنوان متا را وارد کنید"
                            />
                        )}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1.5 text-label-md text-on-surface-variant">
                        توضیحات متا
                    </label>
                    <Controller
                        control={control}
                        name="seo.metaDescription"
                        render={({ field }) => (
                            <Textarea
                                value={field.value}
                                onChange={(event) =>
                                    field.onChange(event.target.value)
                                }
                                placeholder="توضیحات متا را وارد کنید"
                                className="min-h-20 resize-y"
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default SeoCard
