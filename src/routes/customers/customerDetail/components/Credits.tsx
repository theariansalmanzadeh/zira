'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { Progress } from '@/src/shared/components/ui/ProgressBar'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import {
    CREDIT_CARDS,
    type CreditCardItem,
} from '../constants/credits'

const CreditAmount = ({
    value,
    className,
}: {
    value: number
    className?: string
}) => (
    <span className={cn('inline-flex items-center gap-0.5 font-bold', className)}>
        <span>{formatFaNumber(value)}</span>
        <Icon label="currency" className={cn('size-4!', className)} />
    </span>
)

const CreditCard = ({ card }: { card: CreditCardItem }) => {
    const remain = card.cap - card.used
    const usedPercent = Math.round((card.used / card.cap) * 100)

    return (
        <div className="overflow-hidden rounded-card-md border border-outline-variant bg-surface-container-lowest">
            <div
                className="flex items-center justify-between gap-3 px-5 py-4"
                style={{ backgroundColor: card.theme.headBg }}
            >
                <div className="flex min-w-0 items-center gap-2.5">
                    <div
                        className={cn(
                            'flex size-[38px] shrink-0 items-center justify-center rounded-[11px] bg-white',
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
                    value={usedPercent}
                    className="mb-2 h-2 rounded-md bg-surface-container-highest"
                    indicatorClassName={cn(
                        'rounded-md',
                        card.theme.progressClassName
                    )}
                />
                <div className="mb-3.5 text-label-sm text-outline">
                    {formatFaNumber(usedPercent)}٪ مصرف‌شده
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        className={cn('flex-1', card.theme.increaseClassName)}
                    >
                        <span className="text-base leading-none">+</span>
                        افزایش
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                    >
                        <span className="text-base leading-none">−</span>
                        کاهش
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

const Credits = () => {
    return (
        <div
            className="grid grid-cols-1 gap-4 lg:grid-cols-2"
            dir="rtl"
        >
            {CREDIT_CARDS.map((card) => (
                <CreditCard key={card.id} card={card} />
            ))}
        </div>
    )
}

export default Credits
