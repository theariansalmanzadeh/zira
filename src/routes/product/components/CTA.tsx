'use client'

import { useState } from 'react'
import { Button } from '@/src/shared/components/ui/button'
import { Badge } from '@/src/shared/components/ui/Badge'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { useModalStore } from '@/src/shared/store/modal-store'
import { ModalTypes } from '@/src/shared/components/modals/types'
import QuantitySelect from './QuantitySelect'
import CustomPackTable from './CustomPackTable'
import { useProduct } from '../context/Provider'

interface CTAProps {
    discount: number
    price: number
    quantity: number
}

const CTA = ({ discount, price, quantity: availableQuantity }: CTAProps) => {
    const { isCustomPack, storedSizes, storedColors } = useProduct()
    const [quantity, setQuantity] = useState(0)
    const isInCart = quantity > 0
    const outOfStock = availableQuantity <= 0
    const openModal = useModalStore((state) => state.openModal)
    const currentPrice = discount ? price - (price * +discount) / 100 : price

    const handlePrimaryClick = () => {
        if (outOfStock) {
            openModal(ModalTypes.NOTIF_AVAILABLE_PRODUCT)
            return
        }

        setQuantity(1)
    }

    const handleIncrement = () => {
        setQuantity((prev) => prev + 1)
    }

    const handleRemove = () => {
        setQuantity(0)
    }

    if (isCustomPack) {
        return <CustomPackTable sizes={storedSizes} colors={storedColors} />
    }

    return (
        <div className="sticky bottom-0 z-10 flex flex-row-reverse items-center justify-between rounded-card-lg bg-surface-container-high px-lg py-sm">
            {isInCart ? (
                <QuantitySelect
                    quantity={quantity}
                    onIncrement={handleIncrement}
                    onRemove={handleRemove}
                />
            ) : (
                <Button
                    variant="primary"
                    size="lg"
                    className="self-stretch rounded-2xl!"
                    onClick={handlePrimaryClick}
                >
                    افزودن به سبد
                </Button>
            )}
            <div className="flex flex-col items-end justify-center gap-1">
                {discount > 0 && (
                    <div className="flex flex-row items-center justify-between gap-lg">
                        <Badge variant="warning">{discount}%</Badge>
                        <div className="relative flex flex-row items-center justify-between gap-1">
                            <span className="block text-label-md font-bold text-outline">
                                {formatFaNumber(price)}
                            </span>
                            <div className="absolute top-1/2 left-0 h-px w-full -translate-y-full bg-outline" />
                            <Icon label="currency" />
                        </div>
                    </div>
                )}
                <div className="flex w-full flex-row items-start justify-end">
                    <div className="flex flex-row items-center justify-between gap-1">
                        <span className="text-label-lg font-bold text-on-surface">
                            {formatFaNumber(currentPrice)}
                        </span>
                        <Icon label="currency" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CTA
