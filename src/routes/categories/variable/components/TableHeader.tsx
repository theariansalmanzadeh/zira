'use client'

import {
    TableHead,
    TableHeader as UiHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'

const TABLE_HEADERS = ['ویژگی', 'نوع', 'تعداد مقدار', 'استفاده', ''] as const

const TableHeader = () => (
    <UiHeader className='rounded-xl'>
        <TableRow className='[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-outline'>
            {TABLE_HEADERS.map((label, index) => (
                <TableHead
                    key={label || `actions-${index}`}
                    className={
                        label === ''
                            ? 'w-[1%] whitespace-nowrap'
                            : 'whitespace-nowrap'
                    }
                >
                    {label}
                </TableHead>
            ))}
        </TableRow>
    </UiHeader>
)

export default TableHeader
