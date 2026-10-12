'use client'

import { useParams } from 'next/navigation'
import { cn } from '@shared/libs/utils'
import { formatFaDate } from '@/src/shared/libs/formatter'
import { useCertificateDetail } from '@/src/routes/contentManagment/hooks/certificates'

const displayValue = (value?: string | null) =>
    value == null || value.trim() === '' ? '-' : value

const displayDate = (value?: string | null) =>
    value ? formatFaDate(value) : '-'

const fileTypeLabel = (fileType?: string | null) => {
    if (fileType === 'IMAGE') return 'IMG'
    if (fileType === 'PDF') return 'PDF'
    return '-'
}

const Field = ({
    label,
    value,
    className,
}: {
    label: string
    value: string
    className?: string
}) => (
    <div className={cn('flex flex-col gap-2 text-right', className)}>
        <span className="text-label-md text-outline">{label}</span>
        <span className="text-label-lg text-on-surface">{value}</span>
    </div>
)

const LiecenseDetails = () => {
    const { id } = useParams<{ id: string }>()
    const { data } = useCertificateDetail(id ?? '')

    return (
        <div className="flex flex-col gap-4" dir="rtl">
            <div className="rounded-card-md bg-surface-container-lowest px-6 py-6">
                <div className="grid grid-cols-5 gap-6">
                    <Field label="مرجع صدور" value={displayValue(data?.issuer)} />
                    <Field label="شماره سند" value={displayValue(data?.document_no)} />
                    <Field label="تاریخ صدور" value={displayDate(data?.issued_on)} />
                    <Field label="تاریخ انقضا" value={displayDate(data?.expires_on)} />
                    <Field label="نوع فایل" value={fileTypeLabel(data?.file_type)} />
                    <Field
                        label="توضیحات"
                        value={displayValue(data?.description)}
                        className="col-span-5"
                    />
                </div>
            </div>

            <div className="overflow-hidden rounded-card-md bg-surface-container-lowest">
                {data?.file_url && (
                    <img
                        src={data.file_url}
                        alt={data.title}
                        className="max-h-180 w-full object-contain"
                    />
                )}
            </div>
        </div>
    )
}

export default LiecenseDetails
