'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import {
    EVENTS_DUMMY,
    EVENT_SUMMARY_CARDS,
    TABLE_COLOUMN,
    type EventFilterTab,
    type EventRowData,
    type EventSummaryCardItem,
} from '../constants'
import EventSummaryCards from './components/EventSummaryCards'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'

type EventListProps = {
    summaryCards?: EventSummaryCardItem[]
    data?: EventRowData[]
}

const EventList = ({
    summaryCards = EVENT_SUMMARY_CARDS,
    data = EVENTS_DUMMY,
}: EventListProps) => {
    const searchParams = useSearchParams()
    const filterValue =
        (searchParams.get('cat') as EventFilterTab | null) ?? 'all'

    const filteredData = useMemo(() => {
        if (filterValue === 'all') return data
        if (filterValue === 'sensitive') {
            return data.filter(
                (item) => item.isSensitive || item.filterTab === 'sensitive'
            )
        }
        return data.filter((item) => item.filterTab === filterValue)
    }, [data, filterValue])

    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <EventSummaryCards items={summaryCards} />

            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value='all'
                toggleButtonValue={ROUTE_CONFIGS.events.TOGGLE_BUTTON_VALUE}
                hasFilter={false}
                hasSort={false}
                hasTableSettings={false}
                hasExpand={false}
                defaultSearchOpen
                searchPlaceholder='جستجو در رخدادها...'
            >
                <div className='flex flex-col gap-2 rounded-card-lg bg-surface-container-high p-2'>
                    <TableHeader />
                    {filteredData.map((item) => (
                        <TableRow key={item.id} data={item} />
                    ))}
                </div>
            </TableListLayout>
        </div>
    )
}

export default EventList
