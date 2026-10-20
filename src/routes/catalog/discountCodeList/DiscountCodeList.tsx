'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import type { CouponOut, CouponStatusEnum } from '@/src/api/types/admin/pricing'
import { useListCoupons } from '@/src/routes/catalog/hooks/pricing'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { Spinner } from '@/src/shared/components/ui/spinner'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import DiscountRow, { type DiscountRowProps } from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

export type DiscountStatus = 'valid' | 'invalid' | 'draft'

const DISCOUNT_CODE_TOGGLE = [
    { label: 'همه', value: 'all' },
    { label: 'معتبر', value: 'valid' },
    { label: 'نامعتبر', value: 'invalid' },
    { label: 'پیش‌نویس', value: 'draft' },
]

const STATUS_QUERY: Record<string, CouponStatusEnum | undefined> = {
    valid: 'ACTIVE',
    invalid: 'DISABLED',
}

const remainingDays = (endAt?: string | null) => {
    if (!endAt) return '—'
    const end = new Date(endAt).getTime()
    if (Number.isNaN(end)) return '—'
    const days = Math.ceil((end - Date.now()) / 86_400_000)
    return String(Math.max(days, 0))
}

const toRowStatus = (coupon: CouponOut): DiscountStatus => {
    if (coupon.status === 'DISABLED' || coupon.is_expired) return 'invalid'
    if (coupon.status === 'ACTIVE') return 'valid'
    return 'draft'
}

const toDiscountRow = (coupon: CouponOut): DiscountRowProps => ({
    data: {
        id: coupon.id,
        title: coupon.code_text,
        contractId: coupon.discount_kind_display || '—',
        date: coupon.source_display || '—',
        scope: coupon.value_display || '—',
        discountPercent: coupon.value_display || '—',
        status: toRowStatus(coupon),
        startDate: coupon.created_at || '',
        endDate: coupon.expires_at || '',
        remainingDays: remainingDays(coupon.expires_at),
        enabled: coupon.status === 'ACTIVE' && !coupon.is_expired,
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
                            دریافت کدهای تخفیف با خطا مواجه شد.
                        </td>
                    </tr>
                ) : data.length === 0 ? (
                    <TableEmptyState
                        colSpan={TABLE_COLOUMN.length}
                        title='کد تخفیفی یافت نشد.'
                    />
                ) : (
                    data.map((item) => (
                        <DiscountRow key={item.data.id} data={item.data} />
                    ))
                )}
            </TableBody>
        </Table>
    </div>
)

const DiscountCodeList = () => {
    const searchParams = useSearchParams()
    const statusFilter = searchParams.get('cat') ?? 'all'
    const { data, isPending, isError } = useListCoupons({
        page: 1,
        page_size: 100,
        status: STATUS_QUERY[statusFilter],
    })

    const discounts = useMemo(() => {
        const rows = (data?.results ?? []).map(toDiscountRow)
        if (statusFilter === 'draft') {
            return rows.filter((row) => row.data.status === 'draft')
        }
        return rows
    }, [data?.results, statusFilter])

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
