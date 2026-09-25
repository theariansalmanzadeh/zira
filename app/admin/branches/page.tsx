import type { ComponentType } from 'react'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import {
    getBranchesSectionKey,
    sectionToHeading,
} from '@/src/routes/branches/constants'

const BranchManagment = dynamic(
    () => import('@/src/routes/branches/branchesDashboard/BranchesDashboard'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const BranchesList = dynamic(
    () => import('@/src/routes/branches/branchesList/BranchesList'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const BranchesReport = dynamic(
    () => import('@/src/routes/branches/branchesReport/BranchesReport'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const ProductTurnover = dynamic(
    () => import('@/src/routes/branches/productTurnover/ProductTurnover'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const BranchTransfer = dynamic(
    () => import('@/src/routes/branches/branchTransfer/BranchTransfer'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const WarehouseTransferTracking = dynamic(
    () =>
        import(
            '@/src/routes/branches/warehouseTransferTracking/WarehouseTransferTracking'
        ),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const BranchStock = dynamic(
    () => import('@/src/routes/branches/branchStock/BranchStock'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

const PAGE_COMPONENTS: Record<string, ComponentType> = {
    dashboard: BranchManagment,
    list: BranchesList,
    report: BranchesReport,
    'product-turnover': ProductTurnover,
    'branch-transfer': BranchTransfer,
    'warehouse-transfer-tracking': WarehouseTransferTracking,
    'branch-stock': BranchStock,
}

const Placeholder = ({ title }: { title: string }) => (
    <div className='rounded-card-lg bg-surface-container-lowest p-6 text-label-lg text-outline'>
        {title} به‌زودی
    </div>
)

export default async function BranchesPage({
    searchParams,
}: {
    searchParams: Promise<{ sub?: string }>
}) {
    const { sub } = await searchParams
    const section = getBranchesSectionKey(sub || '')
    const Component = PAGE_COMPONENTS[section]

    if (!Component) {
        return (
            <Suspense fallback={<TableLoadingSkeleton isPending />}>
                <Placeholder
                    title={sectionToHeading[section]?.title ?? 'این بخش'}
                />
            </Suspense>
        )
    }

    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <Component />
        </Suspense>
    )
}
