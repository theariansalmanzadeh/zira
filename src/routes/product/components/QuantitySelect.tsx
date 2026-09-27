'use client'

import Link from 'next/link'
import { Button } from '@/src/shared/components/ui/button'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { formatFaNumber } from '@/src/shared/libs/formatter'

type QuantitySelectProps = {
    quantity: number
    onIncrement: () => void
    onRemove: () => void
    cartHref?: string
}

const QuantitySelect = ({
    quantity,
    onIncrement,
    onRemove,
    cartHref = '/cart',
}: QuantitySelectProps) => {
    return (
        <div className="flex flex-col items-center gap-4" dir="rtl">
            <div className="flex items-center justify-center gap-6" dir="ltr">
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-12 shrink-0 border-primary"
                    aria-label="حذف از سبد خرید"
                    onClick={onRemove}
                >
                    <Icon
                        label="delete400Linear"
                        className="size-5! text-primary"
                    />
                </Button>
                <span className="min-w-6 text-center text-xl font-bold text-on-surface">
                    {formatFaNumber(quantity)}
                </span>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-12 shrink-0 border-primary"
                    aria-label="افزایش تعداد"
                    onClick={onIncrement}
                >
                    <Icon
                        label="addSm400Linear"
                        className="size-5! text-primary"
                    />
                </Button>
            </div>
            <Link
                href={cartHref}
                className="inline-flex flex-row-reverse items-center gap-1 text-sm font-semibold text-primary"
            >
                <Icon
                    label="chevronLeft400Linear"
                    className="size-4! text-primary"
                />
                مشاهده سبد خرید
            </Link>
        </div>
    )
}

export default QuantitySelect
