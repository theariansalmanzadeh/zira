import { formatFaDate } from '@/src/shared/libs/formatter'
import { INVENTORY_INVOICE_DUMMY } from '@/src/routes/inventoryManagment/inventoryInvoice/constants'
import type { InventoryInvoiceStatus } from '@/src/routes/inventoryManagment/inventoryInvoice/types'

const STATUS_TEXT: Record<InventoryInvoiceStatus, string> = {
    'final-approval': 'تایید نهایی',
    pending: 'در انتظار تایید',
    draft: 'پیش‌نویس',
}

export type InvoiceSummaryData = {
    productCode: string
    mainCategory: string
    subCategory: string
    productName: string
    size: string
    model: string
    status: string
}

export type RequestDetailsData = {
    size: string
    color: string
    material: string
    labels: string
    supplier: string
    warehouseName: string
    requestDate: string
    receiveDate: string
    countedQty: string
    productAddress: string
}

export const INVOICE_SUMMARY: InvoiceSummaryData = {
    productCode: '7352-63',
    mainCategory: 'پوشاک',
    subCategory: 'لباس خواب',
    productName: 'لباس خواب ساتن',
    size: 'L',
    model: 'کلاسیک',
    status: 'تایید نهایی',
}

export const REQUEST_DETAILS: RequestDetailsData = {
    size: 'L',
    color: 'سفید',
    material: 'ساتن',
    labels: 'اورجینال',
    supplier: 'پارس‌نخ',
    warehouseName: 'مرکزی تهران',
    requestDate: '۱۰/۰۹/۱۴۰۴',
    receiveDate: '۱۷/۰۹/۱۴۰۴',
    countedQty: '۲۴',
    productAddress: 'A-R1-S2-B03',
}

export const PRODUCT_ADDRESS = {
    zone: 'B · ناحیه ورزشی',
    rack: '۱ قفسه',
    shelf: '۱ طبقه',
    box: '۱ جعبه',
    quantity: '۲۴۰',
}

export const getInvoiceDetails = (id?: string) => {
    const row =
        INVENTORY_INVOICE_DUMMY.find((item) => item.id === id) ??
        INVENTORY_INVOICE_DUMMY[0]
    const detail = row.details[0]
    const isPrimary = row.id === '1'

    return {
        summary: {
            productCode: row.productCode,
            mainCategory: row.mainCategory,
            subCategory: row.subCategory,
            productName: row.productName,
            size: row.size,
            model: row.model,
            status: STATUS_TEXT[row.status],
        } satisfies InvoiceSummaryData,
        request: {
            size: detail.size,
            color: detail.color,
            material: detail.material,
            labels: detail.labels,
            supplier: detail.supplier,
            warehouseName: detail.warehouseName,
            requestDate: isPrimary
                ? REQUEST_DETAILS.requestDate
                : formatFaDate(detail.requestDate, { timeZone: 'UTC' }),
            receiveDate: isPrimary
                ? REQUEST_DETAILS.receiveDate
                : formatFaDate(detail.receiveDate, { timeZone: 'UTC' }),
            countedQty: detail.countedQty,
            productAddress: detail.productAddress,
        } satisfies RequestDetailsData,
    }
}
