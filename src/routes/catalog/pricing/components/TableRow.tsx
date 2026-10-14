'use client'

import { useRouter } from 'next/navigation'
import {
    TableCell,
    TableRow as UiTableRow,
} from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill, PillVariants } from '@/src/shared/components/ui/Pill'
import type { VariantProps } from 'class-variance-authority'
import type { PriceListSourceEnum, PriceListStatusEnum } from '@/src/api/types/admin/pricing'

const SOURCE_LABEL: Record<PriceListSourceEnum, string> = {
    MANUAL: 'قیمت پایه',
    CONTRACT: 'قرارداد',
    IMPORT: 'ورود فایل',
}

const STATUS_CONFIG: Record<
    PriceListStatusEnum,
    { text: string; variant: VariantProps<typeof PillVariants>['variant'] }
> = {
    PUBLISHED: { text: 'فعال', variant: 'success' },
    SCHEDULED: { text: 'زمان‌بندی‌شده', variant: 'info' },
    DRAFT: { text: 'پیش‌نویس', variant: 'tonal' },
    CANCELLED: { text: 'لغو شده', variant: 'error' },
}

export type PriceListRowData = {
    id: string
    name: string
    source: PriceListSourceEnum
    code: string
    status: PriceListStatusEnum
}

const TableRow = ({ data }: { data: PriceListRowData }) => {
    const { TableColoumn } = useTable()
    const { push } = useRouter()
    const status = STATUS_CONFIG[data.status]

    return (
        <>
            <UiTableRow className='[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant!'>
                {TableColoumn[0]?.isChecked && (
                    <TableCell className='text-on-surface!'>{data.name}</TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>{SOURCE_LABEL[data.source]}</TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>
                        <div className='flex flex-col items-start gap-0.5'>
                            <span className='font-semibold text-on-surface' dir='ltr'>
                                {data.code}
                            </span>
                            <span className='text-label-sm text-outline'>کد</span>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[3]?.isChecked && <TableCell>دائمی</TableCell>}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>
                        <Pill
                            text={status.text}
                            variant={status.variant}
                            hasDot
                            className='border-0'
                        />
                    </TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell className='w-[1%] whitespace-nowrap'>
                        <IconButton
                            icon='edit400Linear'
                            iconClassName='size-5! text-outline'
                            onClick={() => push(`/admin/catalog/pricing/${data.id}`)}
                        />
                    </TableCell>
                )}
            </UiTableRow>
            <div className='py-1' />
        </>
    )
}

export default TableRow
