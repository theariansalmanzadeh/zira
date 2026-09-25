'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { TransferCard } from '@/src/shared/components/ui/TransferCard'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import {
    WAREHOUSE_TRANSFER_DUMMY,
    WAREHOUSE_TRANSFER_TOGGLE,
    type WarehouseTransferFilter,
} from './constants'

const WarehouseTransferTracking = () => {
    const searchParams = useSearchParams()
    const rawFilter = searchParams.get('cat') ?? 'all'
    const statusFilter = (
        WAREHOUSE_TRANSFER_TOGGLE.some((item) => item.value === rawFilter)
            ? rawFilter
            : 'all'
    ) as WarehouseTransferFilter

    const filteredData = useMemo(() => {
        if (statusFilter === 'all') return WAREHOUSE_TRANSFER_DUMMY
        return WAREHOUSE_TRANSFER_DUMMY.filter(
            (item) => item.status === statusFilter
        )
    }, [statusFilter])

    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <div className='flex flex-row items-start gap-3 rounded-card-lg bg-info-container px-4 py-3'>
                <Icon
                    label='info400Linear'
                    className='mt-0.5 size-5! shrink-0 text-info'
                />
                <p className='text-label-md leading-6 text-on-info-container'>
                    انتقال‌های در جریان تا زمان قطعی شدن در این صفحه پیگیری
                    می‌شوند؛ منوی{' '}
                    <span className='font-semibold'>گردش کالا</span> فقط
                    فرآیندهای به‌اتمام‌رسیده و اسناد قطعی انبار را نمایش می‌دهد.
                </p>
            </div>

            <TableListLayout
                value={statusFilter}
                toggleButtonValue={[...WAREHOUSE_TRANSFER_TOGGLE]}
                hasFilter={false}
                hasSort={false}
                hasTableSettings={false}
                hasExpand={false}
                hasSearch={false}
            >
                <div className='flex flex-col gap-3'>
                    {filteredData.map((item) => (
                        <TransferCard
                            key={item.id}
                            data={item}
                            hasDetails={false}
                            detailHref={`/admin/branches/branch-transfer/${item.slug}`}
                        />
                    ))}
                </div>
            </TableListLayout>
        </div>
    )
}

export default WarehouseTransferTracking
