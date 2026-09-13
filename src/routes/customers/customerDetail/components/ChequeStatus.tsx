'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import { CHEQUE_STATUS_ITEMS } from '../constants/dashboard'

const ChequeStatus = () => {
    return (
        <div
            className="rounded-card-md border border-outline-variant bg-surface-container-lowest p-5"
            dir="rtl"
        >
            <h3 className="mb-4 text-title-md font-semibold text-on-surface">
                وضعیت چک‌ها
            </h3>

            <div className="flex flex-col">
                {CHEQUE_STATUS_ITEMS.map((item, index) => (
                    <div
                        key={item.id}
                        className={cn(
                            'flex items-center gap-3 py-3',
                            index < CHEQUE_STATUS_ITEMS.length - 1 &&
                            'border-b border-outline-variant/60'
                        )}
                    >
                        <div
                            className={cn(
                                'flex size-9 shrink-0 items-center justify-center rounded-[10px]',
                                item.iconBoxClassName
                            )}
                        >
                            <Icon
                                label={item.icon}
                                className={cn('size-5!', item.iconClassName)}
                            />
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="text-label-md font-semibold text-on-surface-variant">
                                {item.label}
                            </div>
                            <div className="mt-0.5 text-label-sm text-outline">
                                {formatFaNumber(item.count)} فقره
                            </div>
                        </div>

                        <div
                            className={cn(
                                'flex shrink-0 items-center gap-1 text-label-lg font-bold',
                                item.amountClassName
                            )}
                        >
                            <span>{formatFaNumber(item.amount)}</span>
                            <Icon
                                label="currency"
                                className={cn('size-5!', item.amountClassName)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChequeStatus
