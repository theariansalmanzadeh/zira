'use client'

import { useRef } from 'react'
import { Button } from '@/src/shared/components/ui/button'
import { Icon } from '@/src/shared/components/Icons/Icon'

const IMAGE_UPLOAD_HINT =
    'ابعاد پیشنهادی ۱۹۲۰ × ۷۰۰ پیکسل • JPG یا WebP • حداکثر ۲ مگابایت'

type ImageAttachmentProps = {
    label?: string
    required?: boolean
    hint?: string
    fileName?: string
    accept?: string
    onChange: (file?: File | null) => void
}

const ImageAttachment = ({
    label = 'تصویر بنر',
    required = true,
    hint = IMAGE_UPLOAD_HINT,
    fileName,
    accept = 'image/jpeg,image/jpg,image/webp,image/png',
    onChange,
}: ImageAttachmentProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const hasFile = Boolean(fileName)

    return (
        <div className="flex items-center gap-3 rounded-card-md border border-outline-variant bg-surface-container-lowest px-3.5 py-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-card-sm bg-primary/12 text-primary">
                <Icon label="upload300Linear" className="size-5!" />
            </div>
            <div className="min-w-0 flex-1">
                <div className="text-label-md font-bold text-on-surface">
                    {label}
                    {required ? (
                        <span className="text-primary"> *</span>
                    ) : null}
                </div>
                {hasFile ? (
                    <div
                        className="mt-1 truncate text-label-sm text-success"
                        dir="ltr"
                    >
                        {fileName}
                    </div>
                ) : (
                    <div className="mt-1 text-label-sm text-outline">{hint}</div>
                )}
            </div>
            <Button
                type="button"
                variant="default"
                className="shrink-0 bg-primary/12! text-primary hover:bg-primary/16!"
                onClick={() => fileInputRef.current?.click()}
            >
                انتخاب فایل
            </Button>
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(event) => onChange(event.target.files?.[0])}
            />
        </div>
    )
}

export default ImageAttachment
