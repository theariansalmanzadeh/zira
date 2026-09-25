'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { LOCATION_OPTIONS } from '../constants'
import type { NewTransferFormValues } from '../schema'
import LocationSelectField from './LocationSelectField'
import TransferPathConnector from './TransferPathConnector'

const LocationPathForm = () => {
    const { control } = useFormContext<NewTransferFormValues>()

    return (
        <div className='flex flex-col gap-1' dir='rtl'>
            <Controller
                name='fromLocationId'
                control={control}
                render={({ field }) => (
                    <LocationSelectField
                        label='مبدا (خود شعبه یا انبار)'
                        required
                        value={field.value}
                        options={LOCATION_OPTIONS}
                        onChange={field.onChange}
                    />
                )}
            />
            <TransferPathConnector />
            <Controller
                name='toLocationId'
                control={control}
                render={({ field }) => (
                    <LocationSelectField
                        label='مقصد (خود شعبه یا انبار)'
                        required
                        value={field.value}
                        options={LOCATION_OPTIONS}
                        onChange={field.onChange}
                    />
                )}
            />
        </div>
    )
}

export default LocationPathForm
