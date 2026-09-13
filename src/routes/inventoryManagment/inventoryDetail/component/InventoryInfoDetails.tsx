'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { Button } from '@/src/shared/components/ui/button'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { useModalStore } from '@/src/shared/store/modal-store'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import GoodsListTableHeader from './GoodsListTableHeader'
import GoodsListTableRow from './GoodsListTableRow'
import {
    GOODS_LIST_COLOUMN,
    INVENTORY_EMPLOYEES_DUMMY,
    INVENTORY_GOODS_DUMMY,
    TABLE_COLOUMN,
} from '../constants'

const InventoryInfoDetailsContent = () => {
    const searchParams = useSearchParams()
    const { openModal } = useModalStore()
    const activeTab = searchParams.get('cat') ?? 'employees'
    const TableColoumn =
        activeTab === 'products' ? GOODS_LIST_COLOUMN : TABLE_COLOUMN

    return (
        <TableListLayout
            TableColoumn={TableColoumn}
            value="employees"
            toggleButtonValue={ROUTE_CONFIGS.inventoryDetail.TOGGLE_BUTTON_VALUE}
        >
            {activeTab === 'employees' && (
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <TableHeader />
                        <TableBody>
                            {INVENTORY_EMPLOYEES_DUMMY.map((employee) => (
                                <TableRow key={employee.id} data={employee} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            {activeTab === 'products' && (
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <GoodsListTableHeader />
                        <TableBody>
                            {INVENTORY_GOODS_DUMMY.map((item) => (
                                <GoodsListTableRow key={item.id} data={item} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            {activeTab === 'warehouseMap' && (
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => openModal(ModalTypes.LOCATION_GOODS)}
                    >
                        کالاهای ناحیه A . قفسه A-R1 . طبقه 1
                    </Button>
                </div>
            )}
        </TableListLayout>
    )
}

const InventoryInfoDetails = () => {
    return (
        <Suspense fallback={null}>
            <InventoryInfoDetailsContent />
        </Suspense>
    )
}

export default InventoryInfoDetails
