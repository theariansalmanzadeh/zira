'use client'

import { TABLE_GRID_CLASS } from '../constants'
import { cn } from '@/src/shared/libs/utils'

const TableHeader = () => (
    <div
        className={cn(
            TABLE_GRID_CLASS,
            'px-4 py-3 text-label-lg font-normal text-outline'
        )}
    >
        <div>ردیف</div>
        <div>شماره فاکتور</div>
        <div>کد مشتری</div>
        <div>نام مشتری</div>
        <div>تاریخ</div>
        <div>تعداد اقلام</div>
        <div className='grid grid-cols-3 gap-3'>
            <div>انبار ارسال کننده</div>
            <div>نحوه ارسال</div>
            <div>آخرین وضعیت</div>
        </div>
    </div>
)

export default TableHeader
