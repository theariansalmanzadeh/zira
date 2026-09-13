import SummaryCard from '@/src/shared/components/ui/SummaryCard'
import AlertBox, { AlertBoxContent, AlertBoxHeader, AlertBoxItem, AlertBoxList } from '@/src/shared/components/ui/AlertBox'
import StatusBreakDown from '@/src/shared/components/ui/StatusBreakDown'

const SUPPORT_STATUS_BREAKDOWN = [
    { label: 'تهران مرکزی', percent: 62, value: '۲.۹ میلیارد' },
    { label: 'شعبه کرج', percent: 30, value: '۱.۳ میلیارد' },
    { label: 'شعبه اصفهان', percent: 4, value: '۴۸۰ میلیون' },
    { label: 'شعبه اصفهان', percent: 2, value: '۲۱۰ میلیون' },
    { label: 'شعبه اصفهان', percent: 2, value: '۱۸۰ میلیون' },
    { label: 'شعبه مشهد', percent: 2, value: '۱۵۰ میلیون' },
    { label: 'تهران غرب', percent: 2, value: '۱۲۰ میلیون' },
]

const SupportDashboard = () => {
    return (
        <div className='flex flex-col gap-3'>
            <div>
                <span className='text-label-lg font-bold text-outline'>
                    خلاصه آمار
                </span>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
                <SummaryCard>
                    <SummaryCard.Body>
                        <SummaryCard.BodyTitle>تعداد کاربران</SummaryCard.BodyTitle>
                        <SummaryCard.ValueRow>
                            <SummaryCard.Value>100</SummaryCard.Value>
                        </SummaryCard.ValueRow>
                    </SummaryCard.Body>
                    <SummaryCard.Footer>
                        <SummaryCard.FooterIcon label="keyboardArrowUp400Linear" />
                        <SummaryCard.FooterText>5.11% بیشتر</SummaryCard.FooterText>
                    </SummaryCard.Footer>
                </SummaryCard>
                <SummaryCard>
                    <SummaryCard.Body>
                        <SummaryCard.BodyTitle>تعداد کاربران</SummaryCard.BodyTitle>
                        <SummaryCard.ValueRow>
                            <SummaryCard.Value>100</SummaryCard.Value>
                        </SummaryCard.ValueRow>
                    </SummaryCard.Body>
                    <SummaryCard.Footer>
                        <SummaryCard.FooterIcon label="keyboardArrowDown400Linear" />
                        <SummaryCard.FooterText>100%</SummaryCard.FooterText>
                    </SummaryCard.Footer>
                </SummaryCard>
                <SummaryCard>
                    <SummaryCard.Body>
                        <SummaryCard.BodyTitle>تعداد کاربران</SummaryCard.BodyTitle>
                        <SummaryCard.ValueRow>
                            <SummaryCard.Value>100</SummaryCard.Value>
                            <SummaryCard.Suffix>تیکت</SummaryCard.Suffix>
                        </SummaryCard.ValueRow>
                    </SummaryCard.Body>
                    <SummaryCard.Footer>
                        <SummaryCard.FooterIcon label="keyboardArrowUp400Linear" />
                        <SummaryCard.FooterText>100%</SummaryCard.FooterText>
                    </SummaryCard.Footer>
                </SummaryCard>
                <SummaryCard>
                    <SummaryCard.Body>
                        <SummaryCard.BodyTitle>تعداد کاربران</SummaryCard.BodyTitle>
                        <SummaryCard.ValueRow>
                            <SummaryCard.Value>100</SummaryCard.Value>
                            <SummaryCard.Suffix>از</SummaryCard.Suffix>
                        </SummaryCard.ValueRow>
                    </SummaryCard.Body>
                    <SummaryCard.Footer>
                        <SummaryCard.FooterIcon label="keyboardArrowDown400Linear" />
                        <SummaryCard.FooterText>100%</SummaryCard.FooterText>
                    </SummaryCard.Footer>
                </SummaryCard>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-3'>
                <div className='col-span-3'>
                    <StatusBreakDown title='سفارش‌ها به تفکیک وضعیت' items={SUPPORT_STATUS_BREAKDOWN} />
                </div>
                <div className=' col-span-2'>
                    <AlertBox>
                        <AlertBoxHeader>
                            <span className='text-label-lg text-on-surface'>هشدار ها</span>
                        </AlertBoxHeader>
                        <AlertBoxContent>
                            <AlertBoxList>
                                <AlertBoxItem title='هشدار 1' description='توضیحات هشدار 1' />
                                <AlertBoxItem title='هشدار 1' description='توضیحات هشدار 1' />
                            </AlertBoxList>
                        </AlertBoxContent>
                    </AlertBox>
                </div>
            </div>
        </div>
    )
}

export default SupportDashboard
