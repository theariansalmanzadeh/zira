'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import {
    PACKS_LIST_DUMMY,
    TABLE_COLOUMN,
    type PackListItem,
    type PackVisibility,
} from './constants'

const PacksList = ({ data = PACKS_LIST_DUMMY }: { data?: PackListItem[] }) => {
    const searchParams = useSearchParams()
    const visibility = searchParams.get('cat') as PackVisibility | 'all' | null

    const filteredPacks = useMemo(() => {
        if (!visibility || visibility === 'all') return data
        return data.filter((pack) => pack.visibility === visibility)
    }, [data, visibility])

    return (
        <div className="rounded-card-lg bg-surface-container-high p-2" dir="rtl">
            <TableListLayout
                value="all"
                TableColoumn={TABLE_COLOUMN}
                toggleButtonValue={ROUTE_CONFIGS.packsList.TOGGLE_BUTTON_VALUE}
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <TableHeader />
                        <TableBody>
                            {filteredPacks.map((pack) => (
                                <TableRow key={pack.id} data={pack} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    className="mt-2"
                    page={1}
                    totalAmount={filteredPacks.length}
                />
            </TableListLayout>
        </div>
    )
}

export default PacksList
