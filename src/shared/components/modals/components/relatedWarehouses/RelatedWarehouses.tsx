'use client'

import type { BaseModalProps } from '../../types'
import { RELATED_WAREHOUSES_DUMMY } from './constants'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

const RelatedWarehouses = ({ closeModal }: BaseModalProps) => {
    return (
        <div className='flex w-full flex-col gap-4' dir='rtl'>
            <div className='overflow-x-auto rounded-card-lg bg-surface-container-high p-2'>
                <div className='overflow-hidden rounded-card-md bg-surface-container-lowest'>
                    <TableHeader />
                    <div className='flex flex-col'>
                        {RELATED_WAREHOUSES_DUMMY.map((item) => (
                            <TableRow
                                key={item.id}
                                data={item}
                                onNavigate={closeModal}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RelatedWarehouses
