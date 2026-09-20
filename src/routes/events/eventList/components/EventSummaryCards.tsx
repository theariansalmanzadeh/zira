'use client'

import SummaryCard from '@/src/shared/components/ui/SummaryCard'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import type { EventSummaryCardItem } from '../constants'

type EventSummaryCardsProps = {
    items: EventSummaryCardItem[]
}

const EventSummaryCards = ({ items }: EventSummaryCardsProps) => {
    return (
        <div className='flex flex-row gap-3 overflow-x-auto' dir='rtl'>
            {items.map((item) => (
                <SummaryCard key={item.id} className='min-w-0 grow'>
                    <SummaryCard.Header>
                        <SummaryCard.HeaderIcon
                            label={item.icon}
                            className={item.iconClassName}
                        />
                    </SummaryCard.Header>
                    <SummaryCard.Body>
                        <SummaryCard.BodyTitle>{item.label}</SummaryCard.BodyTitle>
                        <SummaryCard.ValueRow>
                            <SummaryCard.Value>
                                {formatFaNumber(item.value)}
                            </SummaryCard.Value>
                        </SummaryCard.ValueRow>
                    </SummaryCard.Body>
                </SummaryCard>
            ))}
        </div>
    )
}

export default EventSummaryCards
