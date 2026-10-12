'use client'

import { useMemo } from 'react'
import type {
    CustomerDocument,
    CustomerDocumentType,
    DocumentReviewStatus,
} from '@/src/api/types/admin/customers'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { formatFaDate, formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@/src/shared/libs/utils'
import { useListRegistrationRequestDocuments } from '../../hooks/customers'

const DOCUMENT_SLOTS: { docType: CustomerDocumentType; title: string }[] = [
    { docType: 'BUSINESS_LICENSE', title: 'تصویر پروانه کسب' },
    { docType: 'NATIONAL_CARD', title: 'تصویر کارت ملی' },
    { docType: 'BIRTH_CERTIFICATE', title: 'تصویر شناسنامه' },
    {
        docType: 'PREMISES_LEASE_OR_DEED',
        title: 'اجاره‌نامه یا سند مالکیت مغازه',
    },
]

type UploadedDocumentsProps = {
    requestId: string
}

const formatFileSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) {
        const megabytes = bytes / (1024 * 1024)
        return `مگابایت ${formatFaNumber(megabytes, { maximumFractionDigits: 1 })}`
    }

    const kilobytes = Math.max(1, Math.round(bytes / 1024))
    return `کیلوبایت ${formatFaNumber(kilobytes, { maximumFractionDigits: 0 })}`
}

const formatDocumentDate = (value: string) => {
    const formatted = formatFaDate(value)
    const [day, month, year] = formatted.split('/')
    if (!day || !month || !year) return formatted
    return `${year}/${month}/${day}`
}

const REVIEW_STATUS_LABEL: Record<DocumentReviewStatus, string> = {
    PENDING: 'در انتظار بررسی',
    VERIFIED: 'تأیید شده',
    REJECTED: 'رد شده',
}

const documentMeta = (document: CustomerDocument) => {
    const date = document.verified_at || document.created_at
    const parts = [
        formatFileSize(document.file_size),
        formatDocumentDate(date),
        REVIEW_STATUS_LABEL[document.review_status],
    ]
    if (document.review_status === 'REJECTED' && document.rejection_reason) {
        parts.push(document.rejection_reason)
    }
    return parts.join(' — ')
}

const UploadedDocuments = ({ requestId }: UploadedDocumentsProps) => {
    const { data, isPending, isError } = useListRegistrationRequestDocuments(
        requestId,
        Boolean(requestId)
    )

    const rows = useMemo(() => {
        const documents = data?.results ?? []
        const usedIds = new Set<string>()
        const slots = DOCUMENT_SLOTS.map((slot) => {
            const document = documents.find(
                (item) => item.doc_type === slot.docType
            )
            if (document) usedIds.add(document.id)
            return { title: document?.doc_type_display || slot.title, document }
        })
        const extras = documents
            .filter((document) => !usedIds.has(document.id))
            .map((document) => ({
                title: document.doc_type_display,
                document,
            }))

        return [...slots, ...extras]
    }, [data])

    const handleDownload = (file: CustomerDocument) => {
        if (!file.download_url) return

        const link = window.document.createElement('a')
        link.href = file.download_url
        link.download = file.doc_type_display || file.doc_type
        link.rel = 'noopener noreferrer'
        window.document.body.appendChild(link)
        link.click()
        link.remove()
    }

    return (
        <section className="flex flex-col gap-3" dir="rtl">
            <h2 className="text-right text-title-lg font-semibold text-on-surface">
                مدارک بارگذاری‌شده
            </h2>
            {isPending ? (
                <p className="text-label-md text-outline">در حال دریافت مدارک...</p>
            ) : isError ? (
                <p className="text-label-md text-outline">
                    دریافت مدارک با خطا مواجه شد.
                </p>
            ) : (
                <div className="flex flex-col gap-2">
                    {rows.map((row) => {
                        const document = row.document
                        const uploaded = Boolean(document)
                        const rejected = document?.review_status === 'REJECTED'
                        return (
                            <div
                                key={document?.id ?? row.title}
                                className="flex items-center justify-between gap-3 rounded-card-md bg-surface-container-high px-4 py-3"
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <span
                                        className={cn(
                                            'flex size-8 shrink-0 items-center justify-center rounded-lg',
                                            uploaded && !rejected
                                                ? 'bg-success-container text-success'
                                                : 'bg-warning-container text-warning'
                                        )}
                                    >
                                        <Icon
                                            label={
                                                uploaded && !rejected
                                                    ? 'checkCircle400Linear'
                                                    : 'warning400Linear'
                                            }
                                            className="size-5!"
                                        />
                                    </span>
                                    <div className="flex min-w-0 flex-col text-right">
                                        <span className="text-label-lg font-semibold text-on-surface">
                                            {row.title}
                                        </span>
                                        <span className="text-label-md text-outline">
                                            {document
                                                ? documentMeta(document)
                                                : 'بارگذاری نشده'}
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="primary-outline"
                                    className="h-9 shrink-0 rounded-xl px-5"
                                    disabled={!uploaded}
                                    onClick={() =>
                                        document && handleDownload(document)
                                    }
                                >
                                    دانلود
                                </Button>
                            </div>
                        )
                    })}
                </div>
            )}
        </section>
    )
}

export default UploadedDocuments
