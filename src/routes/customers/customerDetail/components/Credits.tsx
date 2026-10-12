'use client'

import { useParams } from 'next/navigation'
import { ModalTypes } from '@/src/shared/components/modals/types'
import {
    useGetCustomerCreditPolicy,
    useGetCustomerProfile,
} from '@/src/routes/customers/hooks/customers'
import { useModalStore } from '@/src/shared/store/modal-store'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { displayValue } from '../display'
import {
    CREDIT_CARDS,
    type CreditCardItem,
} from '../constants/credits'
import CreditCard from './CreditCard'

const toAmount = (value?: string | number | null) => {
    if (value === undefined || value === null || value === '') return null
    const amount = Number(value)
    return Number.isFinite(amount) ? amount : null
}

const Credits = () => {
    const params = useParams<{ id: string }>()
    const customerId = params.id ?? ''
    const openModal = useModalStore((state) => state.openModal)
    const { data: profile } = useGetCustomerProfile(
        customerId,
        Boolean(customerId)
    )
    const profileChequeMonths = profile?.effective_max_cheque_maturity_months
    const profileGoldAmount = toAmount(profile?.effective_golden_credit_amount)
    const { data: policy } = useGetCustomerCreditPolicy(
        customerId,
        Boolean(customerId)
    )
    const [chequeTheme, goldTheme] = CREDIT_CARDS
    const cards: CreditCardItem[] = [
        {
            ...chequeTheme,
            levelLabel:
                profileChequeMonths !== undefined
                    ? `راس تا ${formatFaNumber(profileChequeMonths)} ماه`
                    : displayValue(
                          policy?.cheque_term_display || policy?.cheque_term_months
                      ),
            cap: toAmount(policy?.cheque_credit_limit),
            used: null,
            guarantee: '-',
        },
        {
            ...goldTheme,
            levelLabel: policy?.stepwise_increase
                ? 'افزایش پله‌ای فعال'
                : displayValue(policy?.golden_term_display),
            cap: profileGoldAmount ?? toAmount(policy?.golden_credit_limit),
            used: null,
            guarantee: '-',
        },
    ]

    const handleOpenChangeCredit = (card: CreditCardItem) => {
        openModal(ModalTypes.CUSTOMER_CHANGE_CREDIT, {
            customerId,
            cardId: card.id,
            cardTitle: card.title,
            currentCap: card.cap ?? undefined,
            expectedVersion: policy?.version ?? profile?.version,
        })
    }

    return (
        <div
            className="grid grid-cols-1 gap-4 lg:grid-cols-2"
            dir="rtl"
        >
            {cards.map((card) => (
                <CreditCard
                    key={card.id}
                    card={card}
                    onChangeCredit={() => handleOpenChangeCredit(card)}
                />
            ))}
        </div>
    )
}

export default Credits
