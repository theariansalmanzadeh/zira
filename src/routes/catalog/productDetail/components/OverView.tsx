'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useDeleteProduct } from '@/src/routes/catalog/hooks/catalog'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { randomColorGenerator } from '@/src/shared/libs/color'
import { cn } from '@shared/libs/utils'

const PRODUCT_LIST_PATH = '/admin/catalog?sub=list'

type OverViewProps = {
    productId?: string
    brand?: string
    title?: string
    category?: string
    sku?: string
    price?: string
    description?: string
    image?: string | null
    className?: string
}

const OverView = ({
    productId,
    brand = '—',
    title = '—',
    category = '—',
    sku = '—',
    price,
    description,
    image,
    className,
}: OverViewProps) => {
    const { push } = useRouter()
    const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct()
    const imageInitial = title.trim().charAt(0) || '—'
    const avatarColor = useMemo(() => randomColorGenerator(), [title])

    const handleDelete = () => {
        if (!productId) return

        deleteProduct(productId, {
            onSuccess: () => {
                toast.success('محصول با موفقیت حذف شد')
                push(PRODUCT_LIST_PATH)
            },
        })
    }

    return (
        <div
            className={cn(
                'flex flex-row items-start gap-5 rounded-card-lg border border-outline-variant bg-surface-container-lowest p-4',
                className
            )}
            dir="rtl"
        >
            <div
                className={cn(
                    'relative size-40 shrink-0 overflow-hidden rounded-card-lg sm:size-48',
                    !image && avatarColor.background
                )}
            >
                {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={image}
                        alt={title}
                        className="size-full object-cover"
                    />
                ) : (
                    <div className="flex size-full items-center justify-center">
                        <span
                            className={cn(
                                'text-display-md font-bold',
                                avatarColor.text
                            )}
                        >
                            {imageInitial}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2 text-right">
                <div className="flex items-start justify-between gap-3">
                    <span className="text-label-md text-outline">{brand}</span>
                    {productId ? (
                        <Button
                            type="button"
                            variant="error"
                            size="sm"
                            isLoading={isDeleting}
                            disabled={isDeleting}
                            onClick={handleDelete}
                        >
                            حذف محصول
                        </Button>
                    ) : null}
                </div>
                <h2 className="text-title-lg font-bold text-on-surface">
                    {title}
                </h2>
                <p className="text-label-md text-outline">
                    {category} • {sku}
                </p>
                {price ? (
                    <div className="mt-1 flex items-baseline gap-1.5">
                        <span className="text-title-lg font-bold text-primary">
                            {price}
                        </span>
                        <Icon label="currency" className="size-5 text-outline" />
                    </div>
                ) : null}
                {description ? (
                    <p className="mt-1 text-label-md leading-6 text-outline">
                        {description}
                    </p>
                ) : null}
            </div>
        </div>
    )
}

export default OverView
