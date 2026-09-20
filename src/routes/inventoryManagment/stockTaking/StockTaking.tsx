'use client'

import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import {
    STOCK_TAKING_DUMMY,
    TABLE_COLOUMN,
    type StockTakingItem,
} from './constants'

type StockTakingProps = {
    data?: StockTakingItem[]
}

const StockTaking = ({ data = STOCK_TAKING_DUMMY }: StockTakingProps) => {
    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                hasHeaderActions={false}
            >
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id} data={item} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TableListLayout>
        </div>
    )
}

export default StockTaking
