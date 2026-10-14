'use client'

import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import { formatFaNumber } from '@/src/shared/libs/formatter'

type InfoField = {
    label: string
    value: string
}

type DepartmentSummaryProps = {
    name: string
    managerName: string
    expertCount: number
    responseHours: string
    description: string
}

const FieldItem = ({ label, value }: InfoField) => (
    <div className='flex min-w-0 flex-col gap-3 text-right'>
        <span className='text-label-md text-outline'>{label}</span>
        <span className='text-label-lg text-on-surface'>{value}</span>
    </div>
)

const DepartmentSummary = ({
    name,
    managerName,
    expertCount,
    responseHours,
    description,
}: DepartmentSummaryProps) => {
    return (
        <div
            className='rounded-card-lg bg-surface-container-lowest p-6'
            dir='rtl'
        >
            <div className='grid grid-cols-2 gap-6 md:grid-cols-5'>
                <FieldItem label='بخش مربوطه' value={name} />
                <div className='flex min-w-0 flex-col gap-3 text-right'>
                    <span className='text-label-md text-outline'>
                        مسئول دپارتمان
                    </span>
                    <div className='flex flex-row items-center gap-2'>
                        <Avatar size='sm' className='bg-surface-container-highest'>
                            <AvatarFallback className='bg-surface-container-highest text-label-sm text-on-surface-variant'>
                                {managerName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <span className='text-label-lg text-on-surface underline'>
                            {managerName}
                        </span>
                    </div>
                </div>
                <FieldItem
                    label='کارشناسان'
                    value={`${formatFaNumber(expertCount)} کارشناس`}
                />
                <FieldItem label='پاسخ SLA' value='—' />
                <FieldItem label='ساعت پاسخ‌گویی' value={responseHours} />
            </div>

            <div className='mt-6 flex flex-col gap-3 text-right'>
                <span className='text-label-md text-outline'>توضیحات</span>
                <span className='text-label-lg text-on-surface-variant'>
                    {description}
                </span>
            </div>
        </div>
    )
}

export default DepartmentSummary
