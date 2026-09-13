'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import {
    BRANDS_LIST_DUMMY,
    TABLE_COLOUMN,
    type BrandItem,
    type BrandStatus,
} from './constants'

type BrandsListProps = {
    data?: BrandItem[]
}

const BrandsList = ({ data = BRANDS_LIST_DUMMY }: BrandsListProps) => {
    const searchParams = useSearchParams()
    const statusFilter = (searchParams.get('cat') as BrandStatus | null) ?? 'all'

    const filteredBrands = useMemo(() => {
        if (statusFilter === 'all') return data
        return data.filter((brand) => brand.status === statusFilter)
    }, [data, statusFilter])

    return (
        <div className="rounded-card-lg bg-surface-container-high p-2" dir="rtl">
            <TableListLayout
                value="all"
                TableColoumn={TABLE_COLOUMN}
                toggleButtonValue={ROUTE_CONFIGS.brands.TOGGLE_BUTTON_VALUE}
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <TableHeader />
                        <TableBody>
                            {filteredBrands.map((brand) => (
                                <TableRow key={brand.id} data={brand} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TableListLayout>
        </div>
    )
}

export default BrandsList
