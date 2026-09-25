'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { TABLE_COLOUMN } from '../constants'
import AdminTableRow from './AdminTableRow'
import TableHeader from './TableHeader'
import type { WasteRowData, WasteStatus } from './TableRow'

const TOGGLE_BUTTONS = [
    { label: 'درخواست‌های رسیده', value: 'incoming' },
    { label: 'در انتظار صورتجلسه', value: 'awaiting-minutes' },
    { label: 'تایید نهایی شده', value: 'final-approved' },
    { label: 'رد شده', value: 'rejected' },
]

const STATUS_BY_FILTER: Record<string, WasteStatus | 'all'> = {
    incoming: 'all',
    'awaiting-minutes': 'under-review',
    'final-approved': 'approved',
    rejected: 'rejected',
}

type AdminSectionProps = {
    items: WasteRowData[]
}

const AdminSection = ({ items }: AdminSectionProps) => {
    const searchParams = useSearchParams()
    const filter = searchParams.get('cat') ?? 'incoming'
    const status = STATUS_BY_FILTER[filter] ?? 'all'

    const filteredItems = useMemo(() => {
        if (status === 'all') return items
        return items.filter((item) => item.status === status)
    }, [items, status])

    return (
        <TableListLayout
            TableColoumn={TABLE_COLOUMN}
            value='incoming'
            toggleButtonValue={TOGGLE_BUTTONS}
        >
            <div className='flex flex-col gap-1 rounded-card-lg bg-surface-container-high p-2'>
                <TableHeader />
                {filteredItems.map((item) => (
                    <AdminTableRow key={item.id} data={item} />
                ))}
            </div>
        </TableListLayout>
    )
}

export default AdminSection
