'use client'

import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import {
    useDeleteUserDocument,
    useUploadStaffDocument,
} from '@/src/routes/userManagment/hooks/user'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import IconButton from '@/src/shared/components/ui/IconButton'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@/src/shared/libs/utils'
import {
    DOCUMENT_SLOT_OPTIONS,
    type StaffDocumentSlot,
} from '../constants'
import {
    useNewUser,
    type UploadedDocument,
} from '../provider/NewUserProvider'
import type { NewUserFormValues } from '../schema'

const DOCUMENT_TYPE_OPTIONS = DOCUMENT_SLOT_OPTIONS.map((slot) => ({
    label: slot.label,
    value: slot.value,
}))

const DocumentsForm = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const {
        getValues,
        setValue,
        formState: { errors },
    } = useFormContext<NewUserFormValues>()
    const {
        userId,
        slot,
        setSlot,
        file,
        setFile,
        documents,
        setDocuments,
    } = useNewUser()
    const { mutateAsync: uploadStaffDocument, isPending } =
        useUploadStaffDocument()
    const { mutateAsync: deleteUserDocument, isPending: isDeleting } =
        useDeleteUserDocument()

    const slotLabel =
        DOCUMENT_TYPE_OPTIONS.find((option) => option.value === slot)?.label ??
        slot

    const removeDocumentLocally = (document: UploadedDocument) => {
        setDocuments((prev) =>
            prev.filter((item) => item.file !== document.file)
        )
        setValue(
            'documents',
            (getValues('documents') ?? []).filter(
                (item) => item.file !== document.file
            ),
            { shouldDirty: true, shouldValidate: true }
        )
        if (document.previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(document.previewUrl)
        }
    }

    const handleRemove = async (document: UploadedDocument) => {
        if (userId && document.id) {
            try {
                await deleteUserDocument({
                    userId,
                    documentId: document.id,
                })
            } catch {
                return
            }
        }
        removeDocumentLocally(document)
    }

    const handleUpload = async () => {
        if (!file || !slot) return

        try {
            const uploaded = await uploadStaffDocument({ file, slot })
            const storedSlot = (uploaded.slot ||
                slot) as StaffDocumentSlot

            const nextDocuments = [
                ...(getValues('documents') ?? []).filter(
                    (document) => document.slot !== storedSlot
                ),
                { slot: storedSlot, file: uploaded.file },
            ]
            setValue('documents', nextDocuments, {
                shouldDirty: true,
                shouldValidate: true,
            })
            setDocuments((prev) => [
                ...prev.filter((document) => document.slot !== storedSlot),
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
        <div className='mb-6 flex flex-col gap-4 bg-surface-container-lowest p-4 rounded-card-lg' dir='rtl'>
            <FormDropdown
                label='نوع مدرک'
                placeholder='انتخاب نوع مدرک'
                value={slot}
                options={DOCUMENT_TYPE_OPTIONS}
                onChange={setSlot}
            />

            <div className='flex flex-col items-stretch gap-3 sm:flex-row sm:items-center p-4 rounded-card-lg'>
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

                {errors.documents?.message ||
                errors.documents?.root?.message ? (
                    <p className='border-b border-outline-variant px-4 py-3 text-label-sm text-error'>
                        {errors.documents.message ||
                            errors.documents.root?.message}
                    </p>
                ) : null}

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
                                key={document.id ?? document.file}
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
                                <div className='flex min-w-0 flex-1 flex-col'>
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
                                <IconButton
                                    type='button'
                                    icon='closeSm400Linear'
                                    variant='ghost'
                                    className='size-8 shrink-0'
                                    iconClassName='size-4!'
                                    disabled={isDeleting}
                                    onClick={() => handleRemove(document)}
                                    aria-label='حذف مدرک'
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    )
}

export default DocumentsForm
