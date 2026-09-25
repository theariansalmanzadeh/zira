'use client'

import type { RequestDetailsData } from '../constants'
import DisabledField from './DisabledField'

const RequestDetails = ({ data }: { data: RequestDetailsData }) => (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2' dir='rtl'>
        <DisabledField label='سایز' value={data.size} />
        <DisabledField label='رنگ' value={data.color} />
        <DisabledField label='جنس' value={data.material} />
        <DisabledField label='لیبل ها' value={data.labels} />
        <DisabledField label='تامین کننده' value={data.supplier} />
        <DisabledField label='نام انبار' value={data.warehouseName} />
        <DisabledField label='تاریخ درخواست' value={data.requestDate} />
        <DisabledField label='تاریخ دریافت' value={data.receiveDate} />
        <DisabledField label='تعداد شمارش شده' value={data.countedQty} />
        <DisabledField label='آدرس کالا' value={data.productAddress} />
    </div>
)

export default RequestDetails
