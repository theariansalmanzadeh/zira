'use client'

import { useSearchParams } from 'next/navigation'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import type { UnitOut } from '@/src/api/types/admin/settings'
import { useListUnits } from '@/src/routes/settings/hooks/settings'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import {
    TABLE_COLOUMN,
    type UnitListItem,
    type UnitStatus,
} from './constants'

const toUnitItem = (unit: UnitOut): UnitListItem => ({
    id: unit.id,
    code: unit.code,
    name: unit.name,
    factor: unit.factor,
    base_unit_name: unit.base_unit_name ?? '',
    is_base: unit.is_base,
    is_active: unit.is_active,
})

const UnitList = () => {
    const searchParams = useSearchParams()
    const statusFilter =
        (searchParams.get('cat') as UnitStatus | null) ?? 'all'
    const searchQuery = searchParams.get('search') ?? undefined

    const { data, isPending, isError } = useListUnits({
        page: 1,
        page_size: 100,
        search: searchQuery,
        is_active:
            statusFilter === 'active'
                ? true
                : statusFilter === 'inactive'
                  ? false
                  : undefined,
    })

    const units = (data?.results ?? []).map(toUnitItem)

    return (
        <div className="rounded-card-lg bg-surface-container-high p-2" dir="rtl">
            <TableListLayout
                value={statusFilter}
                TableColoumn={TABLE_COLOUMN}
                toggleButtonValue={ROUTE_CONFIGS.units.TOGGLE_BUTTON_VALUE}
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    {isPending ? (
                        <TableLoadingSkeleton isPending rows={5} />
                    ) : isError ? (
                        <div className="rounded-card-md bg-surface-container-lowest px-4 py-8 text-center text-label-md text-outline">
                            دریافت لیست واحدها با خطا مواجه شد.
                        </div>
                    ) : (
                        <Table className="border-collapse border-spacing-y-4">
                            <TableHeader />
                            <TableBody>
                                {units.length === 0 ? (
                                    <TableEmptyState
                                        colSpan={TABLE_COLOUMN.length}
                                        title="واحدی یافت نشد."
                                    />
                                ) : (
                                    units.map((unit) => (
                                        <TableRow key={unit.id} data={unit} />
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </TableListLayout>
        </div>
    )
}

export default UnitList
