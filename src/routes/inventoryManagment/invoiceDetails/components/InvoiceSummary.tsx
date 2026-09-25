'use client'

import type { InvoiceSummaryData } from '../constants'

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
    <div className='flex flex-col items-center gap-1 text-center'>
        <span className='text-label-md text-outline'>{label}</span>
        <span className='text-label-lg text-on-surface'>{value}</span>
    </div>
)

const InvoiceSummary = ({ data }: { data: InvoiceSummaryData }) => (
    <div
        className='flex flex-wrap items-center justify-between gap-4 rounded-card-md bg-surface-container-lowest px-6 py-5'
        dir='rtl'
    >
        <SummaryItem label='کد کالا' value={data.productCode} />
        <SummaryItem label='دسته اصلی' value={data.mainCategory} />
        <SummaryItem label='دسته فرعی' value={data.subCategory} />
        <SummaryItem label='نام کالا' value={data.productName} />
        <SummaryItem label='سایز' value={data.size} />
        <SummaryItem label='مدل' value={data.model} />
        <SummaryItem label='وضعیت' value={data.status} />
    </div>
)

export default InvoiceSummary
