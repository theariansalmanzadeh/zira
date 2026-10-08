import { Pill } from '@/src/shared/components/ui/Pill'

const Header = () => {
    return (
        <div
            className='flex flex-row items-center gap-4 rounded-card-lg bg-surface-container-low px-5 py-4'
            dir='rtl'
        >
            <div className='flex size-14 shrink-0 items-center justify-center rounded-full bg-[#C96B86] text-title-lg font-semibold text-white'>
                ع
            </div>
            <div className='flex min-w-0 flex-col gap-2'>
                <div className='flex flex-row flex-wrap items-center gap-2'>
                    <span className='text-title-md font-bold text-on-surface'>علی رضایی</span>
                    <Pill text='فعال' variant='success' />
                    <Pill text='سوپرادمین' variant='info' />
                </div>
                <div className='flex flex-row flex-wrap items-center gap-4 text-label-md text-outline'>
                    <span>
                        کد پرسنلی:{' '}
                        <span className='font-semibold text-on-surface'>PR2391</span>
                    </span>
                    <span>
                        نقش:{' '}
                        <span className='font-semibold text-on-surface'>مدیر سیستم</span>
                    </span>
                    <span className='font-semibold text-on-surface'>مدیر فناوری اطلاعات</span>
                    <span>
                        آخرین ورود:{' '}
                        <span className='text-on-surface'>۱۴۰۴/۰۹/۲۸ – ۰۹:۱۲</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Header
