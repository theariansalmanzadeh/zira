import QuickAccessCard from '@/src/shared/components/quickAccessCard'
import AlertBox, {
    AlertBoxContent,
    AlertBoxFooter,
    AlertBoxHeader,
    AlertBoxItem,
    AlertBoxList,
} from '@shared/components/ui/AlertBox'
import SummaryCard from '@/src/shared/components/ui/SummaryCard'
import StatusBreakDown from '@shared/components/ui/StatusBreakDown'
import {
    ORDER_ALERTS,
    ORDER_QUICK_ACCESS_ITEMS,
    ORDER_STATUS_BREAKDOWN,
    ORDER_SUMMARY_STATS,
} from './constants/dashboard'

const OrderMangment = () => {
    return (
        <div className='grid grid-cols-12 gap-3' dir='rtl'>
            <span className='text-label-lg font-medium text-outline'>
                خلاصه آمار
            </span>
            <div className='col-span-12 flex flex-row gap-3 overflow-x-auto'>
                {ORDER_SUMMARY_STATS.map((stat) => (
                    <SummaryCard key={stat.bodyTitle} className='grow'>
                        <SummaryCard.Header>
                            <SummaryCard.HeaderIcon
                                label={stat.headerIcon}
                                className={stat.headerIconClassName}
                            />
                        </SummaryCard.Header>
                        <SummaryCard.Body>
                            <SummaryCard.BodyTitle>
                                {stat.bodyTitle}
                            </SummaryCard.BodyTitle>
                            <SummaryCard.ValueRow>
                                <SummaryCard.Value>{stat.value}</SummaryCard.Value>
                            </SummaryCard.ValueRow>
                        </SummaryCard.Body>
                    </SummaryCard>
                ))}
            </div>

            <div className='col-span-12 lg:col-span-8'>
                <StatusBreakDown
                    title='سفارش‌ها به تفکیک وضعیت'
                    items={ORDER_STATUS_BREAKDOWN}
                />
            </div>

            <div className='col-span-12 lg:col-span-4'>
                <AlertBox className='h-full'>
                    <AlertBoxHeader>
                        <span className='text-title-md font-medium text-on-surface'>هشدارها</span>
                    </AlertBoxHeader>
                    <AlertBoxContent>
                        <AlertBoxList>
                            {ORDER_ALERTS.map((alert, index) => (
                                <AlertBoxItem
                                    key={index}
                                    title={alert.title}
                                    description={alert.description}
                                />
                            ))}
                        </AlertBoxList>
                    </AlertBoxContent>
                    <AlertBoxFooter href='/admin/order-managment?sub=alerts'>
                        مشاهده همه هشدارها
                    </AlertBoxFooter>
                </AlertBox>
            </div>


            <div className='col-span-12'>
                <QuickAccessCard>
                    <QuickAccessCard.Header>دسترسی سریع</QuickAccessCard.Header>
                    <QuickAccessCard.Content>
                        <QuickAccessCard.List>
                            {ORDER_QUICK_ACCESS_ITEMS.map((item) => (
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

export default OrderMangment
