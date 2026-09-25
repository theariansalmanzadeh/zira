'use client'

import { useParams } from 'next/navigation'
import { getInvoiceDetails } from './constants'
import InvoiceDetailsTabs from './components/InvoiceDetailsTabs'
import InvoiceSummary from './components/InvoiceSummary'

const InvoiceDetails = () => {
    const { id } = useParams<{ id: string }>()
    const { summary, request } = getInvoiceDetails(id)

    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <InvoiceSummary data={summary} />
            <InvoiceDetailsTabs request={request} />
        </div>
    )
}

export default InvoiceDetails
