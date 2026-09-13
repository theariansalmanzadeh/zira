import { Pill } from '@/src/shared/components/ui/Pill'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { cn } from '@shared/libs/utils'
import TableProvider from '@/src/shared/context/TableProvider'
import TableHeader from './orderItemsDetail/TableHeader'
import TableRow, { type OrderItemRowData } from './orderItemsDetail/TableRow'
import { TABLE_COLOUMN } from '../constants'

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

const ORDER_SHIPMENTS: ShipmentDetail[] = [
    {
        id: 'shipment-1',
        shipmentNumber: 1,
        totalShipments: 2,
        statusText: 'تحویل شده به مشتری',
        trackingCode: 'PO-982032',
        shippingType: 'فوری - تیپاکس',
        deliveryDate: 'چهارشنبه - 1405/10/17',
        shippingCost: '- تومان',
        shipmentAmount: '- تومان',
        items: [
            {
                id: 'item-1',
                productName: 'عنوان کالا',
                productCode: '7352-63',
            },
            {
                id: 'item-2',
                productName: 'عنوان کالا',
                productCode: '7352-63',
            },
        ],
    },
    {
        id: 'shipment-2',
        shipmentNumber: 2,
        totalShipments: 2,
        statusText: 'تحویل شده به مشتری',
        trackingCode: 'PO-982032',
        shippingType: 'فوری - تیپاکس',
        deliveryDate: 'چهارشنبه - 1405/10/17',
        shippingCost: '- تومان',
        shipmentAmount: '- تومان',
        items: [
            {
                id: 'item-3',
                productName: 'عنوان کالا',
                productCode: '7352-63',
            },
        ],
    },
]

type MetadataItemProps = {
    label: string
    value: string
}

const MetadataItem = ({ label, value }: MetadataItemProps) => {
    return (
        <div className='flex flex-col gap-1 min-w-0'>
            <span className='text-label-sm text-outline'>{label}</span>
            <span className='text-label-lg text-on-surface'>{value}</span>
        </div>
    )
}

type ShipmentBlockProps = {
    shipment: ShipmentDetail
    showDivider?: boolean
}

const ShipmentBlock = ({ shipment, showDivider }: ShipmentBlockProps) => {
    return (
        <div className='flex flex-col gap-3'>
            {showDivider && <div className='border-t border-outline-variant' />}

            <div className='flex flex-row items-center justify-between gap-3'>
                <Pill
                    className='gap-1 border-0'
                    variant='success'
                    text={shipment.statusText}
                    icon='checkLg300Linear'
                />
                <span className='text-title-md font-medium text-on-surface'>
                    مرسوله {shipment.shipmentNumber} از {shipment.totalShipments}
                </span>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-5 gap-3'>
                <MetadataItem label='کد پیگیری' value={shipment.trackingCode} />
                <MetadataItem label='نوع ارسال' value={shipment.shippingType} />
                <MetadataItem label='تاریخ تحویل مرسوله' value={shipment.deliveryDate} />
                <MetadataItem label='هزینه ارسال' value={shipment.shippingCost} />
                <MetadataItem label='مبلغ مرسوله' value={shipment.shipmentAmount} />
            </div>

            <div className='rounded-card-lg bg-surface-container-high p-2'>
                <Table className='border-collapse border-spacing-y-2'>
                    <TableHeader />
                    <TableBody>
                        {shipment.items.map((item) => (
                            <TableRow key={item.id} data={item} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

const OrderItemsDetail = ({
    shipments = ORDER_SHIPMENTS,
    className,
}: {
    shipments?: ShipmentDetail[]
    className?: string
}) => {
    return (
        <TableProvider TableColoumn={TABLE_COLOUMN}>
            <div className={cn('flex flex-col gap-3', className)} dir='rtl'>
            <div className='rounded-card-lg bg-surface-container-lowest p-6 flex flex-col gap-3'>
                <span className='text-title-md font-bold text-on-surface'>اقلام سفارش</span>

                <div className='border-t border-dashed border-outline-variant' />

                <div className='flex flex-col justify-between gap-6'>
                    {shipments.map((shipment, index) => (
                        <ShipmentBlock
                            key={shipment.id}
                            shipment={shipment}
                            showDivider={index > 0}
                        />
                    ))}
                    <div className='w-full h-px border-outline-variant ' />

                </div>
            </div>
        </div>
        </TableProvider>
    )
}

export default OrderItemsDetail
