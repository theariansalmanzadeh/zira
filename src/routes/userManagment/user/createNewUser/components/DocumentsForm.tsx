'use client'

import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useUploadStaffDocument } from '@/src/routes/userManagment/hooks/user'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@/src/shared/libs/utils'
import type { NewUserFormValues } from '../schema'

const DOCUMENT_TYPE_OPTIONS = [
    { label: 'کارت ملی', value: 'NATIONAL_CARD' },
    { label: 'شناسنامه', value: 'BIRTH_CERTIFICATE' },
    { label: 'مدرک تحصیلی', value: 'EDUCATION_CERT' },
    { label: 'سایر', value: 'OTHER' },
]

type UploadedDocument = {
    file: string
    slot: string
    label: string
    name: string
    previewUrl: string
    isImage: boolean
}

const DocumentsForm = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { getValues, setValue } = useFormContext<NewUserFormValues>()
    const { mutateAsync: uploadStaffDocument, isPending } =
        useUploadStaffDocument()
    const [slot, setSlot] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [documents, setDocuments] = useState<UploadedDocument[]>([])

    const slotLabel =
        DOCUMENT_TYPE_OPTIONS.find((option) => option.value === slot)?.label ??
        slot

    const handleUpload = async () => {
        if (!file || !slot) return

        try {
            const uploaded = await uploadStaffDocument({ file, slot })
            const storedSlot = uploaded.slot || slot

            const nextDocuments = [
                ...(getValues('documents') ?? []),
                { slot: storedSlot, file: uploaded.file },
            ]
            setValue('documents', nextDocuments, { shouldDirty: true })
            setDocuments((prev) => [
                ...prev,
                {
                    file: uploaded.file,
                    slot: storedSlot,
                    label: slotLabel,
                    name: file.name,
                    previewUrl: URL.createObjectURL(file),
                    isImage:
                        uploaded.content_type.startsWith('image/') ||
                        file.type.startsWith('image/'),
                },
            ])
            setFile(null)
            if (fileInputRef.current) fileInputRef.current.value = ''
        } catch {
            return
        }
    }

    return (
        <div className='mb-6 flex flex-col gap-4' dir='rtl'>
            <FormDropdown
                label='نوع مدرک'
                placeholder='انتخاب نوع مدرک'
                value={slot}
                options={DOCUMENT_TYPE_OPTIONS}
                onChange={setSlot}
            />

            <div className='flex flex-col items-stretch gap-3 sm:flex-row sm:items-center'>
                <span className='shrink-0 text-label-md text-on-surface-variant'>
                    فایل مدرک
                </span>
                <button
                    type='button'
                    className='flex min-h-12 flex-1 items-center justify-center gap-2 rounded-card-lg border border-dashed border-error bg-error-container/50 px-4 py-3 text-label-md text-error'
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                        event.preventDefault()
                        setFile(event.dataTransfer.files?.[0] ?? null)
                    }}
                >
                    <Icon label='upload300Linear' className='size-5 text-error' />
                    <span className='truncate'>
                        {file?.name || 'انتخاب فایل یا رهاکردن آن در اینجا'}
                    </span>
                </button>
                <Button
                    type='button'
                    variant='primary'
                    className='shrink-0 rounded-full px-6'
                    onClick={handleUpload}
                    isLoading={isPending}
                    disabled={!file || !slot || isPending}
                >
                    آپلود
                </Button>
                <input
                    ref={fileInputRef}
                    type='file'
                    accept='image/jpeg,image/png,image/webp,application/pdf'
                    className='hidden'
                    onChange={(event) =>
                        setFile(event.target.files?.[0] ?? null)
                    }
                />
            </div>

            <section className='overflow-hidden rounded-card-lg border border-outline-variant bg-surface-container-lowest'>
                <div className='flex items-center justify-between border-b border-outline-variant px-4 py-3'>
                    <div className='flex items-center gap-2'>
                        <span className='h-4 w-1 rounded-full bg-error' />
                        <span className='text-label-lg font-bold text-on-surface'>
                            مدارک بارگذاری‌شده
                        </span>
                    </div>
                    <span className='text-label-md font-semibold text-error'>
                        {formatFaNumber(documents.length)} فایل
                    </span>
                </div>

                {documents.length === 0 ? (
                    <div className='flex flex-col items-center gap-1 px-4 py-10 text-center'>
                        <span className='text-label-md text-on-surface-variant'>
                            هنوز مدرکی بارگذاری نشده است
                        </span>
                        <span className='text-label-sm text-outline'>
                            نوع مدرک را انتخاب کنید و فایل آن را آپلود کنید.
                        </span>
                    </div>
                ) : (
                    <ul className='flex flex-col'>
                        {documents.map((document) => (
                            <li
                                key={document.file}
                                className='flex items-center gap-3 border-b border-outline-variant/60 px-4 py-3 last:border-b-0'
                            >
                                <div
                                    className={cn(
                                        'flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-surface-container-high'
                                    )}
                                >
                                    {document.isImage ? (
                                        // blob preview; next/image does not load object URLs
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={document.previewUrl}
                                            alt=''
                                            className='size-6 object-cover'
                                        />
                                    ) : (
                                        <Icon
                                            label='description400Linear'
                                            className='size-4 text-outline'
                                        />
                                    )}
                                </div>
                                <div className='flex min-w-0 flex-col'>
                                    <span className='truncate text-label-md text-on-surface'>
                                        {document.label}
                                    </span>
                                    <span
                                        className='truncate text-label-sm text-outline'
                                        dir='ltr'
                                    >
                                        {document.name}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    )
}

export default DocumentsForm
