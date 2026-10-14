'use client'

import { useState } from 'react'
import { Icon } from '@shared/components/Icons/Icon'
import { Avatar, AvatarFallback } from '@shared/components/ui/Avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@shared/components/ui/DropdownMenu'
import FormDropdown from '@shared/components/ui/FormDropdown'
import { Progress } from '@shared/components/ui/ProgressBar'
import { cn } from '@shared/libs/utils'
import type { TicketPriority } from '@/src/api/types/admin/support'
import { formatFaDateTime, formatFaNumber } from '@/src/shared/libs/formatter'
import {
    useCloseTicket,
    useReopenTicket,
    useUpdateTicketPriority,
} from '@/src/routes/support/hooks/support'
import type { TicketDetailView } from '../../utils/mapTicket'
import {
    TICKET_PRIORITY_OPTIONS,
    TICKET_STATUS_OPTIONS,
} from '../../utils/mapTicket'

type SelectOption = {
    label: string
    value: string
}

type DetailRowProps = {
    label: string
    value: React.ReactNode
    className?: string
}

type TicketSelectFieldProps = {
    label: string
    value: string
    options: SelectOption[]
    onChange: (value: string) => void
}

type SidebarProps = {
    ticket: TicketDetailView
}

const DetailRow = ({ label, value, className }: DetailRowProps) => (
    <div className={cn('flex flex-row items-center justify-between gap-3', className)}>
        <span className='shrink-0 text-label-md text-outline'>{label}</span>
        <div className='text-left text-label-md text-on-surface'>{value}</div>
    </div>
)

const PersonValue = ({ name }: { name: string }) => (
    <div className='flex flex-row items-center gap-2'>
        <Avatar size='sm' className='bg-surface-container-highest'>
            <AvatarFallback className='bg-surface-container-highest text-label-sm text-outline'>
                {name.charAt(0)}
            </AvatarFallback>
        </Avatar>
        <span>{name}</span>
    </div>
)

const TicketSelectField = ({
    label,
    value,
    options,
    onChange,
}: TicketSelectFieldProps) => {
    const selectedLabel = options.find((option) => option.value === value)?.label

    return (
        <div className='flex flex-col gap-1.5'>
            <span className='text-label-md text-on-surface-variant'>{label}</span>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        type='button'
                        className='flex h-10 w-full flex-row-reverse items-center justify-between gap-1.5 rounded-container-lg bg-surface-container-high px-3 text-right outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                    >
                        <Icon
                            label='chevronDown300Broken'
                            className='size-6 shrink-0 text-outline'
                        />
                        <span className='text-label-md text-outline'>
                            {selectedLabel ?? '—'}
                        </span>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align='start'
                    className='min-w-(--radix-dropdown-menu-trigger-width) rounded-card-md bg-surface-container-lowest p-sm shadow-lg ring-4 ring-outline-variant'
                >
                    {options.map((option) => (
                        <DropdownMenuItem
                            key={option.value}
                            className='cursor-pointer rounded-md px-2 py-1.5 text-outline focus:bg-surface-container-high'
                            onSelect={() => onChange(option.value)}
                        >
                            {option.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

const getSlaLabel = (ticket: TicketDetailView) => {
    if (ticket.isSlaBreached) return 'نقض‌شده'
    if (ticket.firstResponseMinutes != null) {
        return `${formatFaNumber(ticket.firstResponseMinutes)} دقیقه`
    }
    if (ticket.dueAt) return formatFaDateTime(ticket.dueAt)
    return '—'
}

const getSlaProgress = (ticket: TicketDetailView) => {
    if (ticket.isSlaBreached) return 100
    if (ticket.firstResponseMinutes != null) {
        return Math.min(100, Math.max(10, ticket.firstResponseMinutes))
    }
    return 0
}

const isTicketPriority = (value: string): value is TicketPriority =>
    value === 'URGENT' || value === 'IMPORTANT' || value === 'NORMAL'

const Sidebar = ({ ticket }: SidebarProps) => {
    const [status, setStatus] = useState(ticket.status)
    const [priority, setPriority] = useState(ticket.priority)
    const { mutate: updateTicketPriority } = useUpdateTicketPriority()
    const { mutate: closeTicket, isPending: isClosePending } = useCloseTicket()
    const { mutate: reopenTicket, isPending: isReopenPending } =
        useReopenTicket()

    const handlePriorityChange = (nextPriority: string) => {
        if (nextPriority === priority || !isTicketPriority(nextPriority)) return

        updateTicketPriority(
            { ticketId: ticket.id, body: { priority: nextPriority } },
            { onSuccess: (data) => setPriority(data.priority) }
        )
    }

    const handleStatusChange = (nextStatus: string) => {
        if (nextStatus === status || isClosePending || isReopenPending) return

        if (nextStatus === 'CLOSED') {
            closeTicket(
                { ticketId: ticket.id, body: { resolution: 'بسته شد' } },
                { onSuccess: (data) => setStatus(data.status) }
            )
            return
        }

        if (status === 'CLOSED') {
            reopenTicket(
                { ticketId: ticket.id, body: { reason: 'بازگشایی' } },
                { onSuccess: (data) => setStatus(data.status) }
            )
        }
    }

    return (
        <div
            className='flex flex-col gap-3 rounded-card-lg bg-surface-container-lowest p-6'
            dir='rtl'
        >
            <div className='flex flex-col gap-2'>
                <span className='text-title-md font-medium text-on-surface'>
                    مشخصات تیکت
                </span>
                <div className='flex flex-col gap-3'>
                    <DetailRow label='کد پیگیری' value={ticket.trackingCode} />
                    <DetailRow
                        label='مخاطب'
                        value={<PersonValue name={ticket.contactName} />}
                    />
                    <DetailRow label='نقش' value={ticket.contactRole} />
                    <DetailRow label='دپارتمان' value={ticket.departmentName} />
                    <DetailRow label='سند مرتبط' value={ticket.relatedEntity} />
                    <DetailRow
                        label='تاریخ ایجاد'
                        value={formatFaDateTime(ticket.createdAt)}
                    />
                    <DetailRow
                        label='اپراتور'
                        value={<PersonValue name={ticket.assigneeLabel} />}
                    />

                    <hr className='border-0 border-t border-dashed border-outline-variant' />

                    <div className='flex flex-col gap-2'>
                        <DetailRow label='SLA' value={getSlaLabel(ticket)} />
                        <Progress
                            value={getSlaProgress(ticket)}
                            className='h-1.5 bg-surface-container-highest'
                            indicatorClassName={
                                ticket.isSlaBreached ? 'bg-error' : 'bg-success'
                            }
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2 rounded-card-lg bg-surface-container-lowest p-6'>
                <span className='text-title-md font-medium text-on-surface'>
                    مدیریت تیکت
                </span>
                <div className='flex flex-col gap-3'>
                    <TicketSelectField
                        label='وضعیت'
                        value={status}
                        options={TICKET_STATUS_OPTIONS}
                        onChange={handleStatusChange}
                    />
                    <FormDropdown
                        label='اولویت'
                        value={priority}
                        options={TICKET_PRIORITY_OPTIONS}
                        onChange={handlePriorityChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
