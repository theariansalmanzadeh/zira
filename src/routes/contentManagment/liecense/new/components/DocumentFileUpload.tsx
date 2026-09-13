'use client'

import { useRef } from 'react'
import { Button } from '@/src/shared/components/ui/button'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { FILE_UPLOAD_HINT } from '../constants'

type DocumentFileUploadProps = {
    fileName?: string
    fileSize?: string
    onChange: (file?: File | null) => void
}

const DocumentFileUpload = ({
    fileName,
    fileSize,
    onChange,
}: DocumentFileUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const hasFile = Boolean(fileName)

    return (
        <div className="flex items-center gap-3 rounded-card-md border border-outline-variant bg-surface-container-high/50 px-3.5 py-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-card-sm bg-primary/12 text-primary">
                <Icon label="description400Linear" className="size-4!" />
            </div>
            <div className="min-w-0 flex-1">
                <div className="text-label-md font-bold text-on-surface">
                    فایل سند <span className="text-primary">*</span>
                </div>
                {hasFile ? (
                    <div
                        className="mt-1 truncate text-label-sm text-success"
                        dir="ltr"
                    >
                        {fileName}
                        {fileSize ? ` · ${fileSize}` : ''}
                    </div>
                ) : (
                    <div className="mt-1 text-label-sm text-outline">
                        {FILE_UPLOAD_HINT}
                    </div>
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
                accept=".pdf,image/png,image/jpeg"
                className="hidden"
                onChange={(event) => onChange(event.target.files?.[0])}
            />
        </div>
    )
}

export default DocumentFileUpload
