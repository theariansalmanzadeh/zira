'use client'

import Link from 'next/link'
import { Icon } from '@/src/shared/components/Icons/Icon'
import IconButton from '@shared/components/ui/IconButton'
import { Pill, PillVariants } from '@shared/components/ui/Pill'
import { cn } from '@shared/libs/utils'
import { VariantProps } from 'class-variance-authority'
import { formatFaNumber } from '@/src/shared/libs/formatter'

export type CustomerGroupCardProps = {
    id: string
    title: string
    subtitle: string
    status?: string
    statusVariant?: VariantProps<typeof PillVariants>['variant']
    customerCount: number
    discountPercent: number
    marketerPercent?: number
    userLevel?: string
    marketerName?: string
    chequeLevel?: string
    goldLevel?: string
    userStatus?: string
    onEdit?: () => void
    className?: string
}

const CustomerGroupCard = ({
    id,
    title,
    subtitle,
    status = 'فعال',
    statusVariant = 'success',
    customerCount,
    discountPercent,
    onEdit,
    className,
}: CustomerGroupCardProps) => {
    return (
        <div
            className={cn(
                'flex flex-col gap-2 rounded-card-md bg-surface-container-high p-2',
                className
            )}
            dir="rtl"
        >
            <div className="flex flex-col gap-6 rounded-card-md bg-surface-container-lowest p-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-2 text-right">
                        <h3 className="text-title-lg font-medium text-on-surface">
                            {title}
                        </h3>
                        <span className="text-label-md text-outline">
                            {subtitle}
                        </span>
                    </div>
                    <Pill
                        variant={statusVariant}
                        text={status}
                        className="shrink-0 border-0"
                    />
                </div>
                <hr className="border-0 border-t border-dashed border-outline-variant" />
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col items-center justify-center gap-1 rounded-card-md bg-surface-container-high py-4">
                        <span className="text-title-lg font-bold text-on-surface">
                            {formatFaNumber(customerCount)}
                        </span>
                        <span className="text-label-sm text-outline">
                            تعداد مشتری
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 rounded-card-md bg-primary-container py-4">
                        <span className="text-title-lg font-bold text-primary">
                            ٪{formatFaNumber(discountPercent)}
                        </span>
                        <span className="text-label-sm text-outline">
                            تخفیف فعال
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <IconButton
                    icon="edit400Linear"
                    iconClassName="size-6"
                    className="rounded-card-md bg-surface-container-lowest"
                    onClick={onEdit}
                />
                <Link
                    href={`/admin/customers/groupDetails/${id}`}
                    className="flex size-10 items-center justify-center rounded-card-md bg-surface-container-lowest"
                >
                    <Icon
                        label="chevronLeft400Linear"
                        className="size-6 text-on-surface-variant"
                    />
                </Link>
            </div>
        </div>
    )
}

export default CustomerGroupCard
