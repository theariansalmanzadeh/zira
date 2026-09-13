'use client'

import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import type { AddAndEditBlogFormValues } from '../schema'

const BlogDetailsCard = () => {
    const { control } = useFormContext<AddAndEditBlogFormValues>()
    const summary = useWatch({ control, name: 'details.summary' }) ?? ''

    return (
        <div
            className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5"
            dir="rtl"
        >
            <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div className="flex flex-col">
                    <label className="mb-1.5 text-label-md text-on-surface-variant">
                        نام مقاله <span className="text-error">*</span>
                    </label>
                    <Controller
                        control={control}
                        name="details.title"
                        render={({ field }) => (
                            <Input
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="عنوان مقاله را وارد کنید"
                            />
                        )}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1.5 text-label-md text-on-surface-variant">
                        موضوع
                    </label>
                    <Controller
                        control={control}
                        name="details.subject"
                        render={({ field }) => (
                            <Input
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="موضوع اصلی مقاله"
                            />
                        )}
                    />
                </div>
            </div>

            <div className="flex flex-col">
                <label className="mb-1.5 text-label-md text-on-surface-variant">
                    خلاصه متن <span className="text-error">*</span>
                </label>
                <Controller
                    control={control}
                    name="details.summary"
                    render={({ field }) => (
                        <Textarea
                            value={field.value}
                            onChange={(event) =>
                                field.onChange(event.target.value)
                            }
                            placeholder="چکیده‌ای کوتاه…"
                            className="min-h-16 resize-y"
                        />
                    )}
                />
                <span className="mt-1.5 text-label-sm text-outline">
                    {formatFaNumber(summary.length)} نویسه — برای توضیحات گوگل
                    ۱۲۰ تا ۱۶۰ نویسه بهینه است
                </span>
            </div>
        </div>
    )
}

export default BlogDetailsCard
