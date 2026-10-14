import { Icon } from '@/src/shared/components/Icons/Icon'
import { Pill } from '@/src/shared/components/ui/Pill'

type RoleProps = {
    roles: string[]
}

const Role = ({ roles }: RoleProps) => {
    return (
        <div
            className='flex flex-col gap-5 rounded-card-lg bg-surface-container-lowest px-6 py-5'
            dir='rtl'
        >
            <div className='flex flex-col gap-2'>
                <div className='flex flex-row items-center gap-2'>
                    <span className='h-5 w-1 rounded-full bg-error' />
                    <span className='text-title-md font-bold text-on-surface'>
                        نقش سیستمی کاربر
                    </span>
                </div>
                <p className='text-body-md text-outline'>
                    هر کاربر فقط یک نقش دارد؛ نقش سراسری است و در همه شعب در دسترس کاربر معتبر است.
                </p>
            </div>

            <div className='flex flex-row items-center justify-center gap-2 rounded-card-md border border-warning/30 bg-warning-container px-4 py-3'>
                <Icon
                    label='info400Linear'
                    className='size-5! shrink-0 text-on-warning-container'
                />
                <p className='text-center text-label-md text-on-warning-container'>
                    شما مجاز به انتساب یا تغییر نقش برای حساب کاربری خود نیستید.
                </p>
            </div>

            <div className='flex flex-row flex-wrap gap-2'>
                {roles.map((role) => (
                    <Pill key={role} text={role} variant='info' />
                ))}
            </div>
        </div>
    )
}

export default Role
