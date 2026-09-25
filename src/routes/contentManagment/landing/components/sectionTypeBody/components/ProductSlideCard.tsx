'use client'

import IconButton from '@/src/shared/components/ui/IconButton'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import type { ProductSlideItem } from '../constants'
import { Icon } from '@/src/shared/components/Icons/Icon'

type ProductSlideCardProps = {
    data: ProductSlideItem
    index: number
    onDelete?: () => void
    className?: string
}

const ProductSlideCard = ({
    data,
    index,
    onDelete,
    className,
}: ProductSlideCardProps) => {
    const hasDiscount =
        typeof data.discountPercent === 'number' &&
        typeof data.originalPrice === 'number'

    const handleDelete = () => {
        onDelete?.()
    }

    return (
        <div
            className={cn(
                'flex items-center gap-3 rounded-card-lg border border-outline bg-surface-container-lowest px-3.5 py-3',
                className
            )}
            dir="rtl"
        >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-card-sm bg-primary/12 text-label-md font-bold text-primary">
                {formatFaNumber(index)}
            </span>

            <div className="size-12 shrink-0 rounded-card-md bg-on-surface-high" />

            <div className="min-w-0 flex-1">
                <div className="truncate text-label-lg font-bold text-on-surface">
                    {data.title}
                </div>
                <p className="mt-0.5 truncate text-label-md text-outline">
                    {data.category}
                </p>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                    {hasDiscount ? (
                        <span className="rounded-card-sm bg-primary/12 px-1.5 py-0.5 text-label-sm font-semibold text-primary">
                            {formatFaNumber(data.discountPercent!)}٪
                        </span>
                    ) : null}
                    <div className='flex items-center gap-1'>
                        <span
                            className={cn(
                                'text-label-lg font-bold',
                                hasDiscount ? 'text-success' : 'text-on-surface'
                            )}
                        >
                            {formatFaNumber(data.price)}
                        </span>
                        <Icon label='currency' className='size-4.5! text-on-surface-variant' />
                    </div>
                </div>
                {hasDiscount ? (
                    <div className='flex items-center gap-1'>

                        <span className="text-label-sm text-outline line-through">
                            {formatFaNumber(data.originalPrice!)}
                        </span>
                        <Icon label='currency' className='size-4.5! text-on-surface-variant' />
                    </div>
                ) : null}
            </div>

            <IconButton
                icon="delete400Linear"
                variant="ghost"
                className="size-8! shrink-0"
                iconClassName="size-4.5! text-outline"
                onClick={handleDelete}
            />
        </div>
    )
}

export default ProductSlideCard
