'use client'

import type { DiscountOut, DiscountStatusEnum } from '@/src/api/types/admin/pricing'
import { Table, TableBody, TableCell, TableRow as UiTableRow } from '@/src/shared/components/ui/Table'
import { Pill } from '@/src/shared/components/ui/Pill'
import { Spinner } from '@/src/shared/components/ui/spinner'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaDate } from '@/src/shared/libs/formatter'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { useListDiscounts } from '@/src/routes/catalog/hooks/pricing'
import { CASH_TABLE_COLUMNS } from '../constants'
import TableHeader from './TableHeader'

const STATUS_LABEL: Record<DiscountStatusEnum, string> = {
    DRAFT: 'پیش‌نویس',
    ACTIVE: 'فعال',
    INACTIVE: 'غیرفعال',
    ARCHIVED: 'بایگانی',
}

const formatDate = (value?: string | null) => (value ? formatFaDate(value) : '—')

const CashRow = ({ discount }: { discount: DiscountOut }) => {
    const { TableColoumn } = useTable()

    return (
        <>
            <UiTableRow className='[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant!'>
                {TableColoumn[0]?.isChecked && (
                    <TableCell>{discount.value_display || '—'}</TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>{discount.min_amount || '—'}</TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{formatDate(discount.start_at)}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{formatDate(discount.end_at)}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{formatDate(discount.updated_at)}</TableCell>
                )}
                {TableColoumn[5]?.isChecked && <TableCell>—</TableCell>}
                {TableColoumn[6]?.isChecked && (
                    <TableCell>
                        <Pill
                            text={STATUS_LABEL[discount.status]}
                            variant={discount.status === 'ACTIVE' ? 'success' : 'tonal'}
                            hasDot
                        />
                    </TableCell>
                )}
            </UiTableRow>
            <div className='py-1' />
        </>
    )
}

const CashTable = () => {
    const { data, isPending, isError } = useListDiscounts({
        page: 1,
        page_size: 100,
        kind: 'CASH',
    })
    const discounts = data?.results ?? []

    return (
    <TableListLayout TableColoumn={CASH_TABLE_COLUMNS} hasHeaderActions={false}>
            <div className='rounded-card-lg bg-surface-container-high p-2'>
                <Table className='border-collapse border-spacing-y-4'>
                    <TableHeader />
                    <TableBody>
                        {isPending ? (
                            <tr>
                                <td colSpan={7} className='py-10'>
                                    <div className='flex justify-center'>
                                        <Spinner className='size-6' />
                                    </div>
                                </td>
                            </tr>
                        ) : isError ? (
                            <tr>
                                <td
                                    colSpan={7}
                                    className='py-6 text-center text-label-md text-outline'
                                >
                                    دریافت تخفیف‌های نقدی با خطا مواجه شد.
                                </td>
                            </tr>
                        ) : discounts.length === 0 ? (
                            <TableEmptyState colSpan={7} title='تخفیف نقدی یافت نشد.' />
                        ) : (
                            discounts.map((discount) => (
                                <CashRow key={discount.id} discount={discount} />
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </TableListLayout>
    )
}

export default CashTable
