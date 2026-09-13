'use client'

import { useSearchParams } from 'next/navigation'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from '../components/TableHeader'
import TableRow, { type CustomerListRowData } from '../components/TableRow'
import { TABLE_COLOUMN } from '../constants'
import CustomerGroups from './CustomerGroups'

const CUSTOMER_LIST_DUMMY: CustomerListRowData[] = [
    {
        id: 'CU-7362',
        name: 'آیدا میرزایی',
        level: 'gold',
        credit: 200000000,
        phone: '+98 912 673 4123',
        email: 'aida@gmail.com',
    },
    {
        id: 'CU-7363',
        name: 'سارا احمدی',
        level: 'silver',
        credit: 85000000,
        phone: '+98 935 120 8845',
        email: 'sara@gmail.com',
    },
    {
        id: 'CU-7364',
        name: 'رضا کریمی',
        level: 'bronze',
        credit: 42000000,
        phone: '+98 910 772 0098',
        email: 'reza@gmail.com',
    },
]

const CustomerList = () => {
    const searchParams = useSearchParams()
    const isGroups = (searchParams.get('cat') ?? 'customers') === 'groups'

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                value='customers'
                toggleButtonValue={ROUTE_CONFIGS.customers.TOGGLE_BUTTON_VALUE}
                hasHeaderActions
                TableColoumn={TABLE_COLOUMN}
                isCardLayout={isGroups}
            >
                {isGroups ? (
                    <CustomerGroups />
                ) : (
                    <>
                        <div className='rounded-card-lg bg-surface-container-high p-2'>
                            <Table className='border-collapse border-spacing-y-4'>
                                <TableHeader />
                                <TableBody>
                                    {CUSTOMER_LIST_DUMMY.map((customer) => (
                                        <TableRow key={customer.id} data={customer} />
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <TablePagination className='mt-2' totalAmount={100} />
                    </>
                )}
            </TableListLayout>
        </div>
    )
}

export default CustomerList
