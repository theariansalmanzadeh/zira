import CustomerDashboard from '@/src/routes/customers/dashboard/CustomerDashboard'
import CustomerList from '@/src/routes/customers/customerList/CustomerList'
import RequestList from '@/src/routes/customers/requestList/RequestList'

async function CustomersPage({
    searchParams,
}: {
    searchParams: Promise<{ sub?: string }>
}) {
    const { sub } = await searchParams

    if (sub === 'list') {
        return <CustomerList />
    }

    if (sub === 'requests') {
        return <RequestList />
    }

    return <CustomerDashboard />
}

export default CustomersPage
