"use client"

import QuickAccessCard from '@/src/shared/components/quickAccessCard'
import AlertBox, {
    AlertBoxContent,
    AlertBoxFooter,
    AlertBoxHeader,
    AlertBoxItem,
    AlertBoxList,
} from '@shared/components/ui/AlertBox'
import { Card } from '@shared/components/ui/Card'
import MonthlySalesChart from './components/MonthlySalesChart'
import {
    QUICK_ACCESS_ITEMS,
    SALES_SUMMARY_CARDS,
    TOP_PRODUCTS,
    TOP_SELLERS,
    URGENT_ACTIONS,
} from './constants'
import SummaryCard from '@/src/shared/components/ui/SummaryCard'
import RankingCard from '@/src/shared/components/ui/RankingCard'

const SalesDashboard = () => {
    return (
        <div className='grid grid-cols-12 gap-3' dir='rtl'>
            <div className='col-span-12 flex flex-row gap-3'>
                {SALES_SUMMARY_CARDS.map((card) => (
                    <SummaryCard key={card.bodyTitle} className='grow'>
                        <SummaryCard.Header>
                            <SummaryCard.HeaderIcon
                                label={card.icon}
                                className={card.iconClassName}
                            />
                        </SummaryCard.Header>
                        <SummaryCard.Body>
                            <SummaryCard.BodyTitle>{card.bodyTitle}</SummaryCard.BodyTitle>
                            <SummaryCard.ValueRow>
                                <SummaryCard.Value className='text-display-sm! font-semibold!'>
                                    100
                                </SummaryCard.Value>
                            </SummaryCard.ValueRow>
                        </SummaryCard.Body>
                        <SummaryCard.Footer>
                            <SummaryCard.FooterIcon
                                label="warning300Linear"
                                iconClassName="text-error"
                            />
                            <SummaryCard.FooterText>100%</SummaryCard.FooterText>
                        </SummaryCard.Footer>
                    </SummaryCard>
                ))}
            </div>
            <div className='col-span-12 lg:col-span-8 row-start-2'>
                <Card className='rounded-card-lg bg-surface-container-lowest p-3 shadow-none gap-4 h-full'>
                    <MonthlySalesChart />
                </Card>
            </div>
            <div className='col-span-12 lg:col-span-4 row-start-2'>
                <AlertBox className='h-full'>
                    <AlertBoxHeader>
                        <span className='text-title-md font-medium text-on-surface'>اقدام فوری</span>
                    </AlertBoxHeader>
                    <AlertBoxContent>
                        <AlertBoxList>
                            {URGENT_ACTIONS.map((action, index) => (
                                <AlertBoxItem
                                    key={index}
                                    title={action.title}
                                    description={action.description}
                                />
                            ))}
                        </AlertBoxList>
                    </AlertBoxContent>
                    <AlertBoxFooter href='/admin/sales?sub=alerts'>
                        مشاهده همه هشدارها
                    </AlertBoxFooter>
                </AlertBox>
            </div>

            <div className='col-span-12 lg:col-span-6'>
                <RankingCard
                    title='برترین فروشندگان'
                    items={TOP_SELLERS}
                    reportHref='/admin/sales?sub=top-sellers'
                />
            </div>

            <div className='col-span-12 lg:col-span-6'>
                <RankingCard
                    title='پرفروش‌ترین کالاها'
                    items={TOP_PRODUCTS}
                    reportHref='/admin/sales?sub=top-products'
                />
            </div>
            <div className='col-span-12'>
                <QuickAccessCard>
                    <QuickAccessCard.Header>دسترسی سریع</QuickAccessCard.Header>
                    <QuickAccessCard.Content>
                        <QuickAccessCard.List>
                            {QUICK_ACCESS_ITEMS.map((item) => (
                                <QuickAccessCard.Item
                                    key={item.label}
                                    label={item.label}
                                    value={item.value}
                                    href={item.href}
                                />
                            ))}
                        </QuickAccessCard.List>
                    </QuickAccessCard.Content>
                </QuickAccessCard>
            </div>
        </div>
    )
}

export default SalesDashboard
