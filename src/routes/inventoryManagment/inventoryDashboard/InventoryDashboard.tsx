import AlertBox, {
    AlertBoxContent,
    AlertBoxFooter,
    AlertBoxHeader,
    AlertBoxItem,
    AlertBoxList,
} from '@shared/components/ui/AlertBox'
import { Card } from '@shared/components/ui/Card'
import SummaryCard from '@/src/shared/components/ui/SummaryCard'
import StockFlowChart from './components/StockFlowChart'
import {
    INVENTORY_ALERTS,
    INVENTORY_SUMMARY_CARDS,
    QUICK_ACCESS_ITEMS,
} from './constants'
import RankingCard from '@/src/shared/components/ui/RankingCard'
import QuickAccessCard from '@/src/shared/components/quickAccessCard'
import TransferSummary from './components/TransferSummary'

const INVENTORY_RANKING_ITEMS = [
    {
        title: 'انبار 1',
        label: 'انبار 1',
        value: 100,
        suffix: 'موجودی',
        percent: 10,
    },
    {
        title: 'انبار 2',
        label: 'انبار 2',
        value: 200,
        suffix: 'موجودی',
        percent: 34,
    },
]

const InventoryDashboard = () => {
    return (
        <div className="grid grid-cols-12 gap-3" dir="rtl">
            <span className="col-span-12 text-label-lg text-outline">
                داشبورد انبار
            </span>

            <div className="col-span-12 flex flex-row gap-3 overflow-x-auto">
                {INVENTORY_SUMMARY_CARDS.map((card) => (
                    <SummaryCard key={card.title} className="grow">
                        <SummaryCard.Header>
                            <SummaryCard.HeaderIcon
                                label={card.icon}
                                className={card.iconClassName}
                            />
                        </SummaryCard.Header>
                        <SummaryCard.Body>
                            <SummaryCard.BodyTitle className="text-label-md text-outline">
                                {card.title}
                            </SummaryCard.BodyTitle>
                            <SummaryCard.ValueRow>
                                <SummaryCard.Value className='text-headline-lg! text-on-surface!'>{card.value}</SummaryCard.Value>
                                <SummaryCard.Suffix className='text-outline'>{card.suffix}</SummaryCard.Suffix>
                            </SummaryCard.ValueRow>
                        </SummaryCard.Body>
                        <SummaryCard.Footer>
                            <SummaryCard.FooterIcon
                                label={card.footerIcon}
                                iconClassName={card.footerIconClassName}
                            />
                            <SummaryCard.FooterText
                                className={card.footerTextClassName}
                            >
                                {card.footerText}
                            </SummaryCard.FooterText>
                        </SummaryCard.Footer>
                    </SummaryCard>
                ))}
            </div>

            <div className="col-span-12 row-start-3 lg:col-span-8">
                <Card className="h-full gap-4 rounded-card-lg bg-surface-container-lowest p-3 shadow-none">
                    <StockFlowChart />
                </Card>
            </div>

            <div className="col-span-12 row-start-3 lg:col-span-4">
                <AlertBox className="h-full">
                    <AlertBoxHeader>
                        <span className="text-title-md font-medium text-on-surface">
                            هشدارها
                        </span>
                    </AlertBoxHeader>
                    <AlertBoxContent>
                        <AlertBoxList>
                            {INVENTORY_ALERTS.map((alert, index) => (
                                <AlertBoxItem
                                    key={index}
                                    title={alert.title}
                                    description={alert.description}
                                />
                            ))}
                        </AlertBoxList>
                    </AlertBoxContent>
                    <AlertBoxFooter href="/admin/inventory-managment?sub=alerts">
                        مشاهده همه هشدارها
                    </AlertBoxFooter>
                </AlertBox>
            </div>
            <div className='col-span-12 lg:col-span-6'>
                <RankingCard
                    title='موجودی به تفکیک انبار'
                    items={INVENTORY_RANKING_ITEMS}
                    reportHref='/admin/sales?sub=top-sellers'
                />
            </div>
            <div className='col-span-12 lg:col-span-6'>
                <TransferSummary />
            </div>
            <div className='col-span-12'>
                <QuickAccessCard>
                    <QuickAccessCard.Header>دسترسی سریع</QuickAccessCard.Header>
                    <QuickAccessCard.Content>
                        <QuickAccessCard.List className="grid grid-cols-2 gap-2 lg:grid-cols-4">
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

export default InventoryDashboard
