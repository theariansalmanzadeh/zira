import type { CmsPage } from './common'

export type CertificateCategoryEnum = "CERTIFICATE" | "LICENSE"

export type CertificateFileTypeEnum = "PDF" | "IMAGE"

export type CertificateOut = {
    id: string
    /** نوع سند (CERTIFICATE: گواهی، LICENSE: مجوز و استاندارد) */
    category: CertificateCategoryEnum
    category_display: string
    title: string
    issuer: string
    document_no: string
    issued_on: string
    expires_on: string | null
    is_expired: boolean
    description: string
    file_url: string | null
    /** نوع فایل (PDF، IMAGE) — از محتوای فایل */
    file_type: CertificateFileTypeEnum
    is_visible: boolean
    sort_order: number
    /** وضعیت (PUBLISHED: فعال، ARCHIVED: آرشیو) */
    status: ContentStatusEnum
    status_display: string
    created_at: string
    updated_at: string
}

export type CertificateUpdateIn = {
    category?: CertificateCategoryEnum | null
    title?: string | null
    issuer?: string | null
    document_no?: string | null
    issued_on?: string | null
    expires_on?: string | null
    description?: string | null
    is_visible?: boolean | null
    sort_order?: number | null
}

export type ContentStatusEnum = "DRAFT" | "PUBLISHED" | "HIDDEN" | "ARCHIVED"

export type PaginationOut_CertificateOut_ = CmsPage<CertificateOut>

export type ListCertificatesParams = {
    page?: number
    page_size?: number
    query?: string | null
    category?: CertificateCategoryEnum | null
    is_visible?: boolean | null
    status?: ContentStatusEnum | null
    expired?: boolean | null
}

export type CreateCertificateRequest = {
    category: "CERTIFICATE" | "LICENSE"
    title: string
    issuer: string
    document_no: string
    issued_on: string
    expires_on: string | null
    description: string
    is_visible: boolean
    sort_order: number
    file: Blob
}

export type ReplaceCertificateFileRequest = {
    file: Blob
}
