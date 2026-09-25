'use client'

import { useMemo } from 'react'
import SummaryCard from '@/src/shared/components/ui/SummaryCard'
import { randomColorGenerator } from '@/src/shared/libs/color'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@/src/shared/libs/utils'
import {
    BEST_SELLERS_DUMMY,
    FOOTER_TONE_CLASS,
    REPORT_SUMMARY_CARDS,
} from '../constants'

const ReportResults = () => {
    const bestSellers = useMemo(
        () =>
            BEST_SELLERS_DUMMY.map((item) => ({
                ...item,
                color: randomColorGenerator(),
            })),
        []
    )

    return (
        <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3'>
                {REPORT_SUMMARY_CARDS.map((card) => (
                    <SummaryCard
                        key={card.id}
                        className='min-w-0 grow border border-outline-variant'
                    >
                        <SummaryCard.Header>
                            <SummaryCard.HeaderIcon
                                label={card.icon}
                                className={card.iconClassName}
                                iconClassName='size-6!'
                            />
                            <SummaryCard.Title>{card.title}</SummaryCard.Title>
                        </SummaryCard.Header>
                        <SummaryCard.Body>
                            <SummaryCard.ValueRow>
                                <SummaryCard.Value className='text-headline-lg! text-on-surface!'>
                                    {card.value}
                                </SummaryCard.Value>
                                {card.suffix ? (
                                    <SummaryCard.Suffix className='text-outline'>
                                        {card.suffix}
                                    </SummaryCard.Suffix>
                                ) : null}
                            </SummaryCard.ValueRow>
                        </SummaryCard.Body>
                        <SummaryCard.Footer>
                            <SummaryCard.FooterText
                                className={cn(
                                    'mt-0',
                                    FOOTER_TONE_CLASS[card.footerTone]
                                )}
                            >
                                {card.footerText}
                            </SummaryCard.FooterText>
                        </SummaryCard.Footer>
                    </SummaryCard>
                ))}
            </div>

            <SummaryCard className='min-w-0 w-full border border-outline-variant'>
                <SummaryCard.Header className='w-full justify-end'>
                    <SummaryCard.Title className='text-title-md font-bold text-on-surface'>
                        محصولات پرفروش — شعبه مرکزی تهران
                    </SummaryCard.Title>
                </SummaryCard.Header>
                <SummaryCard.Body className='mt-4 w-full items-stretch'>
                    <div className='flex w-full flex-col'>
                        {bestSellers.map((item, index) => (
                            <div
                                key={item.id}
                                className={cn(
                                    'flex flex-row items-center gap-3 py-3',
                                    index < bestSellers.length - 1 &&
                                        'border-b border-outline-variant'
                                )}
                            >
                                <span
                                    className={cn(
                                        'flex size-7 shrink-0 items-center justify-center rounded-card-sm text-label-md font-semibold',
                                        item.rank === 1
                                            ? 'bg-error-container text-on-error-container'
                                            : 'bg-surface-container-highest text-on-surface-variant'
                                    )}
                                >
                                    {formatFaNumber(item.rank)}
                                </span>
                                <span
                                    className={cn(
                                        'flex size-10 shrink-0 items-center justify-center rounded-card-sm text-label-md font-semibold',
                                        item.color.className
                                    )}
                                >
                                    {item.badgeLetter}
                                </span>
                                <div className='flex min-w-0 flex-1 flex-col gap-0.5 text-right'>
                                    <span className='truncate font-medium text-on-surface'>
                                        {item.name}
                                    </span>
                                    <span className='text-label-md text-outline'>
                                        {formatFaNumber(item.salesCount)} فروش
                                    </span>
                                </div>
                                <span className='shrink-0 text-label-lg font-semibold text-primary'>
                                    {formatFaNumber(item.amountMillion)} م
                                </span>
                            </div>
                        ))}
                    </div>
                </SummaryCard.Body>
            </SummaryCard>
        </div>
    )
}

export default ReportResults
