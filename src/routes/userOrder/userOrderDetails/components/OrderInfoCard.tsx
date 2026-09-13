import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import { cn } from '@shared/libs/utils'
import { DetailCard, DetailRow } from './DetailCard'

const OrderInfoCard = ({ className }: { className?: string }) => {
    return (
        <DetailCard title='جزئیات سفارش' className={cn(className)}>
            <DetailRow label='شناسه' value='PO-982041' />
            <DetailRow label='تاریخ ثبت' value='1404/11/23 – 18:23' />
            <DetailRow label='تعداد اقلام' value='4 ردیف / 43 قلم' />
        </DetailCard>
    )
}

export default OrderInfoCard
