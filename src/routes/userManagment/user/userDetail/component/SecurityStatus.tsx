import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { Pill } from '@/src/shared/components/ui/Pill'

const SectionTitle = ({ title }: { title: string }) => (
    <div className='flex flex-row items-center gap-2'>
        <span className='h-5 w-1 rounded-full bg-error' />
        <span className='text-title-md font-bold text-on-surface'>{title}</span>
    </div>
)

const SecurityStatus = () => {
    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <section className='flex flex-row items-center justify-between gap-4 rounded-card-lg bg-surface-container-lowest px-6 py-5'>
                <div className='flex min-w-0 flex-col gap-2'>
                    <SectionTitle title='وضعیت حساب' />
                    <p className='text-body-md text-outline'>
                        وضعیت حساب مدیر ارشد سامانه از این بخش قابل تغییر نیست.
                    </p>
                </div>
                <div className='flex shrink-0 flex-row items-center gap-2'>
                    <span className='text-label-md text-outline'>وضعیت فعلی:</span>
                    <Pill text='فعال' variant='success' />
                </div>
            </section>

            <section className='flex flex-col gap-4 rounded-card-lg bg-surface-container-lowest px-6 py-5'>
                <div className='flex flex-col gap-2'>
                    <SectionTitle title='بازنشانی رمز عبور' />
                    <p className='text-body-md text-outline'>
                        یک رمز امن به‌صورت خودکار ساخته می‌شود و{' '}
                        <span className='font-semibold text-on-surface'>فقط یک‌بار</span>{' '}
                        نمایش داده می‌شود. آن را از طریق کانال امن به کاربر تحویل دهید.
                    </p>
                </div>
                <div className='flex flex-row items-center justify-between gap-4'>
                    <p className='text-body-md text-outline'>
                        رمز قبلی نمایش داده شد و دیگر قابل مشاهده نیست.
                    </p>
                    <Button
                        type='button'
                        variant='outline'
                        className='shrink-0 border-error text-error'
                    >
                        <Icon label='key400Linear' className='size-4! text-error' />
                        <span>تولید رمز جدید</span>
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default SecurityStatus
