'use client'

import { useState } from 'react'
import { Input } from '@/src/shared/components/ui/Input'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import {
    BOX_OPTIONS,
    RACK_OPTIONS,
    RECEIVER_OPTIONS,
    SHELF_OPTIONS,
    WAREHOUSE_OPTIONS,
    WASTE_DETAILS_DEFAULTS,
    ZONE_OPTIONS,
} from './constants'

const WasteDetails = () => {
    const [countedQty, setCountedQty] = useState(
        WASTE_DETAILS_DEFAULTS.countedQty
    )
    const [receiverId, setReceiverId] = useState(
        WASTE_DETAILS_DEFAULTS.receiverId
    )
    const [warehouseId, setWarehouseId] = useState(
        WASTE_DETAILS_DEFAULTS.warehouseId
    )
    const [zoneId, setZoneId] = useState(WASTE_DETAILS_DEFAULTS.zoneId)
    const [rackId, setRackId] = useState(WASTE_DETAILS_DEFAULTS.rackId)
    const [shelfId, setShelfId] = useState(WASTE_DETAILS_DEFAULTS.shelfId)
    const [boxId, setBoxId] = useState(WASTE_DETAILS_DEFAULTS.boxId)

    return (
        <div className='mx-auto flex w-full max-w-[1000px] flex-col gap-6' dir='rtl'>
            <div className='rounded-card-lg bg-warning-container px-4 py-3 text-center text-label-md leading-7 text-on-warning-container'>
                برای تایید این درخواست، ثبت «تعداد شمارش شده کالای دریافتی» و
                «آدرس دقیق کالا در انبار» الزامی است. پس از ثبت، درخواست به تب
                «تایید شده» منتقل می‌شود.
            </div>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <Input
                    label='کد درخواست'
                    value={WASTE_DETAILS_DEFAULTS.requestCode}
                    readOnly
                />
                <Input
                    label='تاریخ درخواست'
                    value={WASTE_DETAILS_DEFAULTS.requestDate}
                    readOnly
                />
                <Input
                    label='مشتری'
                    value={WASTE_DETAILS_DEFAULTS.customer}
                    readOnly
                />
                <Input
                    label='کد / نام کالا'
                    value={WASTE_DETAILS_DEFAULTS.product}
                    readOnly
                />
                <Input
                    label='تعداد اعلامی درخواست'
                    value={WASTE_DETAILS_DEFAULTS.declaredQty}
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

            <div className='flex flex-col gap-4 rounded-card-md border border-outline-variant p-4'>
                <span className='text-label-lg font-medium text-on-surface'>
                    آدرس کالا در انبار (انتخاب مرحله‌ای)
                </span>
                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
                    <FormDropdown
                        label='ناحیه'
                        value={zoneId}
                        options={ZONE_OPTIONS}
                        onChange={setZoneId}
                    />
                    <FormDropdown
                        label='قفسه'
                        value={rackId}
                        options={RACK_OPTIONS}
                        onChange={setRackId}
                    />
                    <FormDropdown
                        label='طبقه'
                        value={shelfId}
                        options={SHELF_OPTIONS}
                        onChange={setShelfId}
                    />
                    <FormDropdown
                        label='جعبه'
                        value={boxId}
                        options={BOX_OPTIONS}
                        onChange={setBoxId}
                    />
                </div>
            </div>
        </div>
    )
}

export default WasteDetails
