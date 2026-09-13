import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import React from 'react'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import { TABLE_COLOUMN } from './constants'

const PrePurchase = () => {
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
                <div className='flex flex-col gap-2 p-6 rounded-card-lg bg-surface-container-lowest'>
                    <span className='text-outline text-label-md'>کل پیش‌سفارش‌ها</span>
                    <span className='text-headline-lg font-medium text-on-surface'>100</span>
                </div>
                <div className='flex flex-col gap-2 p-6 rounded-card-lg bg-surface-container-lowest'>
                    <span className='text-outline text-label-md'>در انتظار شورا</span>
                    <span className='text-headline-lg font-medium text-on-surface'>100</span>
                </div>
                <div className='flex flex-col gap-2 p-6 rounded-card-lg bg-surface-container-lowest'>
                    <span className='text-outline text-label-md'>تاییدشده</span>
                    <span className='text-headline-lg font-medium text-on-surface'>100</span>
                </div>
                <div className='flex flex-col gap-2 p-6 rounded-card-lg bg-surface-container-lowest'>
                    <span className='text-outline text-label-md'>ردشده</span>
                    <span className='text-headline-lg font-medium text-on-surface'>100</span>
                </div>

            </div>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value='all'
                toggleButtonValue={ROUTE_CONFIGS.prePurchase.TOGGLE_BUTTON_VALUE}
            >
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            <TableRow data={{
                                referenceId: '1234567890',
                                date: '2026-06-14T00:00:00.000Z',
                                customerName: 'علی صفوی',
                                title: 'تایید سفارش',
                                subtitle: 'تایید سفارش',
                                status: 'approved',
                            }} />
                        </TableBody>
                    </Table>
                </div>
            </TableListLayout>
        </div>
    )
}

export default PrePurchase