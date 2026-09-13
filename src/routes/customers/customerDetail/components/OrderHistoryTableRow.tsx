'use client'

import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill } from '@/src/shared/components/ui/Pill'
import {
    TableCell,
    TableRow as UiTableRow,
} from '@/src/shared/components/ui/Table'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useModalStore } from '@/src/shared/store/modal-store'
import { formatFaNumber, formatFaDate } from '@/src/shared/libs/formatter'
import { formatOrderAmount } from '../constants/orderHistory'

export type OrderSettlementMethod = 'cash' | 'cheque'

export type OrderHistoryRowData = {
    id: string
    row: number
    registeredAt: string
    totalAmount: number
    settledAt: string
    settlementMethod: OrderSettlementMethod
}

const SETTLEMENT_CONFIG: Record<
    OrderSettlementMethod,
    { text: string; variant: 'success' | 'info' }
> = {
    cash: { text: 'نقدی', variant: 'success' },
    cheque: { text: 'چکی', variant: 'info' },
}

type OrderHistoryTableRowProps = {
    data: OrderHistoryRowData
}

const OrderHistoryTableRow = ({ data }: OrderHistoryTableRowProps) => {
    const openModal = useModalStore((state) => state.openModal)
    const settlement = SETTLEMENT_CONFIG[data.settlementMethod]

    return (
        <UiTableRow className="border-b border-outline-variant/60 hover:bg-surface-container-high/40 [&>*]:text-label-md [&>*]:font-normal [&>*]:text-on-surface-variant">
            <TableCell className="text-outline">
                {formatFaNumber(data.row)}
            </TableCell>
            <TableCell>
                <span dir="ltr">{formatFaDate(data.registeredAt)}</span>
            </TableCell>
            <TableCell className="font-bold text-on-surface">
                {formatOrderAmount(data.totalAmount)}
            </TableCell>
            <TableCell>
                <span dir="ltr">{formatFaDate(data.settledAt)}</span>
            </TableCell>
            <TableCell>
                <Pill
                    className="border-0"
                    variant={settlement.variant}
                    text={settlement.text}
                />
            </TableCell>
            <TableCell className="text-center">
                <IconButton
                    icon="fileNew400Linear"
                    variant="ghost"
                    className="mx-auto size-8!"
                    iconClassName="size-4! text-outline"
                    onClick={() => openModal(ModalTypes.SELL_INVOICE)}
                />
            </TableCell>
        </UiTableRow>
    )
}

export default OrderHistoryTableRow
