import { cn } from '@shared/libs/utils'
import { DetailCard, DetailRow } from './DetailCard'

const RecipientInfoCard = ({ className }: { className?: string }) => {
    return (
        <DetailCard title='اطلاعات تحویل گیرنده' className={cn(className)}>
            <DetailRow label='شماره تماس' value='+98 912 2571 928' />
            <DetailRow label='نام و نام خانوادگی' value='نریمان امیری' />
            <div className='flex flex-col gap-1'>
                <span className='text-label-md text-outline'>آدرس</span>
                <span className='text-label-lg text-on-surface'>
                    تهران، پاسداران، اطلس مال، طبقه 11، پلاک 10
                </span>
            </div>
        </DetailCard>
    )
}

export default RecipientInfoCard
