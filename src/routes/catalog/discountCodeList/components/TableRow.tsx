'use client'

import { toast } from 'sonner'
import {
    useDisableCoupon,
    useEnableCoupon,
} from '@/src/routes/catalog/hooks/pricing'
import { Pill } from '@/src/shared/components/ui/Pill'
import { Switch } from '@/src/shared/components/ui/Switch'
import {
    TableCell,
    TableRow as UiTableRow,
} from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaDate } from '@/src/shared/libs/formatter'

export interface DiscountRowProps {
    data: {
        id: string
        title: string
        contractId: string
        date: string
        scope: string
        discountPercent: string
        startDate: string
        endDate: string
        remainingDays: string
        enabled: boolean
        status?: 'valid' | 'invalid' | 'draft'
    }
}

const TableRow = ({
    data: {
        id,
        title,
        contractId,
        date,
        scope,
        status,
        startDate,
        endDate,
        remainingDays,
        enabled,
    },
}: DiscountRowProps) => {
    const { TableColoumn } = useTable()
    const { mutate: enableCoupon, isPending: isEnabling } = useEnableCoupon()
    const { mutate: disableCoupon, isPending: isDisabling } = useDisableCoupon()
    const isPending = isEnabling || isDisabling

    const handleToggle = (checked: boolean) => {
        if (checked) {
            enableCoupon(
                { couponId: id },
                {
                    onSuccess: () => toast.success('کد تخفیف فعال شد'),
                    onError: () => toast.error('فعال‌سازی کد تخفیف انجام نشد'),
                }
            )
            return
        }

        disableCoupon(
            { couponId: id },
            {
                onSuccess: () => toast.success('کد تخفیف غیرفعال شد'),
                onError: () => toast.error('غیرفعال‌سازی کد تخفیف انجام نشد'),
            }
        )
    }

    return (
        <>
            <UiTableRow className='*:text-label-lg *:font-normal *:text-on-surface-variant!'>
                {TableColoumn[0]?.isChecked && <TableCell>{title}</TableCell>}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>{contractId}</TableCell>
                )}
                {TableColoumn[2]?.isChecked && <TableCell>{date}</TableCell>}
                {TableColoumn[3]?.isChecked && <TableCell>{scope}</TableCell>}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>
                        {startDate ? formatFaDate(startDate) : '—'}
                    </TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>
                        {endDate ? formatFaDate(endDate) : '—'}
                    </TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell>{remainingDays}</TableCell>
                )}
                {TableColoumn[7]?.isChecked && (
                    <TableCell>
                        <Pill
                            variant={
                                status === 'valid'
                                    ? 'success'
                                    : status === 'invalid'
                                      ? 'error'
                                      : 'warning'
                            }
                            text={
                                status === 'valid'
                                    ? 'معتبر'
                                    : status === 'invalid'
                                      ? 'نامعتبر'
                                      : 'پیش‌نویس'
                            }
                            hasDot
                        />
                    </TableCell>
                )}
                {TableColoumn[8]?.isChecked && (
                    <TableCell className='w-[1%] whitespace-nowrap'>
                        <Switch
                            checked={enabled}
                            disabled={isPending}
                            onCheckedChange={handleToggle}
                        />
                    </TableCell>
                )}
            </UiTableRow>
            <div className='py-1' />
        </>
    )
}

export default TableRow
