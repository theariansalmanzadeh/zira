'use client'

import { useRouter } from 'next/navigation'
import IconButton from '@shared/components/ui/IconButton'
import { Pill, PillVariants } from '@shared/components/ui/Pill'
import { cn } from '@shared/libs/utils'
import { VariantProps } from 'class-variance-authority'
import InfoCardField, { InfoCardFieldProps } from './components/InfoCardField'

export interface InfoCardProps {
    title: string
    subtitle: string
    status?: string
    statusVariant?: VariantProps<typeof PillVariants>['variant']
    manager?: InfoCardFieldProps
    email?: InfoCardFieldProps
    phone?: InfoCardFieldProps
    address?: InfoCardFieldProps
    managerAvatar?: boolean
    onEdit?: () => void
    href?: string
    className?: string
}

const InfoCard = ({
    title,
    subtitle,
    status = 'فعال',
    statusVariant = 'success',
    manager = { label: 'مسئول انبار', value: 'نام مسئول' },
    email = { label: 'ایمیل', value: 'branch@company.com' },
    phone = { label: 'شماره تماس', value: '+98 21 67215421' },
    address,
    managerAvatar = false,
    onEdit,
    href,
    className,
}: InfoCardProps) => {
    const { push } = useRouter()

    return (
        <div
            className={cn(
                'flex flex-col gap-2 rounded-card-md bg-surface-container-high p-2',
                className
            )}
            dir='rtl'
        >
            <div className='gap-6 rounded-card-md bg-surface-container-lowest p-3'>
                <div className='flex items-start justify-between gap-3'>
                    <div className='flex flex-col gap-2 text-right'>
                        <h3 className='text-title-lg font-medium text-on-surface'>
                            {title}
                        </h3>
                        <span className='text-label-md text-outline'>
                            {subtitle}
                        </span>
                    </div>
                    <Pill
                        variant={statusVariant}
                        text={status}
                        className='shrink-0 border-0'
                    />
                </div>
                <hr className='my-6 border-0 border-t border-dashed border-outline-variant' />
                <div className='flex flex-col gap-6'>
                    {managerAvatar ? (
                        <div className='flex flex-col gap-1 text-right'>
                            <span className='text-label-lg text-outline'>
                                {manager.label}
                            </span>
                            <div className='flex flex-row items-center gap-2'>
                                <div className='h-8 w-8 shrink-0 rounded-full bg-surface-container-highest' />
                                <span className='text-label-md text-on-surface-variant'>
                                    {manager.value}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <InfoCardField
                            label={manager.label}
                            value={manager.value}
                        />
                    )}
                    <div className='grid grid-cols-2 gap-4'>
                        <InfoCardField
                            label={email.label}
                            value={email.value}
                        />
                        <InfoCardField
                            label={phone.label}
                            value={phone.value}
                        />
                    </div>
                    {address && (
                        <InfoCardField
                            label={address.label}
                            value={address.value}
                        />
                    )}
                </div>
            </div>
            <div className='flex justify-end gap-2'>
                <IconButton
                    icon='edit400Linear'
                    iconClassName='size-6'
                    className='rounded-card-md bg-surface-container-lowest'
                    onClick={onEdit}
                />
                {href && (
                    <IconButton
                        icon='chevronLeft400Linear'
                        iconClassName='size-6'
                        className='rounded-card-md bg-surface-container-lowest'
                        onClick={() => push(href)}
                    />
                )}
            </div>
        </div>
    )
}

export default InfoCard
