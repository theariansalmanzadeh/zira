'use client'

import CampaignNatureShareChart from './CampaignNatureShareChart'
import CampaignSalesChart from './CampaignSalesChart'
import CampaignSummaryTable from './CampaignSummaryTable'

const CampaignSummaryTab = () => {
    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <CampaignSummaryTable />
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-12'>
                <div className='lg:col-span-7'>
                    <CampaignSalesChart />
                </div>
                <div className='lg:col-span-5'>
                    <CampaignNatureShareChart />
                </div>
            </div>
        </div>
    )
}

export default CampaignSummaryTab
