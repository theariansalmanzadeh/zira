import { PreOrderStatusStep } from '../../orderManagment/preOrderDatails/types'
import type { UserOrderRowData } from '../userOrderList/components/TableRow'

export const ORDER_STATUS_STEPS: PreOrderStatusStep[] = [
    { id: 'registration', label: 'ثبت پیش‌سفارش', status: 'complete' },
    { id: 'accountant-approval', label: 'تایید حسابدار', status: 'complete' },
    { id: 'deposit-payment', label: 'پرداخت بیعانه', status: 'complete' },
    { id: 'full-settlement', label: 'تسویه کامل', status: 'pending' },
    { id: 'preparation', label: 'آماده‌سازی و بسته‌بندی', status: 'not_reached' },
    { id: 'shipment', label: 'ارسال مرسوله', status: 'not_reached' },
    { id: 'customer-receipt', label: 'دریافت توسط مشتری', status: 'not_reached' },
]


export const USER_ORDERS_DUMMY: UserOrderRowData[] = [
    {
        id: 'PO-982032',
        registeredAt: '2025-12-09T14:53:00.000Z',
        itemsCount: 34,
        totalAmount: '7,980,000',
        settlementType: 'cash',
        status: 'preparing',
        filterTab: 'pending',
    },
    {
        id: 'PO-982031',
        registeredAt: '2025-12-09T14:53:00.000Z',
        itemsCount: 43,
        totalAmount: '7,980,000',
        settlementType: 'credit',
        status: 'completed',
        filterTab: 'completed',
    },
    {
        id: 'PO-982030',
        registeredAt: '2025-12-09T14:53:00.000Z',
        itemsCount: 124,
        totalAmount: '7,980,000',
        settlementType: 'cheque',
        status: 'readyToShip',
        filterTab: 'pending',
    },
    {
        id: 'PO-982029',
        registeredAt: '2025-12-09T14:53:00.000Z',
        itemsCount: 34,
        totalAmount: '7,980,000',
        settlementType: 'cash',
        status: 'awaitingPrep',
        filterTab: 'pending',
    },
    {
        id: 'PO-982028',
        registeredAt: '2025-12-09T14:53:00.000Z',
        itemsCount: 43,
        totalAmount: '7,980,000',
        settlementType: 'credit',
        status: 'preparing',
        filterTab: 'pending',
    },
    {
        id: 'PO-982027',
        registeredAt: '2025-12-09T14:53:00.000Z',
        itemsCount: 124,
        totalAmount: '7,980,000',
        settlementType: 'cheque',
        status: 'completed',
        filterTab: 'completed',
    },
    {
        id: 'PO-982026',
        registeredAt: '2025-12-09T14:53:00.000Z',
        itemsCount: 34,
        totalAmount: '7,980,000',
        settlementType: 'cash',
        status: 'cancelled',
        filterTab: 'cancelled',
    },
    {
        id: 'PO-982025',
        registeredAt: '2025-12-09T14:53:00.000Z',
        itemsCount: 43,
        totalAmount: '7,980,000',
        settlementType: 'credit',
        status: 'returned',
        filterTab: 'returned',
    },
]

export const filterUserOrders = (
    orders: UserOrderRowData[],
    filter: string
) => {
    if (filter === 'all') return orders
    return orders.filter((order) => order.filterTab === filter)
}
