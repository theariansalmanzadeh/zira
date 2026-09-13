'use client'

import SummaryCard from '@/src/shared/components/ui/SummaryCard'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { CONTENT_SUMMARY_CARDS } from './constants'
import RecentActivities from './components/RecentActivities'

const ContentDashboard = () => (
    <div className="flex flex-col gap-3.5" dir="rtl">
        <h2 className="text-title-md font-semibold text-on-surface">
            خلاصه محتوا
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {CONTENT_SUMMARY_CARDS.map((card) => (
                <SummaryCard
                    key={card.id}
                    className="min-w-0 grow border border-outline-variant"
                >
                    <SummaryCard.Header>
                        <SummaryCard.HeaderIcon
                            label={card.icon}
                            className={card.iconContainerClassName}
                            iconClassName={card.iconClassName}
                        />
                    </SummaryCard.Header>

                    <SummaryCard.Body>
                        <SummaryCard.ValueRow>
                            <SummaryCard.Value className="text-headline-lg! text-on-surface">
                                {formatFaNumber(card.value)}
                            </SummaryCard.Value>
                            <SummaryCard.Suffix className="text-outline">
                                {card.suffix}
                            </SummaryCard.Suffix>
                        </SummaryCard.ValueRow>
                        <SummaryCard.BodyTitle className="mt-1 text-label-md text-outline">
                            {card.title}
                        </SummaryCard.BodyTitle>
                    </SummaryCard.Body>
                </SummaryCard>
            ))}
        </div>

        <RecentActivities />
    </div>
)

export default ContentDashboard
