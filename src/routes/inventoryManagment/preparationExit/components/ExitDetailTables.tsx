'use client'

import { useSearchParams } from 'next/navigation'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import ItemList from '../../preparationExitDetails/components/ItemList'
import InvoiceDetails from './InvoiceDetails'

const DETAIL_TABLES = [
    { label: 'لیست اقلام', value: 'items' },
    { label: 'جزئیات فاکتور', value: 'invoice' },
]

const ExitDetailTables = () => {
    const searchParams = useSearchParams()
    const activeTable =
        searchParams.get('cat') === 'invoice' ? 'invoice' : 'items'

    return (
        <TableListLayout
            value={activeTable}
            toggleButtonValue={DETAIL_TABLES}
            hasSearch={false}
            hasSort={false}
            hasFilter={false}
            hasTableSettings={false}
            hasExpand={false}
        >
            {activeTable === 'invoice' ? <InvoiceDetails /> : <ItemList />}
        </TableListLayout>
    )
}

export default ExitDetailTables
