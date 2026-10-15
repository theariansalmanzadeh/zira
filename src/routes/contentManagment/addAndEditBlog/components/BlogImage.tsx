'use client'

import { useRef } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { cn } from '@shared/libs/utils'
import type { AddAndEditBlogFormValues } from '../schema'

const BlogImage = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { control, setValue } = useFormContext<AddAndEditBlogFormValues>()
    const imageName = useWatch({ control, name: 'imageName' }) ?? ''
    const hasImage = Boolean(imageName)

    const handlePick = (file?: File | null) => {
        if (!file) return
        setValue('imageName', file.name, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
        setValue('coverFile', file, { shouldDirty: true })
    }

    return (
        <div
            className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5"
            dir="rtl"
        >
            <h3 className="mb-3 text-label-lg font-semibold text-on-surface">
                تصویر شاخص
            </h3>

            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className={cn(
                    'flex min-h-32 w-full flex-col items-center justify-center gap-2 rounded-card-md border-2 border-dashed border-primary/35 bg-[#FBF7F7] px-4 py-6 transition-colors hover:bg-primary/5'
                )}
            >
                <Icon label="upload300Linear" className="size-7! text-primary" />
                <span className="text-label-md font-semibold text-primary">
                    {hasImage ? imageName : 'بارگذاری تصویر'}
                </span>
                <span className="text-label-sm text-outline">
                    JPG یا PNG · حداکثر ۲ مگابایت
                </span>
            </button>

            <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={(event) => handlePick(event.target.files?.[0])}
            />
        </div>
    )
}

export default BlogImage
