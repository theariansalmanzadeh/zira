import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import { cn } from '@shared/libs/utils'
import { DetailCard, DetailRow } from './DetailCard'

const OrderInfoCard = ({ className }: { className?: string }) => {
    return (
        <DetailCard title='جزئیات سفارش' className={cn(className)}>
            <DetailRow label='شناسه' value='PO-982041' />
            <DetailRow label='تاریخ ثبت' value='1404/11/23 – 18:23' />
            <DetailRow label='تعداد اقلام' value='4 ردیف / 43 قلم' />

            <div className='border-t border-dashed border-outline-variant' />

            <div className='flex flex-row items-center justify-between gap-3'>
                <span className='text-label-md text-outline shrink-0'>مشتری</span>
                <div className='flex flex-row items-center gap-2'>
                    <span className='text-label-lg text-on-surface underline'>آراد صفوی</span>
                    <Avatar size='sm'>
                        <AvatarFallback className='bg-surface-container-highest text-label-sm text-on-surface-variant'>
                            آ
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </DetailCard>
    )
}

export default OrderInfoCard
