'use client'

import { useMapAddress } from '../provider/MapAddressProvider'
import ZoneCard from './ZoneCard'

const ReviewMap = () => {
    const { zones } = useMapAddress()

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            {zones.map((zone) => (
                <ZoneCard key={zone.id} zone={zone} />
            ))}
        </div>
    )
}

export default ReviewMap
