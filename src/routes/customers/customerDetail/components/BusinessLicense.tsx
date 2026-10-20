'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import type { DocumentReviewStatus } from '@/src/api/types/admin/customers'
import {
    useGetCustomerProfile,
    useListCustomerDocuments,
} from '@/src/routes/customers/hooks/customers'
import { Button } from '@/src/shared/components/ui/button'
import { Pill } from '@/src/shared/components/ui/Pill'
import { Spinner } from '@/src/shared/components/ui/spinner'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import { formatFaDate, formatFaNumber } from '@/src/shared/libs/formatter'
import { displayValue } from '../display'

const HEADERS = [
    'شماره پروانه کسب',
    'وضعیت بررسی',
    'حجم فایل',
    'تاریخ ثبت',
    '',
]

const REVIEW_STATUS: Record<
    DocumentReviewStatus,
    { text: string; variant: 'success' | 'warning' | 'error' }
> = {
    VERIFIED: { text: 'تأیید شده', variant: 'success' },
    PENDING: { text: 'در انتظار بررسی', variant: 'warning' },
    REJECTED: { text: 'رد شده', variant: 'error' },
}

const formatFileSize = (bytes: number) => {
    if (!bytes) return '—'
    if (bytes >= 1024 * 1024) {
        return `${formatFaNumber(bytes / (1024 * 1024), { maximumFractionDigits: 1 })} مگابایت`
    }
    return `${formatFaNumber(Math.max(1, Math.round(bytes / 1024)))} کیلوبایت`
}

const BusinessLicense = () => {
    const params = useParams<{ id: string }>()
    const customerId = params.id ?? ''
    const { data: profile } = useGetCustomerProfile(
        customerId,
        Boolean(customerId)
    )
    const { data, isPending, isError } = useListCustomerDocuments(
        customerId,
        Boolean(customerId)
    )

    const rows = useMemo(
        () =>
            (data?.results ?? []).filter(
                (document) => document.doc_type === 'BUSINESS_LICENSE'
            ),
        [data]
    )
    const licenseNo = displayValue(profile?.business_license_no)

    const openDocument = (downloadUrl: string) => {
        if (!downloadUrl) return
        const link = window.document.createElement('a')
        link.href = downloadUrl
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        window.document.body.appendChild(link)
        link.click()
        link.remove()
    }

    return (
        <div
            className="overflow-hidden rounded-card-md border border-outline-variant bg-surface-container-lowest"
            dir="rtl"
        >
            {isPending ? (
                <div className="flex justify-center p-6">
                    <Spinner className="size-6 text-outline" />
                </div>
            ) : isError ? (
                <p className="p-6 text-center text-label-md text-outline">
                    دریافت پروانه کسب با خطا مواجه شد.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <Table className="min-w-[760px] border-collapse">
                        <TableHeader className="bg-surface-container-high">
                            <TableRow className="border-b border-outline-variant hover:bg-transparent [&>*]:text-label-sm [&>*]:font-bold [&>*]:text-outline">
                                {HEADERS.map((label) => (
                                    <TableHead key={label || 'actions'}>
                                        {label}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.length === 0 ? (
                                <TableEmptyState
                                    colSpan={HEADERS.length}
                                    title="پروانه کسبی یافت نشد."
                                />
                            ) : (
                                rows.map((document) => {
                                    const status =
                                        REVIEW_STATUS[document.review_status]

                                    return (
                                        <TableRow
                                            key={document.id}
                                            className="[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant"
                                        >
                                            <TableCell dir="ltr" className="text-right">
                                                {licenseNo}
                                            </TableCell>
                                            <TableCell>
                                                <Pill
                                                    text={
                                                        status?.text ??
                                                        document.review_status
                                                    }
                                                    variant={
                                                        status?.variant ?? 'tonal'
                                                    }
                                                    hasDot
                                                    className="w-fit border-0"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {formatFileSize(document.file_size)}
                                            </TableCell>
                                            <TableCell>
                                                <span dir="ltr">
                                                    {document.created_at
                                                        ? formatFaDate(
                                                              document.created_at
                                                          )
                                                        : '—'}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="border-primary/30 text-primary"
                                                    disabled={!document.download_url}
                                                    onClick={() =>
                                                        openDocument(
                                                            document.download_url
                                                        )
                                                    }
                                                >
                                                    نمایش تصویر
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}

export default BusinessLicense
