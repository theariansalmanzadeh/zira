import { cn } from '@shared/libs/utils'
import { DetailCard, DetailRow } from './DetailCard'

const PaymentInfoCard = ({ className }: { className?: string }) => {
    return (
        <DetailCard title='اطلاعات پرداخت' className={cn(className)}>
            <DetailRow label='نوع تسویه' value='نقدی' />
            <DetailRow label='روش پرداخت' value='نقدی' />
            <DetailRow label='درگاه بانکی' value='زرین پال' />
            <DetailRow label='کد پیگیری پرداخت' value='1239131988804' />
            <DetailRow label='تاریخ تسویه' value='1404/11/23 – 18:23' />
        </DetailCard>
    )
}

export default PaymentInfoCard
