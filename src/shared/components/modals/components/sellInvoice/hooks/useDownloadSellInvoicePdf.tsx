'use client'

import { useCallback, useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import SellInvoicePdfDocument from '../components/SellInvoicePdfDocument'
import { SELL_INVOICE_DUMMY } from '../constants'
import type { SellInvoiceData } from '../types'

type UseDownloadSellInvoicePdfOptions = {
    elementId?: string
    fileName?: string
    data?: SellInvoiceData
}

export const useDownloadSellInvoicePdf = (
    {
        elementId = 'sell-invoice',
        fileName = 'sell-invoice.pdf',
        data = SELL_INVOICE_DUMMY,
    }: UseDownloadSellInvoicePdfOptions
) => {
    const [isDownloading, setIsDownloading] = useState(false)

    const downloadPdf = useCallback(async () => {
        const invoiceElement = document.getElementById(elementId)
        if (!invoiceElement) {
            console.error(`Element #${elementId} was not found`)
            return
        }

        setIsDownloading(true)
        try {
            const blob = await pdf(
                <SellInvoicePdfDocument data={data} />
            ).toBlob()

            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = fileName
            document.body.appendChild(link)
            link.click()
            link.remove()
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Failed to download sell invoice PDF', error)
        } finally {
            setIsDownloading(false)
        }
    }, [data, elementId, fileName])

    return { downloadPdf, isDownloading }
}
