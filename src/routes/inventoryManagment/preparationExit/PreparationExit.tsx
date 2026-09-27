'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { useSearchParam } from '@/src/shared/hooks/useSearchParam'
import ExitDropdownMenu from './components/DropdownMenu'
import TableHeader from './components/TableHeader'
import InPersonRow from './components/InPersonRow'
import OnlineRow from './components/OnlineRow'
import ArchiveRow from './components/ArchiveRow'
import RejectedRow from './components/RejectedRow'
import {
    PREPARATION_EXIT_ACTIONS,
    PREPARATION_EXIT_COLUMNS,
    PREPARATION_EXIT_RECORDS,
    type PreparationExitRecord,
    type PreparationExitType,
} from './constants/exits'

const ROW_BY_TYPE = {
    'in-person': InPersonRow,
    online: OnlineRow,
    archive: ArchiveRow,
    rejected: RejectedRow,
} as const

const PreparationExit = () => {
    const searchParams = useSearchParams()
    const { setSearchParams } = useSearchParam()
    const [exitType, setExitType] = useState<PreparationExitType>('in-person')
    const actionButtons = PREPARATION_EXIT_ACTIONS[exitType]
    const cat = searchParams.get('cat')
    const activeAction =
        actionButtons.find((item) => item.value === cat)?.value ??
        actionButtons[0]?.value

    const rows = useMemo(
        () =>
            PREPARATION_EXIT_RECORDS.filter((item) => {
                if (item.type !== exitType) return false
                if (!activeAction) return true
                return item.action === activeAction
            }),
        [activeAction, exitType]
    )

    const Row = ROW_BY_TYPE[exitType]

    const handleTypeChange = (value: PreparationExitType) => {
        setExitType(value)
        setSearchParams({ cat: null }, { replace: true })
    }

    return (
        <div className="flex flex-col gap-4" dir="rtl">
            <ExitDropdownMenu value={exitType} onChange={handleTypeChange} />
            <TableListLayout
                key={exitType}
                TableColoumn={PREPARATION_EXIT_COLUMNS[exitType]}
                value={activeAction}
                toggleButtonValue={actionButtons}
                hasHeaderActions={actionButtons.length > 0}
            >
                <div className="flex flex-col gap-2 rounded-card-lg bg-surface-container-high p-2">
                    <TableHeader />
                    {rows.map((item: PreparationExitRecord) => (
                        <Row key={item.id} data={item} />
                    ))}
                </div>
            </TableListLayout>
        </div>
    )
}

export default PreparationExit
