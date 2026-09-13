import type { ComponentType } from 'react'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import InventoryPlaceholder from '@/src/routes/inventoryManagment/components/InventoryPlaceholder'
import {
    INVENTORY_SUB_PARAMS,
    sectionToHeading,
    type InventorySubParam,
} from '@/src/routes/inventoryManagment/constants'

const InventoryDashboard = dynamic(
    () => import('@/src/routes/inventoryManagment/inventoryDashboard/InventoryDashboard'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const InventoryList = dynamic(
    () => import('@/src/routes/inventoryManagment/inventoryList/InventoryList'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const InventoryInvoice = dynamic(
    () => import('@/src/routes/inventoryManagment/inventoryInvoice/InventoryInvoice'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const PreparationExit = dynamic(
    () => import('@/src/routes/inventoryManagment/preparationExit/PreparationExit'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const Transfer = dynamic(
    () => import('@/src/routes/inventoryManagment/transfer/Transfer'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const ChangeAddress = dynamic(
    () => import('@/src/routes/inventoryManagment/changeAddress/ChangeAddress'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const StockReturn = dynamic(
    () => import('@/src/routes/inventoryManagment/stockReturn/StockReturn'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const WasteTable = dynamic(
    () => import('@/src/routes/inventoryManagment/waste/WasteTable'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

const INVENTORY_PAGE_COMPONENTS: Partial<
    Record<InventorySubParam, ComponentType>
> = {
    dashboard: InventoryDashboard,
    list: InventoryList,
    'goods-entry': InventoryInvoice,
    'preparation-exit': PreparationExit,
    transfer: Transfer,
    'change-address': ChangeAddress,
    'stock-returns': StockReturn,
    waste: WasteTable,
}

async function InventoryManagmentPage({
    searchParams,
}: {
    searchParams: Promise<{ sub?: string }>
}) {
    const { sub } = await searchParams
    const section = (
        sub && INVENTORY_SUB_PARAMS.includes(sub as InventorySubParam)
            ? sub
            : 'dashboard'
    ) as InventorySubParam
    const Component = INVENTORY_PAGE_COMPONENTS[section]

    if (!Component) {
        return (
            <InventoryPlaceholder
                title={sectionToHeading[section]?.title ?? 'انبار'}
            />
        )
    }

    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <Component />
        </Suspense>
    )
}

export default InventoryManagmentPage
