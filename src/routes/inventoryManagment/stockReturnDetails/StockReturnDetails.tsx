'use client'

import { Input } from '@/src/shared/components/ui/Input'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import WarehouseAddressing from './components/WarehouseAddressing'
import { RECEIVER_OPTIONS, WAREHOUSE_OPTIONS } from './constants'

const StockReturnDetails = () => {
    return (
        <div
            className='flex flex-col gap-6 rounded-card-lg bg-surface-container-lowest p-6'
            dir='rtl'
        >
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <Input label='کد درخواست' value='RT-1041' readOnly />
                <Input label='تاریخ درخواست' value='۱۴۰۴/۱۲/۱۲' readOnly />
                <Input label='مشتری' value='حسین احمدی (CU-2344)' readOnly />
                <Input label='کد / نام کالا' value='۷۳۵۲-۶۳ - لباس خواب ساتن' readOnly />
                <Input label='تعداد اعلامی درخواست' value='۶ عدد' readOnly />
                <Input
                    label='تعداد شمارش شده کالای دریافتی'
                    value='۶'
                    readOnly
                    msg='تعدادی که انباردار پس از شمارش فیزیکی دریافت کرده است.'
                />
                <FormDropdown
                    label='نام تحویل گیرنده'
                    value='ali-rezaei'
                    options={RECEIVER_OPTIONS}
                    onChange={() => undefined}
                />
                <FormDropdown
                    label='نام انبار'
                    value='tehran-central'
                    options={WAREHOUSE_OPTIONS}
                    onChange={() => undefined}
                />
            </div>

            <WarehouseAddressing />
        </div>
    )
}

export default StockReturnDetails
