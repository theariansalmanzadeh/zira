'use client'

import { useState } from 'react'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Pill } from '@/src/shared/components/ui/Pill'
import {
    BOX_OPTIONS,
    RACK_OPTIONS,
    SHELF_OPTIONS,
    STOCK_RETURN_DETAILS_DEFAULTS,
    ZONE_OPTIONS,
    buildWarehouseAddress,
} from '../constants'

export type WarehouseAddressValue = {
    zoneId: string
    rackId: string
    shelfId: string
    boxId: string
}

type WarehouseAddressingProps = {
    value?: Partial<WarehouseAddressValue>
    onChange?: (value: WarehouseAddressValue) => void
}

const WarehouseAddressing = ({
    value,
    onChange,
}: WarehouseAddressingProps) => {
    const [zoneId, setZoneId] = useState(
        value?.zoneId ?? STOCK_RETURN_DETAILS_DEFAULTS.zoneId
    )
    const [rackId, setRackId] = useState(
        value?.rackId ?? STOCK_RETURN_DETAILS_DEFAULTS.rackId
    )
    const [shelfId, setShelfId] = useState(
        value?.shelfId ?? STOCK_RETURN_DETAILS_DEFAULTS.shelfId
    )
    const [boxId, setBoxId] = useState(
        value?.boxId ?? STOCK_RETURN_DETAILS_DEFAULTS.boxId
    )

    const emitChange = (next: WarehouseAddressValue) => {
        onChange?.(next)
    }

    const generatedAddress = buildWarehouseAddress(
        zoneId,
        rackId,
        shelfId,
        boxId
    )

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <div className='flex flex-col gap-4 rounded-card-md border border-outline-variant bg-surface-container-lowest p-4'>
                <span className='text-label-lg font-medium text-on-surface'>
                    آدرس کالا در انبار (انتخاب مرحله‌ای)
                </span>

                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
                    <FormDropdown
                        label='ناحیه'
                        value={zoneId}
                        options={ZONE_OPTIONS}
                        onChange={(next) => {
                            setZoneId(next)
                            emitChange({
                                zoneId: next,
                                rackId,
                                shelfId,
                                boxId,
                            })
                        }}
                    />
                    <FormDropdown
                        label='قفسه'
                        value={rackId}
                        options={RACK_OPTIONS}
                        onChange={(next) => {
                            setRackId(next)
                            emitChange({
                                zoneId,
                                rackId: next,
                                shelfId,
                                boxId,
                            })
                        }}
                    />
                    <FormDropdown
                        label='طبقه'
                        value={shelfId}
                        options={SHELF_OPTIONS}
                        onChange={(next) => {
                            setShelfId(next)
                            emitChange({
                                zoneId,
                                rackId,
                                shelfId: next,
                                boxId,
                            })
                        }}
                    />
                    <FormDropdown
                        label='جعبه'
                        value={boxId}
                        options={BOX_OPTIONS}
                        onChange={(next) => {
                            setBoxId(next)
                            emitChange({
                                zoneId,
                                rackId,
                                shelfId,
                                boxId: next,
                            })
                        }}
                    />
                </div>

                <div className='border-t border-dashed border-outline-variant' />

                <div className='flex flex-row flex-wrap items-center gap-3'>
                    <span className='text-label-md text-on-surface-variant'>
                        آدرس تولید شده
                    </span>
                    {generatedAddress ? (
                        <Pill
                            text={generatedAddress}
                            variant='success'
                            className='border-0'
                        />
                    ) : (
                        <span className='text-label-md text-outline'>—</span>
                    )}
                </div>
            </div>

            <p className='text-label-sm text-outline'>
                ناحیه ← قفسه ← طبقه ← جعبه را انتخاب کنید؛ آدرس خودکار ساخته
                می‌شود. برای مرجوعی ناحیه قرنطینه پیشنهاد می‌شود.
            </p>
        </div>
    )
}

export default WarehouseAddressing
