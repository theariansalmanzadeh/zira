'use client'

import { useRef } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { cn } from '@/src/shared/libs/utils'

type DocumentFileUploadProps = {
    title: string
    hint: string
    accept?: string
    fileName?: string
    onChange?: (file?: File | null) => void
    className?: string
}

const DocumentFileUpload = ({
    title,
    hint,
    accept = 'image/jpeg,image/png,application/pdf',
    fileName,
    onChange,
    className,
}: DocumentFileUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    return (
        <div
            className={cn(
                'flex flex-col items-stretch justify-between gap-4 rounded-container-lg border border-dashed border-outline-variant bg-surface-container-high/40 p-4 sm:flex-row sm:items-center',
                className
            )}
            dir="rtl"
        >
            <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-container-md bg-primary-container">
                    <Icon
                        label="upload300Linear"
                        className="size-6 text-on-primary-container"
                    />
                </div>
                <div className="flex min-w-0 flex-col">
                    <span className="text-label-lg text-on-surface">{title}</span>
                    {fileName ? (
                        <span
                            className="truncate text-label-md text-success"
                            dir="ltr"
                        >
                            {fileName}
                        </span>
                    ) : (
                        <span className="text-label-md text-outline">{hint}</span>
                    )}
                </div>
            </div>
            <Button
                type="button"
                variant="primary-outline"
                className="shrink-0"
                onClick={() => fileInputRef.current?.click()}
            >
                انتخاب فایل
            </Button>
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(event) => onChange?.(event.target.files?.[0])}
            />
        </div>
    )
}

export default DocumentFileUpload
