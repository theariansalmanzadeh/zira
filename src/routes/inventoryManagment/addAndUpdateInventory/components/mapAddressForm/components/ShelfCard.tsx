'use client'

import { formatFaNumber } from '@/src/shared/libs/formatter'
import { parseCount } from '../provider/MapAddressProvider'
import type { MapRack } from '../types'

type ShelfCardProps = {
    label: string
    rack: MapRack
}

const ShelfCard = ({ label, rack }: ShelfCardProps) => {
    const floors = parseCount(rack.floors)
    const boxes = parseCount(rack.boxesPerFloor)
    const capacity = floors * boxes

    return (
        <div className='flex min-w-44 flex-col items-center gap-1 rounded-card-md border border-outline-variant bg-surface-container-lowest px-4 py-3 text-center'>
            <span className='text-label-lg font-semibold text-on-surface'>{label}</span>
            <span className='text-label-sm text-outline'>
                {formatFaNumber(floors)} طبقه × {formatFaNumber(boxes)} جعبه ={' '}
                {formatFaNumber(capacity)} آدرس
            </span>
        </div>
    )
}

export default ShelfCard
