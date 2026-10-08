'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/src/shared/components/ui/Avatar'
import { Button } from '@/src/shared/components/ui/button'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Pill, PillVariants } from '@/src/shared/components/ui/Pill'
import { cn } from '@/src/shared/libs/utils'
import { VariantProps } from 'class-variance-authority'

type InfoField = {
    label: string
    value: string
}

type ManagerField = InfoField & {
    avatarUrl?: string
    avatarFallback?: string
}

export type DepartmentHeaderCardProps = {
    title?: string
    identifier?: string
    status?: string
    statusVariant?: VariantProps<typeof PillVariants>['variant']
    relatedSection?: InfoField
    manager?: ManagerField
    experts?: InfoField
    slaResponse?: InfoField
    responseHours?: InfoField
    description?: InfoField
    onAddUser?: () => void
    onSettings?: () => void
    className?: string
}

const FieldItem = ({ label, value }: InfoField) => (
    <div className="flex min-w-0 flex-col gap-3 text-right">
        <span className="text-label-md text-outline">{label}</span>
        <span className="text-label-lg text-on-surface">{value}</span>
    </div>
)

const ManagerItem = ({
    label,
    value,
    avatarUrl,
    avatarFallback,
}: ManagerField) => (
    <div className="flex min-w-0 flex-col gap-3 text-right">
        <span className="text-label-md text-outline">{label}</span>
        <div className="flex flex-row items-center gap-2">
            <Avatar size="sm" className="bg-surface-container-highest">
                {avatarUrl && <AvatarImage src={avatarUrl} alt={value} />}
                <AvatarFallback className="bg-surface-container-highest text-label-sm text-on-surface-variant">
                    {avatarFallback ?? value.charAt(0)}
                </AvatarFallback>
            </Avatar>
            <span className="text-label-lg text-on-surface underline">
                {value}
            </span>
        </div>
    </div>
)

const DepartmentHeaderCard = ({
    title = 'دپارتمان مالی',
    identifier = 'DP-5318_92',
    status = 'فعال',
    statusVariant = 'success',
    relatedSection = { label: 'بخش مربوطه', value: 'مالی' },
    manager = { label: 'مسئول دپارتمان', value: 'مهرا آذرآیین' },
    experts = { label: 'کارشناسان', value: '9 کارشناس' },
    slaResponse = { label: 'پاسخ SLA', value: '1 ساعت' },
    responseHours = { label: 'ساعت پاسخگویی', value: '09:00 - 18:00' },
    description = {
        label: 'توضیحات',
        value: 'رسیدگی به تیکت‌های تسویه، چک، اعتبار و فاکتورهای مشتریان.',
    },
    onAddUser,
    onSettings,
    className,
}: DepartmentHeaderCardProps) => {
    return (
        <div className={cn('flex flex-col gap-3', className)} dir="rtl">
            <div className="flex flex-row items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row items-center gap-3">
                        <span className="text-title-lg font-bold text-on-surface">
                            {title}
                        </span>
                        <Pill
                            text={status}
                            variant={statusVariant}
                            className="border-0"
                        />
                    </div>
                    <span className="text-label-sm text-outline">{identifier}</span>
                </div>

                <div className="flex flex-row items-center gap-3">
                    <Button variant="outline" onClick={onSettings}>
                        <Icon
                            label="tune400Linear"
                            className="size-5! text-on-surface-variant"
                        />
                        <span className="text-label-sm">تنظیمات</span>
                    </Button>
                    <Button variant="primary" onClick={onAddUser}>
                        <Icon
                            label="addSm400Broken"
                            className="size-5! text-on-primary"
                        />
                        <span className="text-label-sm text-on-primary">
                            افزودن کاربر
                        </span>
                    </Button>
                </div>
            </div>

            <div className="rounded-card-lg bg-surface-container-lowest p-6">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
                    <FieldItem {...relatedSection} />
                    <ManagerItem {...manager} />
                    <FieldItem {...experts} />
                    <FieldItem {...slaResponse} />
                    <FieldItem {...responseHours} />
                </div>

                <div className="mt-6 flex flex-col gap-3 text-right">
                    <span className="text-label-md text-outline">
                        {description.label}
                    </span>
                    <span className="text-label-lg text-on-surface-variant">
                        {description.value}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DepartmentHeaderCard
