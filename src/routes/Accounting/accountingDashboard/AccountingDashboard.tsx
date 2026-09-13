import QuickAccessCard from '@/src/shared/components/quickAccessCard'
import AlertBox, { AlertBoxContent, AlertBoxHeader, AlertBoxItem, AlertBoxList } from '@/src/shared/components/ui/AlertBox'
import SummaryCard from '@/src/shared/components/ui/SummaryCard'
import React from 'react'
import SummaryChart from './components/SummaryChart'

const AccountingDashboard = () => {
    return (
        <div className='flex flex-col gap-3'>
            <div>
                <span className='text-label-lg font-bold text-outline'>
                    خلاصه آمار
                </span>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
                <SummaryCard>
                    <SummaryCard.Header>
                        <SummaryCard.HeaderIcon
                            label="accountBalance400Linear"
                            className="rounded-card-sm bg-surface-container-high p-1 text-on-surface"
                        />
                    </SummaryCard.Header>
                    <SummaryCard.Body>
                        <SummaryCard.BodyTitle>تعداد کاربران</SummaryCard.BodyTitle>
                        <SummaryCard.ValueRow>
                            <SummaryCard.Value>100</SummaryCard.Value>
                            <SummaryCard.Suffix>میلیارد تومان</SummaryCard.Suffix>
                        </SummaryCard.ValueRow>
                    </SummaryCard.Body>
                    <SummaryCard.Footer>
                        <SummaryCard.FooterText>100%</SummaryCard.FooterText>
                    </SummaryCard.Footer>
                </SummaryCard>
                <SummaryCard>
                    <SummaryCard.Header>
                        <SummaryCard.HeaderIcon
                            label="moneyBag400Linear"
                            className="rounded-card-sm bg-success-container p-1 text-success"
                        />
                    </SummaryCard.Header>
                    <SummaryCard.Body>
                        <SummaryCard.BodyTitle>تعداد کاربران</SummaryCard.BodyTitle>
                        <SummaryCard.ValueRow>
                            <SummaryCard.Value>100</SummaryCard.Value>
                            <SummaryCard.Suffix>میلیارد تومان</SummaryCard.Suffix>
                        </SummaryCard.ValueRow>
                    </SummaryCard.Body>
                    <SummaryCard.Footer>
                        <SummaryCard.FooterText>100%</SummaryCard.FooterText>
                    </SummaryCard.Footer>
                </SummaryCard>
                <SummaryCard>
                    <SummaryCard.Header>
                        <SummaryCard.HeaderIcon
                            label="sendMoneyLtr400Linear"
                            className="rounded-card-sm bg-warning-container p-1 text-warning"
                        />
                    </SummaryCard.Header>
                    <SummaryCard.Body>
                        <SummaryCard.BodyTitle>تعداد کاربران</SummaryCard.BodyTitle>
                        <SummaryCard.ValueRow>
                            <SummaryCard.Value>100</SummaryCard.Value>
                            <SummaryCard.Suffix>میلیارد تومان</SummaryCard.Suffix>
                        </SummaryCard.ValueRow>
                    </SummaryCard.Body>
                    <SummaryCard.Footer>
                        <SummaryCard.FooterText>100%</SummaryCard.FooterText>
                    </SummaryCard.Footer>
                </SummaryCard>
                <SummaryCard>
                    <SummaryCard.Header>
                        <SummaryCard.HeaderIcon
                            label="heapSnapshot400Linear"
                            className="rounded-card-sm bg-info-container p-1 text-info"
                        />
                    </SummaryCard.Header>
                    <SummaryCard.Body>
                        <SummaryCard.BodyTitle>تعداد کاربران</SummaryCard.BodyTitle>
                        <SummaryCard.ValueRow>
                            <SummaryCard.Value>100</SummaryCard.Value>
                            <SummaryCard.Suffix>از</SummaryCard.Suffix>
                        </SummaryCard.ValueRow>
                    </SummaryCard.Body>
                    <SummaryCard.Footer>
                        <SummaryCard.FooterText>100%</SummaryCard.FooterText>
                    </SummaryCard.Footer>
                </SummaryCard>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-3'>
                <div className='col-span-3 bg-surface-container-lowest rounded-card-lg p-3'>
                    <SummaryChart />
                </div>
                <div className=' col-span-2'>
                    <AlertBox>
                        <AlertBoxHeader>
                            <span className='text-label-lg font-bold text-outline'>هشدار ها</span>
                        </AlertBoxHeader>
                        <AlertBoxContent>
                            <AlertBoxList>
                                <AlertBoxItem title='هشدار 1' description='توضیحات هشدار 1' />
                                <AlertBoxItem title='هشدار 1' description='توضیحات هشدار 1' />
                            </AlertBoxList>
                        </AlertBoxContent>
                    </AlertBox>
                </div>
                <div className='col-span-full'>
                    <QuickAccessCard>
                        <QuickAccessCard.Header>دسترسی سریع</QuickAccessCard.Header>
                        <QuickAccessCard.Content>
                            <QuickAccessCard.List>
                                <QuickAccessCard.Item label='لیست شعب' value={12} href='/field' />
                                <QuickAccessCard.Item label='انتقال بین شعب' value={2} />
                                <QuickAccessCard.Item label='کارمندان' value={27} />
                                <QuickAccessCard.Item label='موجودی شعب' value='-' />
                            </QuickAccessCard.List>
                        </QuickAccessCard.Content>
                    </QuickAccessCard>
                </div>
            </div>
        </div>)
}

export default AccountingDashboard
