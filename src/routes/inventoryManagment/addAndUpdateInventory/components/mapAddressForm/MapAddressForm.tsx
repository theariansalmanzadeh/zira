'use client'

import type { Dispatch, SetStateAction } from 'react'
import { MapAddressProvider, useMapAddress } from './provider/MapAddressProvider'
import DefineShelves from './components/DefineShelves'
import ReviewMap from './components/ReviewMap'
import DefineZones from './components/DefineZones'
import Stepper from './components/Stepper'
import { Button } from '@/src/shared/components/ui/button'

type MapAddressFormProps = {
    setActiveStep: Dispatch<SetStateAction<number>>
}

const MapAddressFormContent = ({ setActiveStep }: MapAddressFormProps) => {
    const { addressStep } = useMapAddress()

    return (
        <div className='flex flex-col gap-4 bg-surface-container-lowest p-2 rounded-card-md' dir='rtl'>
            <Stepper />
            <div className='rounded-card-md bg-surface-container-high p-4'>
                {addressStep === 1 && <DefineZones />}
                {addressStep === 2 && <DefineShelves />}
                {addressStep === 3 && <ReviewMap />}
            </div>
            <div className='flex gap-3 mt-5'>
                <Button
                    type='button'
                    variant='primary'
                    size='lg'
                    className='w-full text-label-lg grow'
                    onClick={() => setActiveStep(3)}
                >
                    ثبت انبار
                </Button>
                <Button
                    type='button'
                    variant='outline'
                    size='lg'
                    className='text-label-lg text-outline'
                    onClick={() => setActiveStep(2)}
                >
                    بازگشت
                </Button>
            </div>
        </div>
    )
}

const MapAddressForm = (props: MapAddressFormProps) => (
    <MapAddressProvider>
        <MapAddressFormContent {...props} />
    </MapAddressProvider>
)

export default MapAddressForm
