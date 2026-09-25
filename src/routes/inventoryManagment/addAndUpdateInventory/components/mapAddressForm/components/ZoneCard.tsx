'use client'

import { formatFaNumber } from '@/src/shared/libs/formatter'
import { parseCount } from '../provider/MapAddressProvider'
import type { MapZone } from '../types'
import ShelfCard from './ShelfCard'

type ZoneCardProps = {
    zone: MapZone
}

const ZoneCard = ({ zone }: ZoneCardProps) => {
    const addressCount = zone.racks.reduce(
        (sum, rack) => sum + parseCount(rack.floors) * parseCount(rack.boxesPerFloor),
        0
    )

    return (
        <div className='flex flex-col gap-4 rounded-card-md border border-outline-variant bg-surface-container-lowest p-4'>
            <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center gap-3'>
                    <span className='inline-flex size-9 items-center justify-center rounded-card-sm bg-error-container text-label-lg font-semibold text-error'>
                        {zone.prefix}
                    </span>
                    <span className='text-title-sm font-semibold text-on-surface'>
                        {zone.zoneName}
                    </span>
                    <span className='text-label-lg text-outline'>{zone.usage}</span>
                </div>
                <span className='text-label-md text-outline'>
                    {formatFaNumber(zone.racks.length)} قفسه · {formatFaNumber(addressCount)}{' '}
                    آدرس
                </span>
            </div>
            <div className='flex flex-wrap gap-3'>
                {zone.racks.map((rack, index) => (
                    <ShelfCard
                        key={rack.id}
                        label={`${zone.prefix}-R${index + 1}`}
                        rack={rack}
                    />
                ))}
            </div>
        </div>
    )
}

export default ZoneCard
