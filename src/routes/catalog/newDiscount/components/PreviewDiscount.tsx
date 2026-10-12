import { Icon } from '@/src/shared/components/Icons/Icon'

type PreviewRowProps = {
    label: string
    value: string
}

const PreviewRow = ({ label, value }: PreviewRowProps) => (
    <div className='flex flex-row items-center justify-between gap-3'>
        <span className='text-label-md text-outline'>{label}</span>
        <span className='text-label-md text-on-surface-variant'>{value}</span>
    </div>
)

const PreviewDiscount = () => {
    return (
        <div className='w-full' dir='rtl'>
            <span className='mb-3 block text-label-lg text-outline'>خلاصه</span>

            <div className='flex flex-col gap-3 rounded-card-md bg-surface-container-lowest p-6'>
                <PreviewRow label='کد' value='SC-1404-04-11' />
                <PreviewRow label='نوع' value='کامل' />
                <PreviewRow label='روی' value='همه کالاها' />
                <PreviewRow label='برای' value='همه مشتریان' />

                <hr className='border-0 border-t border-dashed border-outline-variant' />

                <PreviewRow label='بازه' value='1404/12/02-1404/12/20' />
                <PreviewRow label='حداقل خرید' value='1 عدد' />

                <hr className='border-0 border-t border-dashed border-outline-variant' />

                <div className='flex flex-row items-start gap-3 rounded-card-md bg-info-container p-3'>
                    <Icon label='receipt' className='shrink-0' fill='fill-info' />
                    <p className='text-label-md text-on-surface-variant'>
                        ۱۰٪ تخفیف روی کالاهای منتخب برای مشتریان طلایی و نقره‌ای، از ۱ تا ۱۵ خرداد.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PreviewDiscount
