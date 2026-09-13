import QuickAccessCard from '@/src/shared/components/quickAccessCard'
import AlertBox, {
    AlertBoxContent,
    AlertBoxHeader,
    AlertBoxItem,
    AlertBoxList,
} from '@/src/shared/components/ui/AlertBox'
import StatusBreakDown from '@/src/shared/components/ui/StatusBreakDown'
import SummaryCard from '@/src/shared/components/ui/SummaryCard'
import { ORDER_STATUS_BREAKDOWN } from '../../orderManagment/constants/dashboard'
import { CATEGORY_SUMMARY_CARDS, CATEGORY_QUICK_ACCESS_ITEMS } from "./constants"

const CategoryDashboard = () => {
    return (
        <div className="grid grid-cols-12 gap-3" dir="rtl">
            <div className="col-span-12 flex flex-col gap-3">
                <span className="text-label-lg font-bold text-outline">
                    خلاصه آمار
                </span>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                    {CATEGORY_SUMMARY_CARDS.map((card) => (
                        <SummaryCard key={card.icon}>
                            <SummaryCard.Header>
                                <SummaryCard.HeaderIcon
                                    label={card.icon}
                                    className={card.iconClassName}
                                />
                            </SummaryCard.Header>
                            <SummaryCard.Body>
                                <SummaryCard.ValueRow>
                                    <SummaryCard.Value className="text-display-sm! font-semibold! text-on-surface">
                                        {card.value}
                                    </SummaryCard.Value>
                                    {card.suffix && (
                                        <SummaryCard.Suffix>
                                            {card.suffix}
                                        </SummaryCard.Suffix>
                                    )}
                                </SummaryCard.ValueRow>
                                <SummaryCard.BodyTitle className="mt-1 text-label-md text-outline">
                                    {card.label}
                                </SummaryCard.BodyTitle>
                            </SummaryCard.Body>
                        </SummaryCard>
                    ))}
                </div>
            </div>

            <div className="col-span-12 md:col-span-8">
                <StatusBreakDown
                    title="سفارش‌ها به تفکیک وضعیت"
                    items={ORDER_STATUS_BREAKDOWN}
                />
            </div>

            <div className="col-span-12 md:col-span-4">
                <AlertBox className="h-full">
                    <AlertBoxHeader>
                        <span className="text-title-md font-medium text-on-surface">
                            هشدارها
                        </span>
                    </AlertBoxHeader>
                    <AlertBoxContent>
                        <AlertBoxList>
                            <AlertBoxItem
                                title="هشدار 1"
                                description="توضیحات هشدار 1"
                            />
                            <AlertBoxItem
                                title="هشدار 1"
                                description="توضیحات هشدار 1"
                            />
                        </AlertBoxList>
                    </AlertBoxContent>
                </AlertBox>
            </div>

            <div className="col-span-12">
                <QuickAccessCard>
                    <QuickAccessCard.Header>دسترسی سریع</QuickAccessCard.Header>
                    <QuickAccessCard.Content>
                        <QuickAccessCard.List>
                            {CATEGORY_QUICK_ACCESS_ITEMS.map((item) => (
                                <QuickAccessCard.Item
                                    key={item.label}
                                    label={item.label}
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

export default CategoryDashboard
