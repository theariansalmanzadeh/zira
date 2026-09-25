'use client'

import { useRouter } from 'next/navigation'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill } from '@/src/shared/components/ui/Pill'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import {
    DOC_TYPE_CONFIG,
    type ProductTurnoverRow,
} from '../constants'

type TableRowProps = {
    data: ProductTurnoverRow
}

const TableRow = ({ data }: TableRowProps) => {
    const { push } = useRouter()
    const { TableColoumn, visibleTableColoumn } = useTable()
    const docType = DOC_TYPE_CONFIG[data.documentType]
    const gridTemplateColumns = visibleTableColoumn
        .map((_, index) =>
            index === visibleTableColoumn.length - 1 ? 'auto' : 'minmax(0, 1fr)'
        )
        .join(' ')

    return (
        <div
            className={cn(
                'grid items-center gap-3 rounded-card-md bg-surface-container-lowest px-4 py-3 text-label-lg font-normal text-on-surface'
            )}
            style={{ gridTemplateColumns }}
            dir='rtl'
        >
            {TableColoumn[0]?.isChecked && (
                <div>{formatFaNumber(data.row)}</div>
            )}
            {TableColoumn[1]?.isChecked && (
                <div dir='ltr' className='text-right'>
                    {data.documentNumber}
                </div>
            )}
            {TableColoumn[2]?.isChecked && <div>{data.date}</div>}
            {TableColoumn[3]?.isChecked && (
                <div>
                    <Pill
                        text={docType.text}
                        variant={docType.variant}
                        className='border-0'
                    />
                </div>
            )}
            {TableColoumn[4]?.isChecked && (
                <div dir='ltr' className='text-right'>
                    {data.productCode}
                </div>
            )}
            {TableColoumn[5]?.isChecked && <div>{data.productName}</div>}
            {TableColoumn[6]?.isChecked && <div>{data.unit}</div>}
            {TableColoumn[7]?.isChecked && (
                <div>{formatFaNumber(data.quantity)}</div>
            )}
            {TableColoumn[8]?.isChecked && (
                <div className='flex justify-end'>
                    <IconButton
                        icon='chevronLeft300Linear'
                        iconClassName='size-6!'
                        onClick={() =>
                            push(`/admin/branches/product-turnover/${data.id}`)
                        }
                    />
                </div>
            )}
        </div>
    )
}

export default TableRow
