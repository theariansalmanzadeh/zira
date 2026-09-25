'use client'

import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@/src/shared/libs/utils'
import { parseCount, useMapAddress } from '../provider/MapAddressProvider'

const Stepper = () => {
    const { zones, addressStep } = useMapAddress()
    const totalShelves = zones.reduce((sum, zone) => sum + parseCount(zone.shelves), 0)

    const steps = [
        {
            step: 1,
            title: 'تعریف نواحی',
            subtitle: `${formatFaNumber(zones.length)} ناحیه`,
        },
        {
            step: 2,
            title: 'قفسه‌هاو طبقات',
            subtitle: `${formatFaNumber(totalShelves)} قفسه در کل`,
        },
        {
            step: 3,
            title: 'مرور نقشه',
            subtitle: 'ظرفیت: ۸۲ آدرس',
        },
    ]

    return (
        <div
            className='flex items-center justify-between gap-3 rounded-card-md bg-surface-container-lowest px-6 py-4'
            dir='rtl'
        >
            {steps.map((item, index) => {
                const isActive = addressStep === item.step
                return (
                    <div key={item.step} className='flex min-w-0 flex-1 items-center gap-3'>
                        <div className='flex min-w-0 items-center gap-3'>
                            <span
                                className={cn(
                                    'inline-flex size-8 shrink-0 items-center justify-center rounded-full text-label-md',
                                    isActive
                                        ? 'bg-error text-on-error'
                                        : 'border border-outline-variant text-outline'
                                )}
                            >
                                {formatFaNumber(item.step)}
                            </span>
                            <div className='flex min-w-0 flex-col text-right'>
                                <span
                                    className={cn(
                                        'truncate text-label-lg',
                                        isActive
                                            ? 'font-semibold text-on-surface'
                                            : 'text-outline'
                                    )}
                                >
                                    {item.title}
                                </span>
                                <span className='text-label-sm text-outline'>
                                    {item.subtitle}
                                </span>
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <span className='h-px min-w-6 flex-1 bg-outline-variant' />
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default Stepper
