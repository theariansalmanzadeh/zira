'use client'

import { Button } from '@/src/shared/components/ui/button'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { useMapAddress } from '../provider/MapAddressProvider'
import ShelfRow from './ShelfRow'

const DefineShelves = () => {
    const { zones, setAddressStep } = useMapAddress()

    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <div className='grid grid-cols-4 gap-3 px-1 text-label-md text-outline'>
                <div>قفسه</div>
                <div>تعداد طبقات</div>
                <div>جعبه در هر طبقه</div>
                <div>ظرفیت آدرس</div>
            </div>
            <div className='flex flex-col gap-3'>
                {zones.map((zone) => (
                    <div key={zone.id} className='flex flex-col gap-3'>
                        <div className='flex items-center gap-3'>
                            <span className='shrink-0 text-label-lg font-semibold text-on-surface'>
                                {zone.prefix}
                            </span>
                            <span className='h-px flex-1 bg-outline-variant' />
                        </div>
                        {zone.racks.map((rack, index) => (
                            <ShelfRow
                                key={rack.id}
                                zoneId={zone.id}
                                label={`${zone.prefix}-R${index + 1}`}
                                rack={rack}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className='flex items-center justify-between gap-3 pt-2'>
                <button
                    type='button'
                    className='cursor-pointer text-label-lg text-primary'
                    onClick={() => setAddressStep(1)}
                >
                    بازگشت
                </button>
                <Button
                    type='button'
                    className='rounded-button-lg bg-inverse-surface px-6 text-on-inverse-surface hover:bg-inverse-surface/90'
                    onClick={() => setAddressStep(3)}
                >
                    مرور نقشه
                    <Icon label='chevronLeft400Linear' className='size-4' />
                </Button>
            </div>
        </div>
    )
}

export default DefineShelves
