'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import type { DiscountOut, DiscountStatusEnum } from '@/src/api/types/admin/pricing'
import { useListDiscounts } from '@/src/routes/catalog/hooks/pricing'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { Spinner } from '@/src/shared/components/ui/spinner'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import DiscountRow, { DiscountRowProps } from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

export type DiscountStatus = 'valid' | 'invalid' | 'draft'

const DISCOUNT_CODE_TOGGLE = [
    { label: 'همه', value: 'all' },
    { label: 'معتبر', value: 'valid' },
    { label: 'نامعتبر', value: 'invalid' },
    { label: 'پیش‌نویس', value: 'draft' },
]

const STATUS_QUERY: Record<string, DiscountStatusEnum | undefined> = {
    valid: 'ACTIVE',
    invalid: 'INACTIVE',
    draft: 'DRAFT',
}

const PAYMENT_SCOPE_LABEL = {
    ALL: 'همه',
    CASH: 'نقدی',
    CREDIT: 'اعتباری',
} as const

const remainingDays = (endAt?: string | null) => {
    if (!endAt) return '—'
    const end = new Date(endAt).getTime()
    if (Number.isNaN(end)) return '—'
    const days = Math.ceil((end - Date.now()) / 86_400_000)
    return String(Math.max(days, 0))
}

const toRowStatus = (discount: DiscountOut): DiscountStatus => {
    if (discount.status === 'DRAFT') return 'draft'
    if (discount.status === 'ACTIVE' && discount.validity !== 'EXPIRED') {
        return 'valid'
    }
    return 'invalid'
}

const toDiscountRow = (discount: DiscountOut): DiscountRowProps => ({
    data: {
        title: discount.title,
        contractId: discount.kind_display,
        date: PAYMENT_SCOPE_LABEL[discount.payment_scope],
        scope: discount.value_display,
        discountPercent: discount.value_display,
        status: toRowStatus(discount),
        startDate: discount.start_at || '',
        endDate: discount.end_at || '',
        remainingDays: remainingDays(discount.end_at),
    },
})

const DiscountTable = ({
    data,
    isPending,
    isError,
}: {
    data: DiscountRowProps[]
    isPending: boolean
    isError: boolean
}) => (
    <div className='rounded-card-lg bg-surface-container-high p-2'>
        <Table className='border-collapse border-spacing-y-4'>
            <TableHeader />
            <TableBody>
                {isPending ? (
                    <tr>
                        <td colSpan={9} className='py-10'>
                            <div className='flex justify-center'>
                                <Spinner className='size-6' />
                            </div>
                        </td>
                    </tr>
                ) : isError ? (
                    <tr>
                        <td
                            colSpan={9}
                            className='py-6 text-center text-label-md text-outline'
                        >
                            دریافت تخفیف‌ها با خطا مواجه شد.
                        </td>
                    </tr>
                ) : data.length === 0 ? (
                    <TableEmptyState
                        colSpan={TABLE_COLOUMN.length}
                        title='تخفیفی یافت نشد.'
                    />
                ) : (
                    data.map((item, index) => (
                        <DiscountRow
                            key={`${item.data.title}-${item.data.startDate}-${index}`}
                            data={item.data}
                        />
                    ))
                )}
            </TableBody>
        </Table>
    </div>
)

const DiscountCodeList = () => {
    const searchParams = useSearchParams()
    const statusFilter = searchParams.get('cat') ?? 'all'
    const { data, isPending, isError } = useListDiscounts({
        page: 1,
        page_size: 100,
        status: STATUS_QUERY[statusFilter],
    })

    const discounts = useMemo(
        () => (data?.results ?? []).map(toDiscountRow),
        [data?.results]
    )

    return (
        <TableListLayout
            TableColoumn={TABLE_COLOUMN}
            value={statusFilter}
            toggleButtonValue={DISCOUNT_CODE_TOGGLE}
        >
            <DiscountTable
                data={discounts}
                isPending={isPending}
                isError={isError}
            />
        </TableListLayout>
    )
}

export default DiscountCodeList
