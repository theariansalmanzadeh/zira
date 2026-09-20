import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const StockReturnDetails = dynamic(
    () =>
        import(
            '@/src/routes/inventoryManagment/stockReturnDetails/StockReturnDetails'
        ),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function StockReturnDetailsPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <StockReturnDetails />
        </Suspense>
    )
}
