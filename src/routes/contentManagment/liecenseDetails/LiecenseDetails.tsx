'use client'

import { useParams } from 'next/navigation'
import { cn } from '@shared/libs/utils'
import { formatFaDate } from '@/src/shared/libs/formatter'
import { getFileTypeLabel, getLiecenseDetails } from './constants'

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
    const data = getLiecenseDetails(id)

    return (
        <div className="flex flex-col gap-4" dir="rtl">
            <div className="rounded-card-md bg-surface-container-lowest px-6 py-6">
                <div className="grid grid-cols-5 gap-6">
                    <Field label="مرجع صدور" value={data.issuer} />
                    <Field label="شماره سند" value={data.code} />
                    <Field label="تاریخ صدور" value={formatFaDate(data.issuedAt)} />
                    <Field label="تاریخ انقضا" value={formatFaDate(data.expiresAt)} />
                    <Field label="نوع فایل" value={getFileTypeLabel(data)} />
                    <Field
                        label="توضیحات"
                        value={data.description}
                        className="col-span-5"
                    />
                </div>
            </div>

            <div className="overflow-hidden rounded-card-md bg-surface-container-lowest">
                <img
                    src={data.previewUrl}
                    alt={data.title}
                    className="max-h-180 w-full object-contain"
                />
            </div>
        </div>
    )
}

export default LiecenseDetails
