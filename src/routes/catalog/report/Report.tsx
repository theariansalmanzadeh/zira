'use client'

import { useState } from 'react'
import ReportFilterForm from '@/src/shared/components/reportFilterForm/ReportFilterForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import CamaignComparisonReport from './components/CamaignComparisonReport'
import CampaignReportSummary from './components/CampaignReportSummary'
import CampaignSummaryTab from './components/CampaignSummaryTab'

const CAMPAIGN_OPTIONS = [
    { label: 'همه کمپین‌ها', value: 'all' },
    { label: 'حراج پایان فصل پاییز', value: 'autumn-sale' },
    { label: 'فروش ویژه VIP', value: 'vip' },
    { label: 'باندل زمستانه', value: 'winter-bundle' },
    { label: 'شب یلدا', value: 'yalda' },
]

const tabTriggerClassName =
    'rounded-container-md flex-1 border-0 px-4 py-2 data-[state=active]:-mb-0 data-[state=active]:bg-surface-container-lowest data-[state=active]:text-on-surface data-[state=active]:shadow-sm data-[state=active]:after:hidden'

const TABS = [
    { value: 'overview', label: 'گزارش' },
    { value: 'summary', label: 'خلاصه' },
    { value: 'comparison', label: 'مقایسه' },
] as const

const Report = () => {
    const [tab, setTab] = useState<string>('overview')

    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <Tabs
                value={tab}
                onValueChange={setTab}
                dir='rtl'
                className='w-full gap-4'
            >
                <TabsList className='mb-3 h-auto w-full gap-1 rounded-container-md border-0 bg-surface-container-highest p-1.5'>
                    {TABS.map((item) => (
                        <TabsTrigger
                            key={item.value}
                            value={item.value}
                            className={tabTriggerClassName}
                        >
                            {item.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value='overview' className='mt-0 flex flex-col gap-4'>
                    <ReportFilterForm
                        firstDropdownOptions={{
                            label: 'کمپین',
                            items: CAMPAIGN_OPTIONS,
                        }}
                        submitLabel='مشاهده گزارش'
                    />
                    <CampaignReportSummary />
                </TabsContent>

                <TabsContent value='summary' className='mt-0'>
                    <CampaignSummaryTab />
                </TabsContent>

                <TabsContent value='comparison' className='mt-0 flex flex-col gap-4'>
                    <ReportFilterForm
                        firstDropdownOptions={{
                            label: 'کمپین اول',
                            items: CAMPAIGN_OPTIONS,
                        }}
                        secondDropdownOptions={{
                            label: 'کمپین دوم',
                            items: CAMPAIGN_OPTIONS,
                        }}
                        submitLabel='مشاهده مقایسه'
                    />
                    <CamaignComparisonReport />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Report
