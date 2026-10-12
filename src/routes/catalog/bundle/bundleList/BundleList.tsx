'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import {
    TABLE_COLOUMN,
    type BundleItem,
    type BundleStatus,
} from './constants'
import { useListBundles } from '@/src/routes/catalog/hooks/catalog'
import type { BundleListOut } from '@/src/api/types/admin/catalog'

const mapBundleToItem = (bundle: BundleListOut): BundleItem => ({
    id: bundle.id,
    code: bundle.code,
    name: bundle.name,
    itemsCount: bundle.line_count ?? 0,
    totalStock: Number(bundle.total_qty) || 0,
    price: Number(bundle.price) || 0,
    createdAt: bundle.created_at,
    status: bundle.is_active ? 'active' : 'inactive',
})

type BundleListProps = {
    data?: BundleItem[]
}

const BundleList = ({ data: propData }: BundleListProps) => {
    const searchParams = useSearchParams()
    const statusFilter = (searchParams.get('cat') as BundleStatus | null) ?? 'all'
    const searchQuery = searchParams.get('search') ?? undefined

    const { data: apiData, isPending, isError } = useListBundles(
        {
            is_active:
                statusFilter === 'active'
                    ? true
                    : statusFilter === 'inactive'
                    ? false
                    : undefined,
            search: searchQuery,
        },
        !propData
    )

    const bundles = useMemo(() => {
        if (propData) {
            if (statusFilter === 'all') return propData
            return propData.filter((bundle) => bundle.status === statusFilter)
        }

        const items = (apiData?.items ?? []).map(mapBundleToItem)
        if (statusFilter === 'all') return items
        return items.filter((bundle) => bundle.status === statusFilter)
    }, [propData, apiData, statusFilter])

    return (
        <div className="rounded-card-lg bg-surface-container-high p-2" dir="rtl">
            <TableListLayout
                value="all"
                TableColoumn={TABLE_COLOUMN}
                toggleButtonValue={ROUTE_CONFIGS.bundle.TOGGLE_BUTTON_VALUE}
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    {isPending && !propData ? (
                        <TableLoadingSkeleton isPending rows={5} />
                    ) : isError && !propData ? (
                        <div className="rounded-card-md bg-surface-container-lowest px-4 py-8 text-center text-label-md text-outline">
                            دریافت لیست باندل‌ها با خطا مواجه شد.
                        </div>
                    ) : (
                        <Table className="border-collapse border-spacing-y-4">
                            <TableHeader />
                            <TableBody>
                                {bundles.map((bundle) => (
                                    <TableRow key={bundle.id} data={bundle} />
                                ))}
                                {bundles.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={TABLE_COLOUMN.length}
                                            className="py-8 text-center text-label-md text-outline"
                                        >
                                            باندلی یافت نشد.
                                        </td>
                                    </tr>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </TableListLayout>
        </div>
    )
}

export default BundleList
