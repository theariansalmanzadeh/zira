'use client'

import { useParams } from 'next/navigation'
import type {
    CreditAccountStatus,
    CreditAccountSummary,
} from '@/src/api/types/admin/customerDetails'
import { useGetCustomerCreditSummary } from '@/src/routes/customers/hooks/customerDetails'
import { useGetCustomerProfile } from '@/src/routes/customers/hooks/customers'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { Button } from '@/src/shared/components/ui/button'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { useModalStore } from '@/src/shared/store/modal-store'
import {
    CREDIT_CARDS,
    type CreditCardItem,
} from '../constants/credits'
import CreditCard from './CreditCard'
import GuaranteesList from './GuaranteesList'

const CREDIT_TYPE_ORDER = ['CHEQUE', 'GOLDEN'] as const

const STATUS_LABEL: Record<CreditAccountStatus, string> = {
    ACTIVE: 'فعال',
    SUSPENDED: 'معلق',
    FROZEN: 'مسدود',
    CLOSED: 'بسته',
}

const toAmount = (value?: string | number | null) => {
    if (value === undefined || value === null || value === '') return null
    const amount = Number(value)
    return Number.isFinite(amount) ? amount : null
}

const toCreditCard = (account: CreditAccountSummary): CreditCardItem | null => {
    const theme =
        account.credit_type === 'CHEQUE'
            ? CREDIT_CARDS[0]
            : account.credit_type === 'GOLDEN'
              ? CREDIT_CARDS[1]
              : null
    if (!theme) return null

    const termLabel = `راس تا ${formatFaNumber(account.term_months)} ماه`
    const statusLabel = STATUS_LABEL[account.status]
    const levelLabel =
        account.credit_type === 'GOLDEN' && account.stepwise_increase
            ? `افزایش پله‌ای فعال · ${statusLabel}`
            : `${termLabel} · ${statusLabel}`
    const pending = account.pending_change_request
    const pendingAmount = toAmount(pending?.amount)

    return {
        ...theme,
        levelLabel,
        cap: toAmount(account.credit_limit),
        used: null,
        guarantee:
            pending && pendingAmount !== null
                ? `درخواست ${pending.direction === 'INCREASE' ? 'افزایش' : 'کاهش'} در انتظار: ${formatFaNumber(pendingAmount)} تومان`
                : '-',
    }
}

const Credits = () => {
    const params = useParams<{ id: string }>()
    const openModal = useModalStore((state) => state.openModal)
    const customerId = params.id ?? ''
    const { data: profile } = useGetCustomerProfile(
        customerId,
        Boolean(customerId)
    )
    const { data: credit } = useGetCustomerCreditSummary(
        customerId,
        Boolean(customerId)
    )
    const cards = (credit?.credit_accounts ?? [])
        .slice()
        .sort(
            (a, b) =>
                CREDIT_TYPE_ORDER.indexOf(a.credit_type) -
                CREDIT_TYPE_ORDER.indexOf(b.credit_type)
        )
        .map(toCreditCard)
        .filter((card): card is CreditCardItem => card !== null)

    return (
        <div className="flex flex-col gap-4" dir="rtl">
            <div className="flex justify-end">
                <Button
                    type="button"
                    variant="primary"
                    onClick={() =>
                        openModal(ModalTypes.NEW_CREDIT, {
                            customerId,
                            tier: profile?.verification_level,
                        })
                    }
                >
                    حساب اعتباری جدید
                </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {cards.map((card) => (
                    <CreditCard key={card.id} card={card} />
                ))}
                <GuaranteesList customerId={customerId} />
            </div>
        </div>
    )
}

export default Credits
