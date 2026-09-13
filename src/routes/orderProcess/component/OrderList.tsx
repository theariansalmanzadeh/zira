import OrderCard from './OrderCard'
import { type OrderCardData } from '../types'

const ORDER_CARDS_DUMMY: OrderCardData[] = [
    {
        id: 'order-item-1',
        brand: 'Lorenzo',
        title: 'ست توری کلاسیک',
        productCode: '7352-63',
        color: 'مشکی',
        size: 'XS',
        unitPrice: '- ',
        totalPrice: '- ',
        quantity: 120,
    },
]

type OrderListProps = {
    items?: OrderCardData[]
}

const OrderList = ({ items = ORDER_CARDS_DUMMY }: OrderListProps) => {
    return (
        <div className="flex flex-col gap-3">
            {items.map((item) => (
                <OrderCard key={item.id} data={item} />
            ))}
        </div>
    )
}

export default OrderList
export { ORDER_CARDS_DUMMY }
