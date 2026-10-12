import Factor from '@/src/routes/orderManagment/factor/Factor'
import OrderList from '@/src/routes/orderManagment/orderList/OrderList'
import OrderMangment from '@/src/routes/orderManagment/OrderMangment'
import PreOrder from '@/src/routes/orderManagment/preOrder/PreOrder'

const page = async ({ searchParams }: { searchParams: Promise<{ sub: string }> }) => {
    const { sub } = await searchParams
    const section = sub || 'dashboard'
    if (section === 'dashboard') {
        return <OrderMangment />
    }
    if (section === 'order-list') {
        return <OrderList />
    }
    if (section === 'factor') {
        return <Factor />
    }
    if (section === 'requests') {
        return <PreOrder />
    }
    return <OrderMangment />
}

export default page
