'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import type {
    CooperationLevel,
    CustomerProfileListItem,
} from '@/src/api/types/admin/customers'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from '../components/TableHeader'
import TableRow, {
    type CustomerLevel,
    type CustomerListRowData,
} from '../components/TableRow'
import { TABLE_COLOUMN } from '../constants'
import { useListCustomerProfiles } from '../hooks/customers'
import CustomerGroups from './CustomerGroups'

const mapLevel = (level: string): CustomerLevel => {
    const normalized = level.toUpperCase() as CooperationLevel | string
    if (normalized === 'GOLD') return 'gold'
    if (normalized === 'SILVER') return 'silver'
    return 'bronze'
}

const mapProfileToRow = (
    profile: CustomerProfileListItem
): CustomerListRowData => ({
    id: profile.id,
    code: profile.code,
    name: profile.full_name || profile.store_name || '—',
    level: mapLevel(profile.cooperation_level),
    credit: 0,
    phone: profile.mobile || '—',
    email: '—',
})

const CustomerList = () => {
    const searchParams = useSearchParams()
    const isGroups = (searchParams.get('cat') ?? 'customers') === 'groups'
    const { data, isPending, isError } = useListCustomerProfiles()

    const customers = useMemo(
        () => (data?.results ?? []).map(mapProfileToRow),
        [data]
    )

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
                            {isPending ? (
                                <TableLoadingSkeleton isPending rows={5} />
                            ) : isError ? (
                                <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                                    دریافت لیست مشتریان با خطا مواجه شد.
                                </div>
                            ) : customers.length === 0 ? (
                                <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                                    مشتری‌ای یافت نشد.
                                </div>
                            ) : (
                                <Table className='border-collapse border-spacing-y-4'>
                                    <TableHeader />
                                    <TableBody>
                                        {customers.map((customer) => (
                                            <TableRow
                                                key={customer.id}
                                                data={customer}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </div>
                        <TablePagination
                            className='mt-2'
                            totalAmount={data?.total ?? 0}
                        />
                    </>
                )}
            </TableListLayout>
        </div>
    )
}

export default CustomerList
