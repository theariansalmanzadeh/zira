import SummaryCard from '@/src/shared/components/ui/SummaryCard'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import SummaryTrend from './SummaryTrend'

type SummaryStatsProps = {
    newCustomersPercent: number
    loyalCustomersPercent: number
    avgPaymentTimePercent: number
    avgOrderVolumePercent: number
    newCustomersNumber: number
    loyalCustomersNumber: number
    avgPaymentTimeNumber: number
    avgOrderVolumeNumber: number
}

const SummaryStats = ({
    newCustomersPercent,
    newCustomersNumber,
    loyalCustomersPercent,
    loyalCustomersNumber,
    avgPaymentTimePercent,
    avgPaymentTimeNumber,
    avgOrderVolumePercent,
    avgOrderVolumeNumber,
}: SummaryStatsProps) => {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard className="min-w-0 grow">
                <SummaryCard.Header>
                    <SummaryCard.HeaderIcon
                        label="customers400Linear"
                        className="rounded-card-sm bg-info-container p-1 text-info"
                    />
                </SummaryCard.Header>
                <SummaryCard.Body>
                    <SummaryCard.BodyTitle className="text-label-md text-outline">
                        مشتری جدید
                    </SummaryCard.BodyTitle>
                    <SummaryCard.ValueRow>
                        <SummaryCard.Value className="text-headline-lg! text-on-surface">
                            {formatFaNumber(newCustomersNumber)}
                        </SummaryCard.Value>
                        <SummaryCard.Suffix className="text-outline">
                            مشتری
                        </SummaryCard.Suffix>
                    </SummaryCard.ValueRow>
                </SummaryCard.Body>
                <SummaryCard.Footer>
                    <SummaryTrend value={newCustomersPercent} />
                </SummaryCard.Footer>
            </SummaryCard>

            <SummaryCard className="min-w-0 grow">
                <SummaryCard.Header>
                    <SummaryCard.HeaderIcon
                        label="suppliers400Linear"
                        className="rounded-card-sm bg-success-container p-1 text-success"
                    />
                </SummaryCard.Header>
                <SummaryCard.Body>
                    <SummaryCard.BodyTitle className="text-label-md text-outline">
                        مشتری وفادار
                    </SummaryCard.BodyTitle>
                    <SummaryCard.ValueRow>
                        <SummaryCard.Value className="text-headline-lg! text-on-surface">
                            {formatFaNumber(loyalCustomersNumber)}
                        </SummaryCard.Value>
                        <SummaryCard.Suffix className="text-outline">
                            مشتری
                        </SummaryCard.Suffix>
                    </SummaryCard.ValueRow>
                </SummaryCard.Body>
                <SummaryCard.Footer>
                    <SummaryTrend value={loyalCustomersPercent} />
                </SummaryCard.Footer>
            </SummaryCard>

            <SummaryCard className="min-w-0 grow">
                <SummaryCard.Header>
                    <SummaryCard.HeaderIcon
                        label="loan400Linear"
                        className="rounded-card-sm bg-surface-container-high p-1 text-on-surface-variant"
                    />
                </SummaryCard.Header>
                <SummaryCard.Body>
                    <SummaryCard.BodyTitle className="text-label-md text-outline">
                        میانگین زمان پرداختی
                    </SummaryCard.BodyTitle>
                    <SummaryCard.ValueRow>
                        <SummaryCard.Value className="text-headline-lg! text-on-surface">
                            {formatFaNumber(avgPaymentTimeNumber)}
                        </SummaryCard.Value>
                        <SummaryCard.Suffix className="text-outline">
                            روز
                        </SummaryCard.Suffix>
                    </SummaryCard.ValueRow>
                </SummaryCard.Body>
                <SummaryCard.Footer>
                    <SummaryTrend value={avgPaymentTimePercent} />
                </SummaryCard.Footer>
            </SummaryCard>

            <SummaryCard className="min-w-0 grow">
                <SummaryCard.Header>
                    <SummaryCard.HeaderIcon
                        label="analytics"
                        className="rounded-card-sm bg-primary-container p-1 text-primary"
                    />
                </SummaryCard.Header>
                <SummaryCard.Body>
                    <SummaryCard.BodyTitle className="text-label-md text-outline">
                        میانگین حجم سفارش
                    </SummaryCard.BodyTitle>
                    <SummaryCard.ValueRow>
                        <SummaryCard.Value className="text-headline-lg! text-on-surface">
                            {formatPrice(avgOrderVolumeNumber)}
                        </SummaryCard.Value>
                        <SummaryCard.Suffix className="text-outline">
                            تومان
                        </SummaryCard.Suffix>
                    </SummaryCard.ValueRow>
                </SummaryCard.Body>
                <SummaryCard.Footer>
                    <SummaryTrend value={avgOrderVolumePercent} />
                </SummaryCard.Footer>
            </SummaryCard>
        </div>
    )
}

export default SummaryStats
