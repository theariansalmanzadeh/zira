'use client'

import { useParams } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { Button } from '@/src/shared/components/ui/button'
import { Progress } from '@/src/shared/components/ui/ProgressBar'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { useModalStore } from '@/src/shared/store/modal-store'
import { cn } from '@shared/libs/utils'
import type { CreditCardItem } from '../constants/credits'
import CreditAmount from './CreditAmount'

type CreditCardProps = {
    card: CreditCardItem
}

const CreditCard = ({ card }: CreditCardProps) => {
    const params = useParams<{ id: string }>()
    const customerId = params.id ?? ''
    const openModal = useModalStore((state) => state.openModal)
    const remain =
        card.cap === null || card.used === null ? null : card.cap - card.used
    const usedPercent =
        card.cap && card.used !== null
            ? Math.round((card.used / card.cap) * 100)
            : null

    return (
        <div className="overflow-hidden rounded-card-md border border-outline-variant bg-surface-container-lowest">
            <div
                className="flex items-center justify-between gap-3 px-5 py-4"
                style={{ backgroundColor: card.theme.headBg }}
            >
                <div className="flex min-w-0 items-center gap-2.5">
                    <div
                        className={cn(
                            'flex size-9.5 shrink-0 items-center justify-center rounded-[11px] bg-white',
                            card.theme.iconClassName
                        )}
                    >
                        <Icon label={card.icon} className="size-5!" />
                    </div>
                    <span
                        className={cn(
                            'text-title-sm font-semibold',
                            card.theme.titleClassName
                        )}
                    >
                        {card.title}
                    </span>
                </div>
                <span
                    className={cn(
                        'shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-bold',
                        card.theme.badgeClassName
                    )}
                >
                    {card.levelLabel}
                </span>
            </div>

            <div className="px-5 py-4.5">
                <div className="flex items-center justify-between py-1.5 text-label-md">
                    <span className="text-outline">سقف اعتبار</span>
                    <CreditAmount
                        value={card.cap}
                        className="text-on-surface-variant"
                    />
                </div>
                <div className="flex items-center justify-between py-1.5 text-label-md">
                    <span className="text-outline">اعتبار مصرف‌شده</span>
                    <CreditAmount
                        value={card.used}
                        className="font-semibold text-[#C8841A]"
                    />
                </div>
                <div className="mb-3 flex items-center justify-between border-b border-outline-variant/50 py-1.5 pb-3 text-label-md">
                    <span className="text-outline">مانده اعتبار</span>
                    <CreditAmount value={remain} className="text-success" />
                </div>

                <Progress
                    value={usedPercent ?? 0}
                    className="mb-2 h-2 rounded-md bg-surface-container-highest"
                    indicatorClassName={cn(
                        'rounded-md',
                        card.theme.progressClassName
                    )}
                />
                <div className="mb-3.5 text-label-sm text-outline">
                    {usedPercent === null
                        ? '-'
                        : `${formatFaNumber(usedPercent)}٪ مصرف‌شده`}
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        className={cn('flex-1', card.theme.increaseClassName)}
                        onClick={() =>
                            openModal(ModalTypes.CUSTOMER_CHANGE_CREDIT, {
                                customerId,
                                cardId: card.id,
                                cardTitle: card.title,
                                currentCap: card.cap ?? undefined,
                            })
                        }
                    >
                        تغییر اعتبار
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        title="تاریخچه اعتبار"
                        className="shrink-0 text-outline"
                    >
                        <Icon label="history300Linear" className="size-4.5!" />
                    </Button>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-outline">
                    <Icon
                        label="shield300Linear"
                        className="size-3.5! shrink-0 text-[#A9744B]"
                    />
                    <span>{card.guarantee}</span>
                </div>
            </div>
        </div>
    )
}

export default CreditCard
