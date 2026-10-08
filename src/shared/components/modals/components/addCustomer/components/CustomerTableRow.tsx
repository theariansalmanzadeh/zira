'use client'

import { useMemo } from 'react'
import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import { Pill } from '@/src/shared/components/ui/Pill'
import { TableCell, TableRow } from '@/src/shared/components/ui/Table'
import { randomColorGenerator } from '@/src/shared/libs/color'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import { cn } from '@/src/shared/libs/utils'
import { LEVEL_CONFIG, type AddCustomerRow } from '../constants'

type CustomerTableRowProps = {
    customer: AddCustomerRow
    checked: boolean
    onToggle: (id: string) => void
}

const CustomerTableRow = ({
    customer,
    checked,
    onToggle,
}: CustomerTableRowProps) => {
    const levelConfig = LEVEL_CONFIG[customer.level]
    const avatarColor = useMemo(
        () => randomColorGenerator(),
        [customer.name]
    )

    return (
        <TableRow className="[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant">
            <TableCell className="w-[48px]">
                <Checkbox
                    className="size-6! overflow-hidden mr-4"
                    checked={checked}
                    onCheckedChange={() => onToggle(customer.id)}
                />
            </TableCell>
            <TableCell>
                <div className="flex flex-row items-center gap-3">
                    <div
                        className={cn(
                            'flex size-10 shrink-0 items-center justify-center rounded-full text-label-lg font-medium',
                            avatarColor.className
                        )}
                    >
                        {customer.name.charAt(0)}
                    </div>
                    <span className="text-label-lg font-semibold text-on-surface">
                        {customer.name}
                    </span>
                </div>
            </TableCell>
            <TableCell className="text-outline">{customer.id}</TableCell>
            <TableCell>
                <Pill
                    className="border-0"
                    variant={levelConfig.variant}
                    text={levelConfig.text}
                    hasDot
                />
            </TableCell>
            <TableCell className="text-success">
                {formatPrice(customer.credit)}
            </TableCell>
            <TableCell className="text-right text-outline" dir="ltr">
                {formatFaNumber(customer.phone)}
            </TableCell>
        </TableRow>
    )
}

export default CustomerTableRow
