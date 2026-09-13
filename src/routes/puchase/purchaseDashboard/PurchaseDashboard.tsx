import QuickAccessCard from '@/src/shared/components/quickAccessCard'
import SummaryCard from '@/src/shared/components/ui/SummaryCard'
import SummaryProgressCard from '@/src/shared/components/ui/SummaryProgressCard'
import AlertBox, { AlertBoxContent, AlertBoxHeader, AlertBoxItem, AlertBoxList } from '@shared/components/ui/AlertBox'

const PurchaseDashboard = () => {
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
                        <SummaryCard.Title>تعداد کاربران</SummaryCard.Title>
                    </SummaryCard.Header>
                    <SummaryCard.Body>
                        <SummaryCard.ValueRow>
                            <SummaryCard.Value>100</SummaryCard.Value>
                        </SummaryCard.ValueRow>
                    </SummaryCard.Body>
                    <SummaryCard.Footer>
                        <SummaryCard.FooterIcon label="dashboard" />
                        <SummaryCard.FooterText>100%</SummaryCard.FooterText>
                    </SummaryCard.Footer>
                </SummaryCard>
                <SummaryCard>
                    <SummaryCard.Header>
                        <SummaryCard.Title>تعداد کاربران</SummaryCard.Title>
                    </SummaryCard.Header>
                    <SummaryCard.Body>
                        <SummaryCard.ValueRow>
                            <SummaryCard.Value>100</SummaryCard.Value>
                        </SummaryCard.ValueRow>
                    </SummaryCard.Body>
                    <SummaryCard.Footer>
                        <SummaryCard.FooterIcon label="dashboard" />
                        <SummaryCard.FooterText>100%</SummaryCard.FooterText>
                    </SummaryCard.Footer>
                </SummaryCard>
                <SummaryCard>
                    <SummaryCard.Header>
                        <SummaryCard.Title>تعداد کاربران</SummaryCard.Title>
                    </SummaryCard.Header>
                    <SummaryCard.Body>
                        <SummaryCard.ValueRow>
                            <SummaryCard.Value>100</SummaryCard.Value>
                            <SummaryCard.Suffix>تیکت</SummaryCard.Suffix>
                        </SummaryCard.ValueRow>
                    </SummaryCard.Body>
                    <SummaryCard.Footer>
                        <SummaryCard.FooterIcon label="dashboard" />
                        <SummaryCard.FooterText>100%</SummaryCard.FooterText>
                    </SummaryCard.Footer>
                </SummaryCard>
                <SummaryCard>
                    <SummaryCard.Header>
                        <SummaryCard.Title>تعداد کاربران</SummaryCard.Title>
                    </SummaryCard.Header>
                    <SummaryCard.Body>
                        <SummaryCard.ValueRow>
                            <SummaryCard.Value>100</SummaryCard.Value>
                            <SummaryCard.Suffix>از</SummaryCard.Suffix>
                        </SummaryCard.ValueRow>
                    </SummaryCard.Body>
                    <SummaryCard.Footer>
                        <SummaryCard.FooterIcon label="dashboard" />
                        <SummaryCard.FooterText>100%</SummaryCard.FooterText>
                    </SummaryCard.Footer>
                </SummaryCard>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-3'>
                <div className='col-span-3'>
                    <SummaryProgressCard title=' کاربران' indicators={[{ progress: { value: 100, className: 'bg-success' }, label: 'تعداد کاربران', counts: { value: 100, className: 'text-success' }, countsPrefix: { value: 'از', className: 'text-success' } }]} />
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

export default PurchaseDashboard
