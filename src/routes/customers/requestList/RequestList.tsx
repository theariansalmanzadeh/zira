'use client'

import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from '../components/TableHeader'
import TableRow, { type CustomerRequestRowData } from './components/TableRow'
import { REQUEST_TABLE_COLOUMN } from '../constants'

const REQUEST_LIST_DUMMY: CustomerRequestRowData[] = [
    {
        id: 'RQT-0191',
        name: 'آرام محمدی',
        level: 'silver',
        nationalId: '0581234567',
        licenseNumber: '0228452',
        status: 'rejected',
    },
    {
        id: 'RQT-0190',
        name: 'آیدا میرزایی',
        level: 'gold',
        nationalId: '0498765432',
        licenseNumber: '0183341',
        status: 'approved',
    },
    {
        id: 'RQT-0189',
        name: 'رضا کریمی',
        level: 'bronze',
        nationalId: '0123456789',
        licenseNumber: '0259018',
        status: 'pending',
    },
]

const RequestList = () => {
    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                hasHeaderActions={false}
                TableColoumn={REQUEST_TABLE_COLOUMN}
            >
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            {REQUEST_LIST_DUMMY.map((request) => (
                                <TableRow key={request.id} data={request} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination className='mt-2' totalAmount={100} />
            </TableListLayout>
        </div>
    )
}

export default RequestList
