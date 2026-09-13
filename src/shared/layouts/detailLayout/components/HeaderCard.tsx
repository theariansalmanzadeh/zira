"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@shared/components/ui/Avatar"
import { Pill, PillVariants } from "@shared/components/ui/Pill"
import { cn } from "@shared/libs/utils"
import { VariantProps } from "class-variance-authority"

export interface HeaderCardField {
    label: string
    value: string
}

export interface HeaderCardManagerField extends HeaderCardField {
    avatarUrl?: string
    avatarFallback?: string
    onClick?: () => void
}

export interface HeaderCardProps {
    title: string
    identifier: string
    status?: string
    statusVariant?: VariantProps<typeof PillVariants>["variant"]
    groupRole?: HeaderCardField
    manager?: HeaderCardManagerField
    users?: HeaderCardField
    description?: HeaderCardField
    className?: string
}

const HeaderCardFieldItem = ({ label, value }: HeaderCardField) => (
    <div className="flex min-w-0 flex-col gap-1 text-right">
        <span className="text-label-md text-outline">{label}</span>
        <span className="text-label-lg text-on-surface-variant">{value}</span>
    </div>
)

const HeaderCardManagerItem = ({
    label,
    value,
    avatarUrl,
    avatarFallback,
    onClick,
}: HeaderCardManagerField) => (
    <div className="flex min-w-0 flex-col gap-1 text-right">
        <span className="text-label-md text-outline">{label}</span>
        <div className="flex flex-row items-center gap-2">
            <Avatar size="sm" className="bg-surface-container-highest">
                {avatarUrl && <AvatarImage src={avatarUrl} alt={value} />}
                <AvatarFallback className="bg-surface-container-highest text-on-surface-variant">
                    {avatarFallback ?? value.charAt(0)}
                </AvatarFallback>
            </Avatar>
            {onClick ? (
                <button
                    type="button"
                    onClick={onClick}
                    className="text-label-lg text-on-surface-variant underline-offset-4 hover:underline"
                >
                    {value}
                </button>
            ) : (
                <span className="text-label-lg text-on-surface-variant underline">
                    {value}
                </span>
            )}
        </div>
    </div>
)

const HeaderCard = ({
    title,
    identifier,
    status = "فعال",
    statusVariant = "success",
    groupRole = { label: "نقش گروه", value: "-" },
    manager = { label: "مدیر گروه", value: "نام کاربر" },
    users = { label: "کاربران", value: "12 کاربر" },
    description = { label: "توضیحات", value: "-" },
    className,
}: HeaderCardProps) => {
    return (
        <div
            className={cn(
                "rounded-card-md bg-surface-container-lowest p-6 shadow-sm",
                className
            )}
            dir="rtl"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1 text-right">
                    <h1 className="text-title-lg font-bold text-on-surface">{title}</h1>
                    <span className="text-label-md text-outline">{identifier}</span>
                </div>
                <Pill
                    variant={statusVariant}
                    text={status}
                    className="shrink-0 border-0"
                />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
                <HeaderCardFieldItem label={groupRole.label} value={groupRole.value} />
                <HeaderCardManagerItem {...manager} />
                <HeaderCardFieldItem label={users.label} value={users.value} />
                <HeaderCardFieldItem label={description.label} value={description.value} />
            </div>
        </div>
    )
}

export default HeaderCard
