'use client'

import { useMemo } from 'react'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { useTable } from '@/src/shared/context/TableProvider'
import {
    CATEGORY_COLUMN_SIZES,
    CATEGORY_TYPES_GRID_CLASS,
    TABLE_COLOUMN,
} from './constants'
import TableHeader from './components/TableHeader'
import CategoryTableRow, { type CategoryRowData } from './components/TableRow'

export const CATEGORY_TYPES_DUMMY: CategoryRowData[] = [
    {
        title: 'پوشاک زنانه',
        id: 'CAT-6353',
        level: 1,
        directItems: 124,
        totalProducts: 726,
        status: 'active',
        subCategories: [
            {
                title: 'لباس زیر زنانه',
                id: 'CAT-6354',
                level: 2,
                directItems: 48,
                totalProducts: 210,
                status: 'active',
                subCategories: [
                    {
                        title: 'لباس زیر زنانه',
                        id: 'CAT-6354-3',
                        level: 3,
                        directItems: 48,
                        totalProducts: 210,
                        status: 'active',
                    },
                ],
            },
            {
                title: 'لباس خواب',
                id: 'CAT-6355',
                level: 2,
                directItems: 32,
                totalProducts: 156,
                status: 'active',
            },
        ],
    },
    {
        title: 'پوشاک مردانه',
        id: 'CAT-6401',
        level: 1,
        directItems: 89,
        totalProducts: 412,
        status: 'active',
    },
    {
        title: 'اکسسوری',
        id: 'CAT-6500',
        level: 1,
        directItems: 56,
        totalProducts: 198,
        status: 'inactive',
        subCategories: [
            {
                title: 'کیف و کوله',
                id: 'CAT-6501',
                level: 2,
                directItems: 22,
                totalProducts: 74,
                status: 'inactive',
            },
        ],
    },
]

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

const CategoryTypes = ({
    data = CATEGORY_TYPES_DUMMY,
}: {
    data?: CategoryRowData[]
}) => {
    return (
        <TableListLayout TableColoumn={TABLE_COLOUMN}>
            <CategoryTypesGrid data={data} />
        </TableListLayout>
    )
}

export default CategoryTypes
