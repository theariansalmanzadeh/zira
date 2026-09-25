'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { TABLE_COLOUMN } from '../constants'
import TableHeader from './TableHeader'
import TableRow, { type WasteRowData } from './TableRow'

const TOGGLE_BUTTONS = [
    { label: 'درخواست‌های من و نتیجه', value: 'my-requests' },
    { label: 'سوابق کل', value: 'history' },
]

type InventorSectionProps = {
    items: WasteRowData[]
}

const InventorSection = ({ items }: InventorSectionProps) => {
    const searchParams = useSearchParams()
    const filter = searchParams.get('cat') ?? 'my-requests'

    const filteredItems = useMemo(() => {
        if (filter === 'history') return items
        return items.filter((item) => item.status === 'under-review')
    }, [filter, items])

    return (
        <TableListLayout
            TableColoumn={TABLE_COLOUMN}
            value='my-requests'
            toggleButtonValue={TOGGLE_BUTTONS}
        >
            <div className='flex flex-col gap-1 rounded-card-lg bg-surface-container-high p-2'>
                <TableHeader />
                {filteredItems.map((item) => (
                    <TableRow key={item.id} data={item} />
                ))}
            </div>
        </TableListLayout>
    )
}

export default InventorSection
