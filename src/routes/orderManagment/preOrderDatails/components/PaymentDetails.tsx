import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import { cn } from '@shared/libs/utils'

type DetailRowProps = {
    label: string
    value: React.ReactNode
}

const DetailRow = ({ label, value }: DetailRowProps) => {
    return (
        <div className='flex flex-row items-center justify-between gap-3'>
            <span className='text-label-md text-outline shrink-0'>{label}</span>
            <div className='text-label-lg text-on-surface text-left'>{value}</div>
        </div>
    )
}

type DetailCardProps = {
    title: string
    children: React.ReactNode
    className?: string
}

const DetailCard = ({ title, children, className }: DetailCardProps) => {
    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <span className='text-title-md font-medium text-outline'>{title}</span>
            <div className='rounded-card-lg bg-surface-container-lowest p-6 flex flex-col gap-3'>
                {children}
            </div>
        </div>
    )
}

const PaymentDetails = ({ className }: { className?: string }) => {
    return (
        <div className={cn('flex flex-col gap-3', className)} dir='rtl'>
            <DetailCard title='جزئیات سفارش'>
                <DetailRow label='شناسه' value='PO-982041' />
                <DetailRow label='تاریخ ثبت' value='1404/11/23 – 18:23' />

                <div className='border-t border-dashed border-outline-variant' />

                <div className='flex flex-col items-start justify-between gap-3'>
                    <span className='text-label-md text-outline shrink-0'>مشتری</span>
                    <div className='flex flex-row items-center justify-between gap-2 w-full'>
                        <div className='flex flex-row items-center gap-2'>
                            <Avatar size='sm'>
                                <AvatarFallback className='bg-surface-container-highest text-label-sm text-on-surface-variant'>
                                    م
                                </AvatarFallback>
                            </Avatar>
                            <span className='text-label-lg text-on-surface-variant underline'>مهرا راد</span>
                        </div>
                        <span className='text-label-sm text-on-surface-variant'>سطح برنزی</span>
                    </div>
                </div>

                <DetailRow label='مانده اعتبار چک' value='80,000,000 تومان' />
                <DetailRow label='امتیاز خوش‌حسابی' value='92' />
            </DetailCard>

            <DetailCard title='اطلاعات بیعانه'>
                <DetailRow label='مبلغ بیعانه' value='10,000,000 تومان' />
                <DetailRow label='مهلت واریز' value='1404/11/25' />
                <DetailRow label='وضعیت پرداخت' value='پرداخت شده' />
                <DetailRow label='تاریخ پرداخت' value='1404/11/23 – 18:23' />
            </DetailCard>
        </div>
    )
}

export default PaymentDetails
