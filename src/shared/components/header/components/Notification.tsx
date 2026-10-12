'use client'

import { useState } from 'react'
import { useListStaffNotifications } from '@/src/routes/userManagment/hooks/me'
import type { StaffNotificationDelivery } from '@/src/api/types/admin/me'
import NotificationDetail from './NotificationDetail'
import IconButton from '@/src/shared/components/ui/IconButton'
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from '@/src/shared/components/ui/Popover'
import { formatFaDateTime } from '@/src/shared/libs/formatter'

const NotificationRow = ({
    item,
    onSelect,
}: {
    item: StaffNotificationDelivery
    onSelect: (item: StaffNotificationDelivery) => void
}) => {
    return (
        <button
            type='button'
            onClick={() => onSelect(item)}
            className='flex w-full flex-col gap-1 rounded-container-md px-3 py-2.5 text-right transition-colors hover:bg-surface-container-high'
        >
            <div className='flex items-start justify-between gap-2'>
                <span className='truncate text-label-lg font-semibold text-on-surface'>
                    {item.title || 'بدون عنوان'}
                </span>
                <span className='shrink-0 text-label-sm text-outline'>
                    {formatFaDateTime(item.sent_at || item.created_at)}
                </span>
            </div>
            <p className='line-clamp-2 text-label-md text-on-surface-variant'>
                {item.body}
            </p>
            {item.topic ? (
                <span className='text-label-sm text-outline'>{item.topic}</span>
            ) : null}
        </button>
    )
}

const Notification = () => {
    const { data, isPending, isError } = useListStaffNotifications()
    const notifications = data ?? []
    const [selected, setSelected] = useState<StaffNotificationDelivery | null>(
        null
    )

    return (
        <Popover>
            <PopoverTrigger>
                <IconButton icon='notification400Linear' />
            </PopoverTrigger>
            <PopoverContent
                align='end'
                side='bottom'
                sideOffset={8}
                className='w-96 max-w-[calc(100vw-2rem)] gap-0 overflow-hidden p-0'
                dir='rtl'
            >
                <PopoverHeader className='border-b border-outline-variant px-4 py-3'>
                    <PopoverTitle className='text-title-sm font-bold text-on-surface'>
                        اعلان‌ها
                    </PopoverTitle>
                </PopoverHeader>

                <div className='max-h-96 overflow-y-auto p-2'>
                    {selected ? (
                        <NotificationDetail
                            id={selected.id}
                            title={selected.title}
                            body={selected.body}
                            onBack={() => setSelected(null)}
                        />
                    ) : isPending ? (
                        <div className='flex flex-col gap-2 p-2'>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    key={index}
                                    className='h-16 animate-pulse rounded-container-md bg-surface-container-high'
                                />
                            ))}
                        </div>
                    ) : isError ? (
                        <p className='px-3 py-6 text-center text-label-md text-error'>
                            خطا در دریافت اعلان‌ها
                        </p>
                    ) : notifications.length === 0 ? (
                        <p className='px-3 py-6 text-center text-label-md text-outline'>
                            اعلانی وجود ندارد
                        </p>
                    ) : (
                        <div className='flex flex-col'>
                            {notifications.map((item) => (
                                <NotificationRow
                                    key={item.id}
                                    item={item}
                                    onSelect={setSelected}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default Notification
