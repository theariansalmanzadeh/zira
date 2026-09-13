export type {
    StepperStepStatus as StepStatus,
    StepperStatusStep as PreOrderStatusStep,
} from '@/src/shared/components/ui/StepperStatus'

export type OrderItemRowData = {
    id: string
    productName: string
    productCode: string
    brand?: string
    quantity?: string | number
    color?: string
    size?: string
    totalPrice?: string
}

export type ShipmentDetail = {
    id: string
    shipmentNumber: number
    totalShipments: number
    statusText: string
    trackingCode: string
    shippingType: string
    deliveryDate: string
    shippingCost: string
    shipmentAmount: string
    items: OrderItemRowData[]
}
