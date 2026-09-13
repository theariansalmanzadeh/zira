import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table'
import { Icon } from '../Icons/Icon'
import IconButton from '../ui/IconButton'
import TablePagination from './components/TablePagination'
import { formatFaDateTime } from '@/src/shared/libs/formatter'

const DEMO_REGISTERED_AT = '2025-12-09T14:53:00.000Z'

const AdminTable = () => {
    return (
        <div>
            <div className='bg-surface-container-high rounded-card-lg p-2'>
                <Table className=''>
                    <TableHeader className='rounded-xl'>
                        <TableRow>
                            <TableHead>شناسه سفارش</TableHead>
                            <TableHead>زمان</TableHead>
                            <TableHead>جمع کل</TableHead>
                            <TableHead>روش پرداخت</TableHead>
                            <TableHead>وضعیت</TableHead>
                            <TableHead></TableHead>
                            <TableHead></TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className=''>
                        <TableRow>
                            {/* {rowItemsTypes.map(item => <TableCell><span>-</span><Icon label='currency' /></TableCell>)} */}
                            <TableCell className=''>PO-982032</TableCell>
                            <TableCell>{formatFaDateTime(DEMO_REGISTERED_AT)}</TableCell>
                            <TableCell className=''>
                                <div className="flex items-center gap-2">
                                    <span>-</span>
                                    <Icon label="currency" />
                                </div>
                            </TableCell>
                            <TableCell>اعتباری</TableCell>
                            <TableCell>اعتباری</TableCell>
                            <TableCell className='w-[1%] whitespace-nowrap'><IconButton icon='more' iconClassName='rotate-90' /></TableCell>
                            <TableCell className='w-[1%] whitespace-nowrap'><IconButton icon='receipt' /></TableCell>
                            <TableCell className='w-[1%] whitespace-nowrap'><IconButton icon='chevron' /></TableCell>
                        </TableRow>
                        <TableRow>
                            {/* {rowItemsTypes.map(item => <TableCell><span>-</span><Icon label='currency' /></TableCell>)} */}
                            <TableCell className=''>PO-982032</TableCell>
                            <TableCell>{formatFaDateTime(DEMO_REGISTERED_AT)}</TableCell>
                            <TableCell className=''>
                                <div className="flex items-center gap-2">
                                    <span>-</span>
                                    <Icon label="currency" />
                                </div>
                            </TableCell>
                            <TableCell>اعتباری</TableCell>
                            <TableCell>اعتباری</TableCell>
                            <TableCell className='w-[1%] whitespace-nowrap'><IconButton icon='more' iconClassName='rotate-90' /></TableCell>
                            <TableCell className='w-[1%] whitespace-nowrap'><IconButton icon='receipt' /></TableCell>
                            <TableCell className='w-[1%] whitespace-nowrap'><IconButton icon='chevron' /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <TablePagination className='mt-2' />
        </div>
    )
}

export default AdminTable