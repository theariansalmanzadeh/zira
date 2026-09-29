'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { cn } from '@shared/libs/utils'

type OverViewProps = {
    brand?: string
    title?: string
    category?: string
    sku?: string
    price?: string
    description?: string
    image?: string
    imageInitial?: string
    className?: string
}

const OverView = ({
    brand = 'لمیس',
    title = 'سوتین بدون فنر مدل لوسی',
    category = 'لباس زیر زنانه',
    sku = 'ZM-1042',
    price = '۴۸۵,۰۰۰',
    description = 'پارچه نخی با دوخت طبی و فاقد حساسیت، مناسب استفاده روزمره در چهار فصل.',
    image,
    imageInitial = 'س',
    className,
}: OverViewProps) => {
    return (
        <div
            className={cn(
                'flex flex-row items-start gap-5 rounded-card-lg border border-outline-variant bg-surface-container-lowest p-4',
                className
            )}
            dir="rtl"
        >
            <div className="relative size-40 shrink-0 overflow-hidden rounded-card-lg bg-primary/70 sm:size-48">
                {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={image}
                        alt={title}
                        className="size-full object-cover"
                    />
                ) : (
                    <div className="flex size-full items-center justify-center">
                        <span className="text-display-md font-bold text-on-primary">
                            {imageInitial}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2 text-right">
                <span className="text-label-md text-outline">{brand}</span>
                <h2 className="text-title-lg font-bold text-on-surface">
                    {title}
                </h2>
                <p className="text-label-md text-outline">
                    {category} • {sku}
                </p>
                <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-title-lg font-bold text-primary">
                        {price}
                    </span>
                    <Icon label="currency" className="size-5 text-outline" />
                </div>
                <p className="mt-1 text-label-md leading-6 text-outline">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default OverView
