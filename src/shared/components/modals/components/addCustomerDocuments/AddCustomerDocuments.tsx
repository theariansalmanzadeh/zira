'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { CustomerDocumentType } from '@/src/api/types/admin/customers'
import DocumentFileUpload from '@/src/routes/contentManagment/liecense/new/components/DocumentFileUpload'
import {
    customerKeys,
    useUploadCustomerDocument,
} from '@/src/routes/customers/hooks/customers'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import type { BaseModalProps } from '../../types'

const DOCUMENT_TYPE_OPTIONS: { label: string; value: CustomerDocumentType }[] =
    [
        { label: 'کارت ملی', value: 'NATIONAL_CARD' },
        { label: 'شناسنامه', value: 'BIRTH_CERTIFICATE' },
        { label: 'پروانه کسب', value: 'BUSINESS_LICENSE' },
        { label: 'گواهی کد پستی', value: 'POSTAL_CODE_CERT' },
        { label: 'مدرک تحصیلی', value: 'EDUCATION_CERT' },
        { label: 'اجاره‌نامه یا سند مالکیت', value: 'PREMISES_LEASE_OR_DEED' },
        { label: 'مدارک مالیاتی', value: 'TAX_DOCUMENT' },
        { label: 'رتبه اعتباری بانکی', value: 'BANK_CREDIT_RATING' },
        { label: 'گواهی کد اقتصادی', value: 'ECONOMIC_CODE_CERT' },
        { label: 'سایر', value: 'OTHER' },
    ]

type AddCustomerDocumentsModalData = {
    customerId?: string
}

const formatFileSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) {
        return `${formatFaNumber(bytes / (1024 * 1024), { maximumFractionDigits: 1 })} مگابایت`
    }
    return `${formatFaNumber(Math.max(1, Math.round(bytes / 1024)))} کیلوبایت`
}

const AddCustomerDocuments = ({ closeModal, data }: BaseModalProps) => {
    const queryClient = useQueryClient()
    const params = useParams<{ id: string }>()
    const modalData = data as AddCustomerDocumentsModalData | null | undefined
    const customerId = modalData?.customerId || params.id || ''
    const [docType, setDocType] = useState<CustomerDocumentType | ''>('')
    const [file, setFile] = useState<File | null>(null)
    const { mutate, isPending } = useUploadCustomerDocument()

    const handleSubmit = () => {
        if (!customerId || !docType || !file) return

        mutate(
            {
                customerId,
                body: {
                    doc_type: docType,
                    file,
                },
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: customerKeys.profiles.documents(customerId),
                    })
                    toast.success('مدرک ثبت شد')
                    closeModal()
                },
            }
        )
    }

    return (
        <div className="flex flex-col gap-4" dir="rtl">
            <FormDropdown
                label="نوع مدرک"
                placeholder="انتخاب نوع مدرک"
                value={docType}
                options={DOCUMENT_TYPE_OPTIONS}
                onChange={(value) => setDocType(value as CustomerDocumentType)}
            />
            <DocumentFileUpload
                fileName={file?.name}
                fileSize={file ? formatFileSize(file.size) : undefined}
                onChange={(nextFile) => setFile(nextFile ?? null)}
            />
            <div className="flex justify-end border-t border-outline-variant pt-4">
                <Button
                    type="button"
                    variant="primary"
                    onClick={handleSubmit}
                    isLoading={isPending}
                    disabled={!customerId || !docType || !file || isPending}
                >
                    ثبت مدرک
                </Button>
            </div>
        </div>
    )
}

export default AddCustomerDocuments
