'use client'

import Conversation from '@/src/shared/components/conversation/Conversation'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import { useGetTicket } from '../../hooks/support'
import { mapTicketDetailToView } from '../utils/mapTicket'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

type TicketDetailProps = {
    id: string
}

const TicketDetail = ({ id }: TicketDetailProps) => {
    const { data, isPending, isError } = useGetTicket(id)

    if (isPending) {
        return <TableLoadingSkeleton isPending rows={6} />
    }

    if (isError || !data) {
        return (
            <div
                className='rounded-card-md bg-surface-container-lowest px-4 py-8 text-center text-label-md text-outline'
                dir='rtl'
            >
                دریافت جزئیات تیکت با خطا مواجه شد.
            </div>
        )
    }

    const ticket = mapTicketDetailToView(data)

    return (
        <div className='flex flex-col gap-6' dir='rtl'>
            <Header
                ticketCode={ticket.trackingCode}
                statusText={ticket.statusText}
                statusVariant={ticket.statusVariant}
                subtitle={ticket.subject}
            />
            <div className='grid grid-cols-12 gap-6'>
                <div className='col-span-12 lg:col-span-9'>
                    <Conversation />
                </div>
                <div className='col-span-12 lg:col-span-3'>
                    <Sidebar
                        key={`${ticket.id}-${ticket.status}-${ticket.priority}`}
                        ticket={ticket}
                    />
                </div>
            </div>
        </div>
    )
}

export default TicketDetail
