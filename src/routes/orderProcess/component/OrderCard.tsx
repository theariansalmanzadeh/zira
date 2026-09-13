'use client'

import Image from 'next/image'
import IconButton from '@/src/shared/components/ui/IconButton'
import { cn } from '@shared/libs/utils'
import { useState } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { InfoItemProps, OrderCardProps } from '../types'

const InfoItem = ({ label, value, hasCurrency }: InfoItemProps) => {
    return (
        <div className="flex min-w-[72px] flex-col gap-1">
            {label && <span className="text-label-sm text-outline">{label}</span>}
            {hasCurrency && <Icon label="currency" className="size-6! text-on-surface" />}
            <span className="text-label-lg text-on-surface">{value}</span>
        </div>
    )
}

const OrderCard = ({
    data,
    onQuantityChange,
    onRemove,
    className,
}: OrderCardProps) => {
    const [quantity, setQuantity] = useState(data.quantity)

    const handleQuantityChange = (nextQuantity: number) => {
        if (nextQuantity < 1) return
        setQuantity(nextQuantity)
        onQuantityChange?.(nextQuantity)
    }

    return (
        <div
            className={cn(
                'flex flex-col gap-4 rounded-card-lg bg-surface-container-lowest p-6',
                className
            )}
            dir="rtl"
        >
            <div className="flex flex-row items-center justify-between gap-4">
                <div className="flex flex-row items-center gap-4">
                    <div className="size-20 shrink-0 overflow-hidden rounded-card-md bg-surface-container-high">
                        {data.imageSrc ? (
                            <Image
                                src={data.imageSrc}
                                alt={data.title}
                                width={80}
                                height={80}
                                className="size-full object-cover"
                            />
                        ) : (
                            <div className="size-full bg-surface-container-highest" />
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-label-sm text-outline">
                            {data.brand}
                        </span>
                        <span className="text-title-md font-medium text-on-surface">
                            {data.title}
                        </span>
                        <span className="text-label-sm text-outline">
                            {data.productCode}
                        </span>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-8">
                    <InfoItem label="رنگ" value={data.color} />
                    <InfoItem label="سایز" value={data.size} />
                </div>
            </div>

            <div className="border-t border-dashed border-outline-variant" />

            <div className="flex flex-row items-center justify-between gap-4">
                <div className="flex min-w-[72px] flex-col gap-3">
                    <span className="text-label-sm text-outline">قیمت واحد</span>
                    <div className="flex flex-row items-center gap-1">
                        <span className="text-label-lg text-on-surface">{data.unitPrice}</span>
                        <Icon label="currency" className="size-6! text-on-surface" />
                    </div>
                </div>
                <div className="flex min-w-[72px] flex-col gap-3">
                    <span className="text-label-sm text-outline">مجموع</span>
                    <div className="flex flex-row items-center gap-1">
                        <span className="text-label-lg text-on-surface">{data.totalPrice}</span>
                        <Icon label="currency" className="size-6! text-on-surface" />
                    </div>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <div className="min-w-40 flex flex-row items-center justify-between gap-2 rounded-container-md bg-surface-container-high p-1">
                        <IconButton
                            icon="addSm400Linear"
                            variant="ghost"
                            className="size-10! rounded-button-md! bg-surface-container-lowest"
                            iconClassName="size-4!"
                            onClick={() => handleQuantityChange(quantity + 1)}
                        />
                        <span className="min-w-8 text-center text-label-lg text-on-surface">
                            {quantity}
                        </span>
                        <IconButton
                            icon="removeSm400Linear"
                            variant="ghost"
                            className="size-10! rounded-button-md! bg-surface-container-lowest"
                            iconClassName="size-4!"
                            onClick={() => handleQuantityChange(quantity - 1)}
                        />
                    </div>

                    <IconButton
                        icon="delete400Linear"
                        variant="outline"
                        className="size-10! rounded-button-md!"
                        iconClassName="size-5!"
                        onClick={onRemove}
                    />
                </div>
            </div>
        </div>
    )
}

export default OrderCard
