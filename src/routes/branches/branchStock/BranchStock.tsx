'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import BranchInfo from './components/BranchInfo'
import Filters from './components/Filters'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import {
    BRANCH_INFO_BY_BRANCH,
    BRANCH_STOCK_DUMMY,
    FILTER_DEFAULTS,
    FILTER_QUERY_KEYS,
    TABLE_COLOUMN,
} from './constants'

const BranchStock = () => {
    const searchParams = useSearchParams()
    const branch =
        searchParams.get(FILTER_QUERY_KEYS.branch) ?? FILTER_DEFAULTS.branch
    const storage =
        searchParams.get(FILTER_QUERY_KEYS.storage) ?? FILTER_DEFAULTS.storage

    const branchInfo =
        BRANCH_INFO_BY_BRANCH[branch] ??
        BRANCH_INFO_BY_BRANCH[FILTER_DEFAULTS.branch]

    const filteredRows = useMemo(() => {
        return BRANCH_STOCK_DUMMY.filter((row) => {
            if (row.branch !== branch) return false
            if (storage === 'all') return true
            return row.storage === storage
        })
    }, [branch, storage])

    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <Filters />
            <BranchInfo data={branchInfo} />
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                hasHeaderActions={false}
                hasSort={false}
                hasExpand={false}
            >
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            {filteredRows.map((item) => (
                                <TableRow key={item.id} data={item} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TableListLayout>
        </div>
    )
}

export default BranchStock
