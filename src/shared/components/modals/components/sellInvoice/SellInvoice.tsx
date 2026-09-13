'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { Pill } from '@/src/shared/components/ui/Pill'
import { formatFaDate, formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import type { BaseModalProps } from '../../types'
import OrderItemsTable from './components/OrderItemsTable'
import { SELL_INVOICE_DUMMY } from './constants'
import { useDownloadSellInvoicePdf } from './hooks/useDownloadSellInvoicePdf'

const SellInvoice = (_props: BaseModalProps) => {
    const {
        customerName,
        customerCode,
        address,
        phone,
        registeredAt,
        settledAt,
        settlementLabel,
        items,
        discount,
    } = SELL_INVOICE_DUMMY

    const { downloadPdf, isDownloading } = useDownloadSellInvoicePdf({
        elementId: 'sell-invoice',
        data: SELL_INVOICE_DUMMY,
        fileName: `sell-invoice-${customerCode}.pdf`,
    })

    const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
    const taxable = Math.max(subtotal - discount, 0)
    const tax = Math.round(taxable * 0.09)
    const payable = taxable + tax

    return (
        <div className="flex w-full flex-col gap-5" dir="rtl">
            <div id="sell-invoice" className="flex w-full flex-col gap-5">
                <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
                    <div className="rounded-[12px] bg-surface-container-high p-4">
                        <div className="mb-2 text-label-sm text-outline">
                            صورتحساب برای
                        </div>
                        <div className="text-title-md font-bold text-on-surface">
                            {customerName}
                        </div>
                        <div className="mt-1 text-label-sm text-outline" dir="ltr">
                            {customerCode}
                        </div>
                        <div className="mt-2 text-label-sm leading-relaxed text-on-surface-variant">
                            {address}
                        </div>
                        <div
                            className="mt-1 text-label-sm text-on-surface-variant"
                            dir="ltr"
                        >
                            {phone}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 rounded-[12px] bg-surface-container-high p-4">
                        <div className="flex items-center justify-between py-1 text-label-md">
                            <span className="text-outline">تاریخ ثبت</span>
                            <span
                                className="font-semibold text-on-surface-variant"
                                dir="ltr"
                            >
                                {formatFaDate(registeredAt)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-1 text-label-md">
                            <span className="text-outline">نحوه تسویه</span>
                            <Pill
                                className="border-0"
                                variant="success"
                                text={settlementLabel}
                            />
                        </div>
                        <div className="flex items-center justify-between py-1 text-label-md">
                            <span className="text-outline">تاریخ تسویه</span>
                            <span
                                className="font-semibold text-on-surface-variant"
                                dir="ltr"
                            >
                                {formatFaDate(settledAt)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-1 text-label-md">
                            <span className="text-outline">تعداد اقلام</span>
                            <span className="font-semibold text-on-surface-variant">
                                {formatFaNumber(items.length)} قلم
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="mb-2.5 text-title-sm font-semibold text-on-surface">
                        جزئیات سفارش
                    </h3>
                    <OrderItemsTable items={items} />

                    <div className="mt-4 mr-auto w-full">
                        <div className="flex items-center justify-between py-1.5 text-label-md">
                            <span className="text-outline">جمع جزء</span>
                            <span className="flex items-center gap-1 font-semibold text-on-surface-variant">
                                <span>{formatPrice(subtotal)}</span>
                                <Icon label="currency" className="size-5!" />
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-1.5 text-label-md">
                            <span className="text-outline">تخفیف</span>
                            <span className="flex items-center gap-1 font-semibold text-primary">
                                <span>-{formatPrice(discount)}</span>
                                <Icon
                                    label="currency"
                                    className="size-5! text-primary"
                                />
                            </span>
                        </div>
                        <div className="flex items-center justify-between border-b border-outline-variant py-1.5 text-label-md">
                            <span className="text-outline">
                                مالیات بر ارزش افزوده (۹٪)
                            </span>
                            <span className="flex items-center gap-1 font-semibold text-on-surface-variant">
                                <span>{formatPrice(tax)}</span>
                                <Icon label="currency" className="size-5!" />
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-2.5 text-label-lg">
                            <span className="font-bold text-on-surface">
                                مبلغ قابل پرداخت
                            </span>
                            <span className="flex items-center gap-1 font-bold text-primary">
                                <span>{formatPrice(payable)}</span>
                                <Icon
                                    label="currency"
                                    className="size-6! text-primary"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row items-center gap-2.5 border-t border-outline-variant pt-4">
                <Button type="button" variant="primary" className="gap-2">
                    <Icon
                        label="print400Linear"
                        className="size-4! text-on-primary"
                    />
                    <span className="text-label-md text-on-primary">چاپ فاکتور</span>
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    disabled={isDownloading}
                    onClick={downloadPdf}
                >
                    <Icon label="download400Linear" className="size-4!" />
                    <span className="text-label-md">
                        {isDownloading ? 'در حال دانلود...' : 'دانلود PDF'}
                    </span>
                </Button>
            </div>
        </div>
    )
}

export default SellInvoice
