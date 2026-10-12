'use client'

import { useTable } from '@/src/shared/context/TableProvider'
import { usePricingGridStyle } from './pricingTableShared'

const PricingTableHeader = ({ showAmount = false }: { showAmount?: boolean }) => {
    const { visibleTableColoumn } = useTable()
    const gridStyle = usePricingGridStyle(showAmount)

    return (
        <div
            className='grid items-center px-2 py-3 text-label-lg font-normal text-outline'
            style={gridStyle}
        >
            {visibleTableColoumn.map((column) => (
                <span key={column.id} className='px-2'>
                    {column.header_label}
                </span>
            ))}
            {showAmount && <span className='px-2'>تعداد</span>}
        </div>
    )
}

export default PricingTableHeader
