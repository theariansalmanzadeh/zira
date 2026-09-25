'use client'

import { useRouter } from 'next/navigation'
import IconButton from '@/src/shared/components/ui/IconButton'
import { useTable } from '@/src/shared/context/TableProvider'
import { Pill, PillVariants } from '@/src/shared/components/ui/Pill'
import { VariantProps } from 'class-variance-authority'
import type {
    InventoryInvoiceRowData,
    InventoryInvoiceStatus,
} from '../types'

export type {
    InventoryInvoiceFilterTab,
    InventoryInvoiceRowData,
    InventoryInvoiceStatus,
} from '../types'

const STATUS_CONFIG: Record<
    InventoryInvoiceStatus,
    { text: string; variant: VariantProps<typeof PillVariants>['variant'] }
> = {
    'final-approval': { text: 'تایید نهایی', variant: 'success' },
    pending: { text: 'در انتظار تایید', variant: 'warning' },
    draft: { text: 'پیش‌نویس', variant: 'tonal' },
}

export type TableRowProps = {
    data: InventoryInvoiceRowData
}

const TableRow = ({ data }: TableRowProps) => {
    const router = useRouter()
    const { TableColoumn, visibleTableColoumn } = useTable()
    const {
        id,
        productCode,
        mainCategory,
        subCategory,
        productName,
        size,
        model,
        status,
    } = data
    const statusConfig = STATUS_CONFIG[status]
    const gridTemplateColumns = visibleTableColoumn
        .map((_, index) =>
            index === visibleTableColoumn.length - 1 ? 'auto' : 'minmax(0, 1fr)'
        )
        .join(' ')

    return (
        <div className='flex flex-col gap-1' dir='rtl'>
            <div
                className='grid items-center gap-3 rounded-card-md bg-surface-container-lowest px-4 py-3 text-label-lg font-normal text-on-surface-variant'
                style={{ gridTemplateColumns }}
            >
                {TableColoumn[0]?.isChecked && <div>{productCode}</div>}
                {TableColoumn[1]?.isChecked && <div>{mainCategory}</div>}
                {TableColoumn[2]?.isChecked && <div>{subCategory}</div>}
                {TableColoumn[3]?.isChecked && <div>{productName}</div>}
                {TableColoumn[4]?.isChecked && <div>{size}</div>}
                {TableColoumn[5]?.isChecked && <div>{model}</div>}
                {TableColoumn[6]?.isChecked && (
                    <div>
                        <Pill
                            variant={statusConfig.variant}
                            text={statusConfig.text}
                            hasDot
                            className='border-0'
                        />
                    </div>
                )}
                {TableColoumn[7]?.isChecked && (
                    <div className='flex justify-end'>
                        <IconButton
                            icon='chevronLeft300Linear'
                            iconClassName='size-6!'
                            onClick={() =>
                                router.push(
                                    `/admin/inventory-managment/goods-entry/${id}`
                                )
                            }
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default TableRow
