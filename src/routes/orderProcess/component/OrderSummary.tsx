import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { cn } from '@shared/libs/utils'
import { useOrderProcess } from '../provider/OrderProvider'

export type OrderSummaryData = {
    itemsPriceLabel: string
    itemsPrice: string
    itemsCountLabel: string
    itemsCount: string
    shippingLabel: string
    shippingValue: string
    payableAmount: string
}

type SummaryRowProps = {
    label: string
    value: string
}

const SummaryRow = ({ label, value }: SummaryRowProps) => {
    return (
        <div className="flex flex-row items-center justify-between gap-3">
            <span className="text-label-md text-outline">{label}</span>
            <span className="text-label-md text-on-surface">{value}</span>
        </div>
    )
}

type OrderSummaryProps = {
    data?: OrderSummaryData
    onConfirm?: () => void
    className?: string
}

const DEFAULT_SUMMARY: OrderSummaryData = {
    itemsPriceLabel: 'قیمت کالاها (5)',
    itemsPrice: '- تومان',
    itemsCountLabel: 'تعداد اقلام',
    itemsCount: '5 ردیف / 360 قلم',
    shippingLabel: 'هزینه بسته‌بندی و ارسال',
    shippingValue: 'وابسته به نوع ارسال',
    payableAmount: '- تومان',
}

const OrderSummary = ({
    data = DEFAULT_SUMMARY,
    className,
}: OrderSummaryProps) => {
    const { setActiveStep } = useOrderProcess()
    return (
        <div className={cn('flex flex-col gap-3', className)} dir="rtl">
            <div className="flex flex-col gap-4 rounded-card-lg bg-surface-container-lowest p-6">
                <SummaryRow
                    label={data.itemsPriceLabel}
                    value={data.itemsPrice}
                />
                <SummaryRow
                    label={data.itemsCountLabel}
                    value={data.itemsCount}
                />
                <SummaryRow
                    label={data.shippingLabel}
                    value={data.shippingValue}
                />

                <div className="border-t border-dashed border-outline-variant" />

                <div className="flex flex-row items-center justify-between gap-3">
                    <span className="text-label-lg font-medium text-on-surface">
                        مبلغ قابل پرداخت:
                    </span>
                    <span className="text-label-lg font-medium text-on-surface">
                        {data.payableAmount}
                    </span>
                </div>

                <Button
                    variant="primary"
                    className="w-full rounded-button-lg py-3"
                    onClick={() => setActiveStep('address')}
                >
                    <span className="text-label-lg text-on-primary">
                        تایید و تکمیل سفارش
                    </span>
                    <Icon
                        label="chevronLeft400Linear"
                        className="size-5! text-on-primary"
                    />
                </Button>
            </div>

            <p className="text-center text-label-sm text-outline">
                افزودن کالا به سبد خرید به معنی رزرو آن نیست.
            </p>
        </div>
    )
}

export default OrderSummary
