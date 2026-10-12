'use client'

import InfoCardField from '@/src/shared/components/infoCard/components/InfoCardField'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill } from '@/src/shared/components/ui/Pill'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import { cn } from '@/src/shared/libs/utils'
import type { CreditDocumentData } from '../constants'

type CreditDocumentCardProps = {
    data: CreditDocumentData
}

const STATUS_CONFIG = {
    active: { text: 'فعال', variant: 'success' as const },
    pending: { text: 'در انتظار تایید', variant: 'warning' as const },
    released: { text: 'آزاد شده', variant: 'tonal' as const },
}

const CreditDocumentCard = ({ data }: CreditDocumentCardProps) => {
    const status = STATUS_CONFIG[data.status]

    return (
        <div
            className="overflow-hidden rounded-card-md border border-outline-variant bg-surface-container-lowest"
            dir="rtl"
        >
            <div className="flex items-center gap-3 bg-surface-container-high px-4 py-3">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-label-sm text-outline">
                    {formatFaNumber(data.index)}
                </div>
                <Pill
                    text={data.typeLabel}
                    variant={data.typeTone === 'primary' ? 'tonal' : 'warning'}
                    className={cn(
                        'border-0',
                        data.typeTone === 'primary' &&
                            'bg-primary-container [&_span]:text-on-primary-container'
                    )}
                />
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                    <span className="text-title-md font-semibold text-on-surface">
                        {formatPrice(data.amount)} ت
                    </span>
                    <span className="text-label-md text-outline">
                        {data.creditLabel}
                    </span>
                </div>
                <Pill
                    text={status.text}
                    variant={status.variant}
                    className="shrink-0 border-0"
                    hasDot
                />
                <div className="flex shrink-0 items-center gap-1">
                    <IconButton
                        icon="edit400Linear"
                        variant="ghost"
                        iconClassName="size-5! text-outline"
                        className="size-8!"
                    />
                    <IconButton
                        icon="eye"
                        variant="ghost"
                        iconClassName="size-5! text-outline"
                        className="size-8!"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 p-4">
                {data.fields.map((field) => (
                    <InfoCardField
                        key={field.label}
                        label={field.label}
                        value={
                            /^\d+$/.test(field.value.replace(/\s/g, ''))
                                ? formatFaNumber(field.value)
                                : field.value
                        }
                    />
                ))}
            </div>
        </div>
    )
}

export default CreditDocumentCard
