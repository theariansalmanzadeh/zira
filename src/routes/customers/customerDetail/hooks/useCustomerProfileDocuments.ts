'use client'

import type { CustomerDocument } from '@/src/api/types/admin/customers'
import { useListCustomerDocuments } from '@/src/routes/customers/hooks/customers'
import { formatFaNumber } from '@/src/shared/libs/formatter'

const REVIEW_STATUS_LABEL = {
    PENDING: 'در انتظار بررسی',
    VERIFIED: 'تأیید شده',
    REJECTED: 'رد شده',
} as const

const formatFileSize = (bytes: number) => {
    if (!bytes) return '-'
    if (bytes >= 1024 * 1024) {
        return `${formatFaNumber(bytes / (1024 * 1024), { maximumFractionDigits: 1 })} مگابایت`
    }
    return `${formatFaNumber(Math.max(1, Math.round(bytes / 1024)))} کیلوبایت`
}

export type CustomerProfileDocumentRow = {
    id: string
    title: string
    subtitle: string
    downloadUrl: string
}

const toRow = (document: CustomerDocument): CustomerProfileDocumentRow => ({
    id: document.id,
    title: document.doc_type_display || document.doc_type,
    subtitle: `${formatFileSize(document.file_size)} — ${REVIEW_STATUS_LABEL[document.review_status]}`,
    downloadUrl: document.download_url,
})

export const useCustomerProfileDocuments = (customerId: string) => {
    const query = useListCustomerDocuments(customerId, Boolean(customerId))
    const documents = Array.isArray(query.data) ? query.data : []

    return {
        ...query,
        rows: documents.map(toRow),
    }
}
