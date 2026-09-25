'use client'

import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import Filters from './components/Filters'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import { PRODUCT_TURNOVER_DUMMY, TABLE_COLOUMN } from './constants'

const ProductTurnover = () => {
    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <Filters />
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                hasHeaderActions={false}
                hasSort={false}
                hasExpand={false}
            >
                <div className='flex flex-col gap-2 rounded-card-lg bg-surface-container-high p-2'>
                    <TableHeader />
                    {PRODUCT_TURNOVER_DUMMY.map((item) => (
                        <TableRow key={item.id} data={item} />
                    ))}
                </div>
            </TableListLayout>
        </div>
    )
}

export default ProductTurnover
