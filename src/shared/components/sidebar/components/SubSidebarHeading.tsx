import React from 'react'
import { Icon } from '../../Icons/Icon'
import { IconLabel } from '@/src/shared/types/icon'

type SubSidebarHeadingProps = {
    icon: IconLabel
    header: string
    subheader: string
}

const SubSidebarHeading = ({ icon, header, subheader }: SubSidebarHeadingProps) => {
    return (
        <div className='p-1 flex flex-row items-center gap-2'>
            <div className='w-10 h-10 flex items-center justify-center bg-primary/16 rounded-card-md'>
                <Icon label={icon} className=' stroke-primary text-primary  ' />
            </div>
            <div>
                <h3 className='text-label-md text-on-surface'>{header}</h3>
                <p className='text-label-sm text-on-surface-variant text-nowrap'>{subheader}</p>
            </div>
        </div>
    )
}

export default SubSidebarHeading
