'use client'

import { useMemo, useState } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import HeadingWithActions from '@/src/shared/components/ui/HeadingWithActions'
import { Button } from '@/src/shared/components/ui/button'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, { type UserOrderFilterTab } from './components/TableRow'
import { filterUserOrders, USER_ORDERS_DUMMY } from '../constants'
import { TABLE_COLOUMN } from './constants'

const UserOrder = () => {
    const [activeFilter] = useState<
        UserOrderFilterTab | string
    >('all')

    const filteredOrders = useMemo(
        () => filterUserOrders(USER_ORDERS_DUMMY, activeFilter),
        [activeFilter]
    )

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <HeadingWithActions>
                <HeadingWithActions.Title>سفارش‌های من</HeadingWithActions.Title>
                <HeadingWithActions.ButtonWrapper>
                    <Button variant="outline">
                        <Icon label="export300Linear" className="size-6!" />
                        <span className="text-label-sm">خروجی اکسل</span>
                    </Button>
                </HeadingWithActions.ButtonWrapper>
            </HeadingWithActions>

            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={activeFilter}
                toggleButtonValue={ROUTE_CONFIGS.userOrder.TOGGLE_BUTTON_VALUE}
                hasHeaderActions
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <TableHeader />
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow key={order.id} data={order} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination className="mt-2" totalAmount={100} />
            </TableListLayout>
        </div>
    )
}

export default UserOrder
