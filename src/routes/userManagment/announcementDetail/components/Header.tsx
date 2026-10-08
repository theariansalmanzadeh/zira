'use client'

import type { AnnouncementDetailData } from '../constants'

type HeaderProps = {
    data: AnnouncementDetailData
}

const Header = ({ data }: HeaderProps) => {
    return (
        <div className='flex flex-wrap items-start justify-between gap-4' dir='rtl'>
            <div className='flex min-w-0 flex-col items-start gap-1'>
                <h1 className='text-title-lg font-bold text-on-surface'>
                    {data.title}
                </h1>
                <span className='text-label-md text-outline' dir='ltr'>
                    {data.code}
                </span>
            </div>
            <div className='flex flex-wrap items-center gap-2'>
                <span className='rounded-full bg-warning-container px-3 py-1 text-label-md text-on-warning-container'>
                    اولویت: {data.priorityLabel}
                </span>
                <span className='rounded-full bg-surface-container-high px-3 py-1 text-label-md text-on-surface-variant'>
                    {data.subjectLabel}
                </span>
            </div>
        </div>
    )
}

export default Header
