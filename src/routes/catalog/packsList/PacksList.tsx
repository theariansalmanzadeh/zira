'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import type { ItemListOut, ItemVariationPattern } from '@/src/api/types/admin/catalog'
import { useListItems } from '@/src/routes/catalog/hooks/catalog'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import {
    TABLE_COLOUMN,
    type PackListItem,
    type PackVisibility,
} from './constants'

const VARIATION_LABEL: Record<ItemVariationPattern, string> = {
    FIXED_COLOR: 'رنگ ثابت',
    FIXED_SIZE: 'سایز ثابت',
    FREE: 'آزاد',
    STANDARD: 'استاندارد',
    SIZE_ONLY: 'فقط سایز',
    COLOR_ONLY: 'فقط رنگ',
}

const mapItemToPack = (item: ItemListOut): PackListItem => {
    const visibility: PackVisibility =
        item.status === 'HIDDEN' || item.status === 'ARCHIVED'
            ? 'hidden'
            : item.audience === 'GROUPS'
              ? 'customer-group'
              : 'public'
    const pattern = VARIATION_LABEL[item.variation_pattern as ItemVariationPattern]
    const packSize = item.pack_size?.trim()

    return {
        id: item.id,
        name: item.display_name,
        itemCode: item.code || item.sku,
        itemName: item.base_code || item.product_code || '—',
        brand: item.brand_name || '—',
        model: item.product_code || '—',
        variety: pattern || item.variation_pattern || '—',
        packCount: packSize ? `${formatFaNumber(packSize)} عدد` : '—',
        price: '—',
        available: '—',
        visibility,
    }
}

const PacksList = ({ data }: { data?: PackListItem[] }) => {
    const searchParams = useSearchParams()
    const visibility = searchParams.get('cat') as PackVisibility | 'all' | null
    const searchQuery =
        (searchParams.get('q') || searchParams.get('search') || '').trim() || undefined

    const {
        data: apiData,
        isPending,
        isError,
    } = useListItems(
        {
            is_pack: true,
            q: searchQuery,
            page: 1,
            page_size: 100,
        },
        !data
    )

    const filteredPacks = useMemo(() => {
        const packs = data ?? (apiData?.results ?? []).map(mapItemToPack)
        if (!visibility || visibility === 'all') return packs
        return packs.filter((pack) => pack.visibility === visibility)
    }, [data, apiData, visibility])

    return (
        <div className="rounded-card-lg bg-surface-container-high p-2" dir="rtl">
            <TableListLayout
                value="all"
                TableColoumn={TABLE_COLOUMN}
                toggleButtonValue={ROUTE_CONFIGS.packsList.TOGGLE_BUTTON_VALUE}
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    {isPending && !data ? (
                        <TableLoadingSkeleton isPending rows={5} />
                    ) : isError && !data ? (
                        <div className="rounded-card-md bg-surface-container-lowest px-4 py-8 text-center text-label-md text-outline">
                            دریافت لیست پک‌ها با خطا مواجه شد.
                        </div>
                    ) : (
                        <Table className="border-collapse border-spacing-y-4">
                            <TableHeader />
                            <TableBody>
                                {filteredPacks.length === 0 ? (
                                    <TableEmptyState
                                        colSpan={TABLE_COLOUMN.length}
                                        title='پکی یافت نشد.'
                                    />
                                ) : (
                                    filteredPacks.map((pack) => (
                                        <TableRow key={pack.id} data={pack} />
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
                <TablePagination
                    className="mt-2"
                    page={apiData?.page ?? 1}
                    totalAmount={data ? filteredPacks.length : (apiData?.total ?? filteredPacks.length)}
                />
            </TableListLayout>
        </div>
    )
}

export default PacksList
