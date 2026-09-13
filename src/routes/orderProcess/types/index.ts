export type DeliveryMethodOption = {
    id: string
    name: string
    description: string
    duration: string
    price: string
}

export type DeliveryDateOption = {
    id: string
    dayLabel: string
    dateLabel: string
}

export type DeliveryTimeOption = {
    id: string
    label: string
}

export type DeliverySelectionState = {
    methodId: string | null
    dateId: string | null
    timeId: string | null
    showError: boolean
}

export type DeliverySelectionAction =
    | { type: 'SET_METHOD'; payload: string }
    | { type: 'SET_DATE'; payload: string }
    | { type: 'SET_TIME'; payload: string }
    | { type: 'SHOW_ERROR' }
    | { type: 'CLEAR_ERROR' }
    | { type: 'RESET' }


export type OrderCardData = {
    id: string
    brand: string
    title: string
    productCode: string
    imageSrc?: string
    color: string
    size: string
    unitPrice: string
    totalPrice: string
    quantity: number
}

export type OrderCardProps = {
    data: OrderCardData
    onQuantityChange?: (quantity: number) => void
    onRemove?: () => void
    className?: string
}

export type InfoItemProps = {
    label?: string
    value: string
    hasCurrency?: boolean
}