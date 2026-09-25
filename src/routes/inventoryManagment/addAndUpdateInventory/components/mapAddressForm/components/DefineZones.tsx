'use client'

import { Button } from '@/src/shared/components/ui/button'
import { useMapAddress } from '../provider/MapAddressProvider'
import ZoneRow from './ZoneRow'
import { Icon } from '@/src/shared/components/Icons/Icon'

const DefineZones = () => {
    const { zones, addZone, setAddressStep } = useMapAddress()

    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <div className='grid grid-cols-[72px_minmax(0,1.9fr)_minmax(0,1fr)_auto] gap-3 px-1 text-label-md text-outline'>
                <div>پیشوند</div>
                <div>نام ناحیه کاربری ناحیه</div>
                <div>قفسه‌ها</div>
                <div />
            </div>
            <div className='flex flex-col gap-3'>
                {zones.map((zone) => (
                    <ZoneRow key={zone.id} zone={zone} />
                ))}
            </div>
            <div className='flex items-center justify-between gap-3 pt-2'>
                <button
                    type='button'
                    className='text-label-lg text-error cursor-pointer'
                    onClick={addZone}
                >
                    + افزودن ناحیه
                </button>
                <Button
                    type='button'
                    className='rounded-button-lg bg-inverse-surface px-6 text-on-inverse-surface hover:bg-inverse-surface/90'
                    onClick={() => setAddressStep(2)}
                >
                    قفسه‌ها
                    <Icon label='chevronLeft400Linear' className='size-4' />
                </Button>
            </div>
        </div>
    )
}

export default DefineZones
