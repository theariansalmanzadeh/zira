'use client'

import IconButton from '@/src/shared/components/ui/IconButton'
import { useModalStore } from '@/src/shared/store/modal-store'
import { ModalTypes } from '@/src/shared/components/modals/types'
import type {
    AddBrandModalData,
    AddBrandPayload,
} from '@/src/shared/components/modals/components/addBrand'
import { cn } from '@shared/libs/utils'
import type { BrandSlideItem } from '../constants'

type BrandSlideCardProps = {
    data: BrandSlideItem
    onEdit?: (payload: AddBrandPayload) => void
    onDelete?: () => void
    className?: string
}

const BrandSlideCard = ({
    data,
    onEdit,
    onDelete,
    className,
}: BrandSlideCardProps) => {
    const { openModal } = useModalStore()

    const handleEdit = () => {
        openModal(ModalTypes.ADD_BRAND, {
            isEditing: true,
            defaultValues: {
                title: data.title,
                slogan: data.subtitle,
                description: data.description ?? '',
                status: data.status,
                fileName: data.fileName ?? '',
                fileSize: '',
            },
            onSubmit: (payload) => {
                onEdit?.(payload)
            },
        } satisfies AddBrandModalData)
    }

    return (
        <div
            className={cn(
                'flex items-center gap-3 rounded-card-lg border border-outline-variant bg-surface-container-lowest px-3.5 py-3',
                className
            )}
            dir="rtl"
        >
            <div
                className={cn(
                    'size-12 shrink-0 rounded-card-md',
                    data.thumbnailClassName
                )}
            />

            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-label-lg font-semibold text-on-surface">
                        {data.title}
                    </span>
                </div>
                <p className="mt-1 truncate text-label-md text-outline">
                    {data.subtitle}
                </p>
            </div>

            <div className="flex shrink-0 items-center gap-0.5">
                {data.isPrimary ? null : (
                    <IconButton
                        icon="delete400Linear"
                        variant="ghost"
                        className="size-8!"
                        iconClassName="size-4.5! text-outline"
                        onClick={onDelete}
                    />
                )}
                <IconButton
                    icon="editSquare400Linear"
                    variant="ghost"
                    className="size-8!"
                    iconClassName="size-4.5! text-outline"
                    onClick={handleEdit}
                />
            </div>
        </div>
    )
}

export default BrandSlideCard
