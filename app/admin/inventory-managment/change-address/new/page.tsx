import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const ChangeAddressForm = dynamic(
    () =>
        import(
            '@/src/routes/inventoryManagment/changeAddressForm/ChangeAddressForm'
        ),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function NewChangeAddressPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <ChangeAddressForm />
        </Suspense>
    )
}
