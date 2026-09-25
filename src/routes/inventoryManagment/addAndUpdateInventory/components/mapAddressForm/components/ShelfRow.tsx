'use client'

import { Input } from '@/src/shared/components/ui/Input'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { parseCount, useMapAddress } from '../provider/MapAddressProvider'
import type { MapRack } from '../types'

const digitsOnly = (value: string) => value.replace(/[^0-9۰-۹]/g, '')

type ShelfRowProps = {
    zoneId: string
    label: string
    rack: MapRack
}

const ShelfRow = ({ zoneId, label, rack }: ShelfRowProps) => {
    const { updateRack } = useMapAddress()
    const capacity = parseCount(rack.floors) * parseCount(rack.boxesPerFloor)

    return (
        <div className='grid grid-cols-4 items-center gap-3 rounded-card-md bg-surface-container-lowest p-2'>
            <div className='px-3 text-label-lg text-on-surface'>{label}</div>
            <Input
                value={rack.floors}
                inputMode='numeric'
                onChange={(value) =>
                    updateRack(zoneId, rack.id, { floors: digitsOnly(value) })
                }
            />
            <Input
                value={rack.boxesPerFloor}
                inputMode='numeric'
                onChange={(value) =>
                    updateRack(zoneId, rack.id, {
                        boxesPerFloor: digitsOnly(value),
                    })
                }
            />
            <div className='px-3 text-label-lg text-on-surface'>
                {formatFaNumber(capacity)}
            </div>
        </div>
    )
}

export default ShelfRow
