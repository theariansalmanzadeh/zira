'use client'

import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import {
    SESSIONS_DUMMY,
    SESSION_TABLE_COLOUMN,
    type SessionRowData,
} from '../constants'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'

type SessionListProps = {
    data?: SessionRowData[]
}

const SessionList = ({ data = SESSIONS_DUMMY }: SessionListProps) => {
    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={SESSION_TABLE_COLOUMN}
                hasHeaderActions={false}
                hasSearch={false}
                hasFilter={false}
                hasSort={false}
                hasTableSettings={false}
                hasExpand={false}
            >
                <div className='flex flex-col gap-2 rounded-card-lg bg-surface-container-high p-2'>
                    <TableHeader />
                    {data.map((item) => (
                        <TableRow key={item.id} data={item} />
                    ))}
                </div>
            </TableListLayout>
        </div>
    )
}

export default SessionList
