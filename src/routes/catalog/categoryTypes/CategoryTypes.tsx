'use client'

import { useMemo } from 'react'
import type { CategoryNodeOut } from '@/src/api/types/admin/catalog'
import { useListCategories } from '@/src/routes/catalog/hooks/catalog'
import { Spinner } from '@/src/shared/components/ui/spinner'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { useTable } from '@/src/shared/context/TableProvider'
import {
    CATEGORY_COLUMN_SIZES,
    CATEGORY_TYPES_GRID_CLASS,
    TABLE_COLOUMN,
} from './constants'
import TableHeader from './components/TableHeader'
import CategoryTableRow, { type CategoryRowData } from './components/TableRow'

const toCategoryRow = (category: CategoryNodeOut): CategoryRowData => ({
    title: category.name,
    id: category.id,
    level: category.level,
    directItems: category.product_count ?? 0,
    totalProducts: category.product_count ?? 0,
    status: category.is_active ? 'active' : 'inactive',
    children: category.children?.map(toCategoryRow),
})

const CategoryTypesGrid = ({ data }: { data: CategoryRowData[] }) => {
    const { visibleTableColoumn } = useTable()

    const gridTemplateColumns = useMemo(
        () =>
            visibleTableColoumn
                .map((column) => CATEGORY_COLUMN_SIZES[column.id] ?? '1fr')
                .join(' '),
        [visibleTableColoumn]
    )

    return (
        <div
            className={`${CATEGORY_TYPES_GRID_CLASS} rounded-card-lg bg-surface-container-high p-2`}
            style={{ gridTemplateColumns }}
            dir='rtl'
        >
            <TableHeader />
            {data.map((item) => (
                <CategoryTableRow key={item.id} data={item} />
            ))}
        </div>
    )
}

const CategoryTypes = () => {
    const { data, isPending } = useListCategories({ include_inactive: true })
    const categories: CategoryNodeOut[] = data ?? []
    const rows = categories.map(toCategoryRow)

    return (
        <TableListLayout
            TableColoumn={TABLE_COLOUMN}
            hasHeaderActions={false}
            hasSearch={false}
            hasFilter={false}
            hasSort={false}
            hasTableSettings={false}
            hasExpand={false}
        >
            {isPending ? (
                <div className='flex justify-center py-10'>
                    <Spinner className='size-6' />
                </div>
            ) : (
                <CategoryTypesGrid data={rows} />
            )}
        </TableListLayout>
    )
}

export default CategoryTypes
