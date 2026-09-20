'use client'

import { useState } from 'react'
import { Input } from '@/src/shared/components/ui/Input'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import WarehouseAddressing from './components/WarehouseAddressing'
import {
    RECEIVER_OPTIONS,
    STOCK_RETURN_DETAILS_DEFAULTS,
    WAREHOUSE_OPTIONS,
} from './constants'

const StockReturnDetails = () => {
    const [requestCode] = useState(STOCK_RETURN_DETAILS_DEFAULTS.requestCode)
    const [requestDate] = useState(STOCK_RETURN_DETAILS_DEFAULTS.requestDate)
    const [customer] = useState(STOCK_RETURN_DETAILS_DEFAULTS.customer)
    const [product] = useState(STOCK_RETURN_DETAILS_DEFAULTS.product)
    const [declaredQty] = useState(STOCK_RETURN_DETAILS_DEFAULTS.declaredQty)
    const [countedQty, setCountedQty] = useState(
        STOCK_RETURN_DETAILS_DEFAULTS.countedQty
    )
    const [receiverId, setReceiverId] = useState(
        STOCK_RETURN_DETAILS_DEFAULTS.receiverId
    )
    const [warehouseId, setWarehouseId] = useState(
        STOCK_RETURN_DETAILS_DEFAULTS.warehouseId
    )

    return (
        <div
            className='flex flex-col gap-6 rounded-card-lg bg-surface-container-lowest p-6'
            dir='rtl'
        >
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <Input label='کد درخواست' value={requestCode} readOnly />
                <Input label='تاریخ درخواست' value={requestDate} readOnly />
                <Input label='مشتری' value={customer} readOnly />
                <Input label='کد / نام کالا' value={product} readOnly />
                <Input
                    label='تعداد اعلامی درخواست'
                    value={declaredQty}
                    readOnly
                />
                <Input
                    label='تعداد شمارش شده کالای دریافتی'
                    value={countedQty}
                    onChange={setCountedQty}
                    msg='تعدادی که انباردار پس از شمارش فیزیکی دریافت کرده است.'
                />
                <FormDropdown
                    label='نام تحویل گیرنده'
                    value={receiverId}
                    options={RECEIVER_OPTIONS}
                    onChange={setReceiverId}
                />
                <FormDropdown
                    label='نام انبار'
                    value={warehouseId}
                    options={WAREHOUSE_OPTIONS}
                    onChange={setWarehouseId}
                />
            </div>

            <WarehouseAddressing />
        </div>
    )
}

export default StockReturnDetails
