import { Icon } from '@shared/components/Icons/Icon'
import IconButton from '@shared/components/ui/IconButton'
import { Pill } from '@shared/components/ui/Pill'
import { cn } from '@shared/libs/utils'
import Link from 'next/link'

export type InventoryCardStatus = 'active' | 'inactive'

export type InventoryCardData = {
    id: string
    title: string
    code: string
    status: InventoryCardStatus
    managerName: string
    stockCount: string
    capacity: string
    href?: string
}

const STATUS_CONFIG: Record<
    InventoryCardStatus,
    { text: string; variant: 'success' | 'tonal' }
> = {
    active: { text: 'فعال', variant: 'success' },
    inactive: { text: 'غیرفعال', variant: 'tonal' },
}

type InventoryCardProps = {
    data: InventoryCardData
    onEdit?: () => void
    className?: string
}

const InventoryCard = ({ data, onEdit, className }: InventoryCardProps) => {
    const statusConfig = STATUS_CONFIG[data.status]

    return (
        <div
            className={cn(
                'flex flex-col gap-2 rounded-card-md bg-surface-container-high p-2',
                className
            )}
            dir="rtl"
        >
            <div className="flex flex-col gap-6 rounded-card-md bg-surface-container-lowest p-6">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1 text-right">
                        <h3 className="text-title-lg font-medium text-on-surface">
                            {data.title}
                        </h3>
                        <span className="text-label-md text-outline">
                            {data.code}
                        </span>
                    </div>
                    <Pill
                        variant={statusConfig.variant}
                        text={statusConfig.text}
                        className="shrink-0 border-0"
                    />
                </div>

                <hr className="border-0 border-t border-dashed border-outline-variant" />

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1 text-right">
                        <span className="text-label-md text-outline">
                            مسئول انبار
                        </span>
                        <div className="flex flex-row items-center gap-2">
                            <div className="size-8 shrink-0 rounded-full bg-surface-container-highest" />
                            <span className="text-label-md text-on-surface underline">
                                {data.managerName}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1 text-right">
                            <span className="text-label-md text-outline">
                                موجودی (قلم)
                            </span>
                            <span className="text-label-lg text-on-surface">
                                {data.stockCount}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1 text-right">
                            <span className="text-label-md text-outline">
                                ظرفیت
                            </span>
                            <span className="text-label-lg text-on-surface">
                                {data.capacity}
                            </span>
                        </div>
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
                    href={
                        data.href ||
                        `/admin/inventory-managment/details/${data.id}`
                    }
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

export default InventoryCard
