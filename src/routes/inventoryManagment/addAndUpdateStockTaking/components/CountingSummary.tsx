'use client'

import SummaryCard from '@/src/shared/components/ui/SummaryCard'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import {
    COUNTING_SUMMARY_CARDS,
    type CountingSummaryCardItem,
    type CountingSummaryCardTone,
} from '../constants'

const VALUE_TONE_CLASS: Record<CountingSummaryCardTone, string> = {
    default: 'text-on-surface',
    success: 'text-success',
    error: 'text-error',
    warning: 'text-warning',
}

type CountingSummaryProps = {
    items?: CountingSummaryCardItem[]
    className?: string
}

const CountingSummary = ({
    items = COUNTING_SUMMARY_CARDS,
    className,
}: CountingSummaryProps) => {
    return (
        <div
            className={cn(
                'grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4',
                className
            )}
            dir='rtl'
        >
            {items.map((item) => (
                <SummaryCard
                    key={item.id}
                    className='min-w-0 grow border border-outline-variant'
                >
                    <SummaryCard.Body className='mt-0'>
                        <SummaryCard.BodyTitle>
                            {item.label}
                        </SummaryCard.BodyTitle>
                        <SummaryCard.ValueRow>
                            <SummaryCard.Value
                                className={cn(
                                    'text-headline-md!',
                                    VALUE_TONE_CLASS[item.tone]
                                )}
                            >
                                {formatFaNumber(item.value)}
                            </SummaryCard.Value>
                        </SummaryCard.ValueRow>
                    </SummaryCard.Body>
                    <SummaryCard.Footer className='mt-3 w-full justify-start'>
                        <SummaryCard.FooterText className='mt-0 text-outline'>
                            {item.description}
                        </SummaryCard.FooterText>
                    </SummaryCard.Footer>
                </SummaryCard>
            ))}
        </div>
    )
}

export default CountingSummary
