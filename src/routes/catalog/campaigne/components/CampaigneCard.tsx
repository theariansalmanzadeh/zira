"use client"

import { Icon } from "@/src/shared/components/Icons/Icon"
import { Button } from "@/src/shared/components/ui/button"
import IconButton from "@shared/components/ui/IconButton"
import { Pill, PillVariants } from "@shared/components/ui/Pill"
import { cn } from "@shared/libs/utils"
import { VariantProps } from "class-variance-authority"
import Link from "next/link"

export interface CampaigneCardProps {
    title: string
    subtitle: string
    status?: string
    statusVariant?: VariantProps<typeof PillVariants>["variant"]
    discount?: string
    timeline?: string
    visits?: string
    orders?: string
    conversionRate?: string
    onAnalytics?: () => void
    href?: string
    className?: string
}

const CampaigneCard = ({
    title,
    subtitle,
    status = "فعال",
    statusVariant = "success",
    discount = "",
    timeline = "",
    visits = "۱۲,۴۰۰",
    orders = "۸۹۰",
    conversionRate = "۷٫۲٪",
    onAnalytics,
    href = "/admin/catalog/campaigns/1",
    className,
}: CampaigneCardProps) => {
    return (
        <div
            className={cn(
                "flex flex-col gap-2 rounded-card-md bg-surface-container-high p-2",
                className
            )}
            dir="rtl"
        >
            <div className="rounded-card-md bg-surface-container-lowest flex flex-col gap-6 p-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-2 text-right">
                        <h3 className="text-title-lg font-medium text-on-surface">{title}</h3>
                        <span className="text-label-md text-outline">{subtitle}</span>
                    </div>
                    <Pill variant={statusVariant} text={status} className="shrink-0 border-0" />
                </div>
                <div className="border-0 border-t-[1.5px] border-dashed border-outline-variant" />
                <div className="flex flex-row justify-between gap-6">
                    <p className="text-label-lg text-outline">{timeline}</p>
                </div>
                <div className="flex flex-row items-start justify-between gap-4">
                    <div className="flex flex-col gap-2 text-right">
                        <span className="text-label-lg font-bold text-on-surface-variant">{discount}</span>
                        <span className="text-label-md text-outline">درصد تخفیف</span>
                    </div>
                    <div className="flex flex-col gap-2 text-right">
                        <span className="text-label-lg font-bold text-on-surface">
                            {visits}
                        </span>
                        <span className="text-label-md text-outline">بازدید</span>
                    </div>
                    <div className="flex flex-col gap-2 text-right">
                        <span className="text-label-lg font-bold text-on-surface">
                            {orders}
                        </span>
                        <span className="text-label-md text-outline">سفارش</span>
                    </div>
                    <div className="flex flex-col gap-2 text-right">
                        <span className="text-label-lg font-bold text-success">
                            {conversionRate}
                        </span>
                        <span className="text-label-md text-outline">نرخ تبدیل</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <IconButton
                    icon="analytics400Linear"
                    iconClassName="size-6"
                    className="rounded-card-md bg-surface-container-lowest"
                    onClick={onAnalytics}
                />
                <Link href={href || ""}>
                    <IconButton
                        icon="chevronLeft400Linear"
                        className="rounded-card-md bg-surface-container-lowest"
                    />
                </Link>
            </div>
        </div>
    )
}

export default CampaigneCard
