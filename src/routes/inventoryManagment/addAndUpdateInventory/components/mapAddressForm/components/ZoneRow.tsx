'use client'

import IconButton from '@/src/shared/components/ui/IconButton'
import { useMapAddress } from '../provider/MapAddressProvider'
import type { MapZone } from '../types'
import { Input } from '@/src/shared/components/ui/Input'

type ZoneRowProps = {
    zone: MapZone
}

const ZoneRow = ({ zone }: ZoneRowProps) => {
    const { updateZone, removeZone } = useMapAddress()

    return (
        <div className='grid grid-cols-[72px_minmax(0,0.7fr)_minmax(0,1.2fr)_minmax(0,1fr)_auto] items-center gap-3 bg-surface-container-lowest p-2 rounded-card-md'>
            <Input
                value={zone.prefix}
                onChange={(value) => updateZone(zone.id, { prefix: value })}
                wrapperClassName='justify-center'
                className='text-center'
            />
            <Input
                value={zone.zoneName}
                onChange={(value) => updateZone(zone.id, { zoneName: value })}
                wrapperClassName='justify-center'
                className='text-center'
            />
            <Input
                value={zone.usage}
                onChange={(value) => updateZone(zone.id, { usage: value })}
                wrapperClassName=''
            />
            <Input
                value={zone.shelves}
                onChange={(value) => updateZone(zone.id, { shelves: value })}
                wrapperClassName=''
            />
            <IconButton
                icon='closeSm400Linear'
                aria-label='حذف ناحیه'
                onClick={() => removeZone(zone.id)}
            />
        </div>
    )
}

export default ZoneRow
