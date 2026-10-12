'use client'

import { useEffect } from 'react'
import { useMarkStaffNotificationsSeen } from '@/src/routes/userManagment/hooks/me'
import IconButton from '@/src/shared/components/ui/IconButton'

type NotificationDetailProps = {
    id: string
    title: string
    body: string
    onBack: () => void
}

const NotificationDetail = ({
    id,
    title,
    body,
    onBack,
}: NotificationDetailProps) => {
    const { mutate } = useMarkStaffNotificationsSeen()

    useEffect(() => {
        if (!id) return
        mutate({ delivery_ids: [id] })
    }, [id, mutate])

    return (
        <div className='flex flex-col gap-3 p-4' dir='rtl'>
            <div className='flex items-center gap-2'>
                <IconButton
                    icon='arrorwRight400Linear'
                    variant='ghost'
                    className='size-8!'
                    iconClassName='size-5!'
                    onClick={onBack}
                />
                <h3 className='text-title-sm font-bold text-on-surface'>
                    {title || 'بدون عنوان'}
                </h3>
            </div>
            <p className='text-label-md leading-7 text-on-surface-variant'>
                {body}
            </p>
        </div>
    )
}

export default NotificationDetail
