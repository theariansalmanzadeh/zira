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
import { formatFaDateTime } from '@/src/shared/libs/formatter'

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

const DetailRow = ({ label, value, className }: DetailRowProps) => (
    <div className={cn('flex flex-row items-center justify-between gap-3', className)}>
        <span className="shrink-0 text-label-md text-outline">{label}</span>
        <div className="text-label-md text-on-surface text-left">{value}</div>
    </div>
)

const PersonValue = ({ name }: { name: string }) => (
    <div className="flex flex-row items-center gap-2">
        <Avatar size="sm" className="bg-surface-container-highest">
            <AvatarFallback className="bg-surface-container-highest text-label-sm text-outline">
                {name.charAt(0)}
            </AvatarFallback>
        </Avatar>
        <span>{name}</span>
    </div>
)

const TicketSelectField = ({ label, value, options, onChange }: TicketSelectFieldProps) => {
    const selectedLabel = options.find((option) => option.value === value)?.label

    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-label-md text-on-surface-variant">{label}</span>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        className="flex h-10 w-full flex-row-reverse items-center justify-between gap-1.5 rounded-container-lg bg-surface-container-high px-3 text-right outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <Icon
                            label="chevronDown300Broken"
                            className="size-6 shrink-0 text-outline"
                        />
                        <span className="text-label-md text-outline">
                            {selectedLabel}
                        </span>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="start"
                    className="min-w-(--radix-dropdown-menu-trigger-width) rounded-card-md bg-surface-container-lowest p-sm shadow-lg ring-4 ring-outline-variant"
                >
                    {options.map((option) => (
                        <DropdownMenuItem
                            key={option.value}
                            className="cursor-pointer rounded-md px-2 py-1.5 text-outline focus:bg-surface-container-high"
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

const STATUS_OPTIONS = [
    { label: 'در حال بررسی', value: 'reviewing' },
    { label: 'باز', value: 'open' },
    { label: 'منتظر کاربر', value: 'waiting' },
    { label: 'بسته', value: 'closed' },
]

const PRIORITY_OPTIONS = [
    { label: 'فوری', value: 'urgent' },
    { label: 'بالا', value: 'high' },
    { label: 'متوسط', value: 'medium' },
    { label: 'پایین', value: 'low' },
]

const Sidebar = () => {
    const [status, setStatus] = useState('reviewing')
    const [priority, setPriority] = useState('urgent')

    return (
        <div className="flex flex-col gap-3 rounded-card-lg bg-surface-container-lowest p-6" dir="rtl">
            <div className="flex flex-col gap-2">
                <span className="text-title-md font-medium text-on-surface">مشخصات تیکت</span>
                <div className="flex flex-col gap-3">
                    <DetailRow label="کد پیگیری" value="TC-5521" />
                    <DetailRow label="مخاطب" value={<PersonValue name="نام کاربر" />} />
                    <DetailRow label="نقش" value="مشتری" />
                    <DetailRow label="دپارتمان" value="انبار" />
                    <DetailRow label="سند مرتبط" value="SI-8902" />
                    <DetailRow
                        label="تاریخ ایجاد"
                        value={formatFaDateTime('2025-12-09T14:53:00.000Z')}
                    />
                    <DetailRow label="اپراتور" value={<PersonValue name="نام اپراتور" />} />

                    <hr className="border-0 border-t border-dashed border-outline-variant" />

                    <div className="flex flex-col gap-2">
                        <DetailRow label="SLA" value="۴۵ دقیقه از ۱ ساعت" />
                        <Progress
                            value={75}
                            className="h-1.5 bg-surface-container-highest"
                            indicatorClassName="bg-success"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 p-6 bg-surface-container-lowest rounded-card-lg">
                <span className="text-title-md font-medium text-on-surface">مدیریت تیکت</span>
                <div className="flex flex-col gap-3 ">
                    <TicketSelectField
                        label="وضعیت"
                        value={status}
                        options={STATUS_OPTIONS}
                        onChange={setStatus}
                    />
                    <FormDropdown
                        label="اولویت"
                        value={priority}
                        options={PRIORITY_OPTIONS}
                        onChange={setPriority}
                    />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
