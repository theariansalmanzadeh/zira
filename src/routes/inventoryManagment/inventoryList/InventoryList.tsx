'use client'

import { useMemo, useState } from 'react'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import InventoryCard from './component/InventoryCard'
import {
    filterInventoryList,
    INVENTORY_LIST_DUMMY,
} from './constants'

const InventoryList = () => {
    const [activeFilter] = useState('all')

    const filteredWarehouses = useMemo(
        () => filterInventoryList(INVENTORY_LIST_DUMMY, activeFilter),
        [activeFilter]
    )

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <TableListLayout
                value={activeFilter}
                toggleButtonValue={ROUTE_CONFIGS.inventoryList.TOGGLE_BUTTON_VALUE}
                hasHeaderActions
                isCardLayout
            >
                {filteredWarehouses.map((warehouse) => (
                    <InventoryCard key={warehouse.id} data={warehouse} />
                ))}
            </TableListLayout>
        </div>
    )
}

export default InventoryList
