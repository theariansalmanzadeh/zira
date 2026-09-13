'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import {
    BUNDLE_LIST_DUMMY,
    TABLE_COLOUMN,
    type BundleItem,
    type BundleStatus,
} from './constants'

type BundleListProps = {
    data?: BundleItem[]
}

const BundleList = ({ data = BUNDLE_LIST_DUMMY }: BundleListProps) => {
    const searchParams = useSearchParams()
    const statusFilter = (searchParams.get('cat') as BundleStatus | null) ?? 'all'

    const filteredBundles = useMemo(() => {
        if (statusFilter === 'all') return data
        return data.filter((bundle) => bundle.status === statusFilter)
    }, [data, statusFilter])

    return (
        <div className="rounded-card-lg bg-surface-container-high p-2" dir="rtl">
            <TableListLayout
                value="all"
                TableColoumn={TABLE_COLOUMN}
                toggleButtonValue={ROUTE_CONFIGS.bundle.TOGGLE_BUTTON_VALUE}
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <TableHeader />
                        <TableBody>
                            {filteredBundles.map((bundle) => (
                                <TableRow key={bundle.id} data={bundle} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TableListLayout>
        </div>
    )
}

export default BundleList
