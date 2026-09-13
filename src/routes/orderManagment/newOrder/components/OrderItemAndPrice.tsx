'use client'

import { cn } from '@shared/libs/utils'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import { useCreateOrderContext } from '../provider/CreateOrderProvider'

type SummaryCard = {
    label: string
    value: string
    className?: string
    labelClassName?: string
    valueClassName?: string
}

const OrderItemAndPrice = () => {
    const { cartCount, cartTotal, finalTotal } = useCreateOrderContext()
    const discount = 0
    const tax = finalTotal - cartTotal + discount

    const cards: SummaryCard[] = [
        {
            label: 'جمع اقلام',
            value: `${formatFaNumber(cartCount)} قلم`,
        },
        {
            label: 'تخفیف کل',
            value: formatPrice(discount),
            valueClassName: 'text-warning',
        },
        {
            label: 'مالیات',
            value: formatPrice(tax),
        },
        {
            label: 'مبلغ کل (تومان)',
            value: formatPrice(finalTotal),
            className: 'bg-primary-container',
            labelClassName: 'text-primary',
            valueClassName: 'text-primary',
        },
    ]

    return (
        <div className='grid grid-cols-4 gap-3' dir='rtl'>
            {cards.map((card) => (
                <div
                    key={card.label}
                    className={cn(
                        'flex flex-col gap-2 rounded-card-md bg-surface-container-high p-4',
                        card.className
                    )}
                >
                    <span className={cn('text-label-sm text-outline', card.labelClassName)}>
                        {card.label}
                    </span>
                    <span
                        className={cn(
                            'text-title-lg font-bold text-on-surface',
                            card.valueClassName
                        )}
                    >
                        {card.value}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default OrderItemAndPrice
