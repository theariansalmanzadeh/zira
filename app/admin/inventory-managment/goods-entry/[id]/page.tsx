import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const InvoiceDetails = dynamic(
    () => import('@/src/routes/inventoryManagment/invoiceDetails/InvoiceDetails'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function InvoiceDetailsPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <InvoiceDetails />
        </Suspense>
    )
}
