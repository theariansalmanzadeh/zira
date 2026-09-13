'use client'

import IconButton from '@/src/shared/components/ui/IconButton'
import { useModalStore } from '@/src/shared/store/modal-store'
import { ModalTypes } from '@/src/shared/components/modals/types'
import type {
    AddBannerModalData,
    AddBannerPayload,
} from '@/src/shared/components/modals/components/addBanner'
import { cn } from '@shared/libs/utils'
import type { BannerSlideItem } from '../constants'

type BannerSlideCardProps = {
    data: BannerSlideItem
    onEdit?: (payload: AddBannerPayload) => void
    onDelete?: () => void
    className?: string
}

const parseSubtitle = (subtitle: string) => {
    const [orderLabel = '', ctaPart = ''] = subtitle.split(' · CTA: ')
    return {
        orderLabel: orderLabel.trim(),
        ctaLabel: ctaPart.trim() === '—' ? '' : ctaPart.trim(),
    }
}

const BannerSlideCard = ({
    data,
    onEdit,
    onDelete,
    className,
}: BannerSlideCardProps) => {
    const { openModal } = useModalStore()

    const handleEdit = () => {
        const { orderLabel, ctaLabel } = parseSubtitle(data.subtitle)

        openModal(ModalTypes.ADD_BANNER, {
            isEditing: true,
            defaultValues: {
                title: data.title,
                status: data.status,
                orderLabel,
                ctaLabel,
                link: '',
                fileName: 'banner.jpg',
                fileSize: '',
            },
            onSubmit: (payload) => {
                onEdit?.(payload)
            },
        } satisfies AddBannerModalData)
    }

    const handleDelete = () => {
        onDelete?.()
    }

    return (
        <div
            className={cn(
                'flex items-center gap-3 rounded-card-lg border border-outline-variant bg-surface-container-lowest px-3.5 py-3',
                className
            )}
            dir="rtl"
        >
            <div className="h-14 w-20 shrink-0 rounded-card-md bg-surface-container-high" />

            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-label-lg font-bold text-on-surface">
                        {data.title}
                    </span>
                </div>
                <p className="mt-1 truncate text-label-md text-outline">
                    {data.subtitle}
                </p>
            </div>

            <div className="flex shrink-0 items-center gap-0.5">
                <IconButton
                    icon="editSquare400Linear"
                    variant="ghost"
                    className="size-8!"
                    iconClassName="size-4.5! text-outline"
                    onClick={handleEdit}
                />
                <IconButton
                    icon="closeSm400Linear"
                    variant="ghost"
                    className="size-8!"
                    iconClassName="size-4.5! text-outline"
                    onClick={handleDelete}
                />
            </div>
        </div>
    )
}

export default BannerSlideCard
