"use client"

import * as React from "react"
import { cn } from "@shared/libs/utils"
import { ToggleGroup, ToggleGroupItem } from "@shared/components/ui/ToggleGroup"
import IconButton from "@shared/components/ui/IconButton"

function HeadingWithActions({
    className,
    children,
    ...props
}: React.ComponentProps<"div">) {
    let backButton: React.ReactNode = null
    let title: React.ReactNode = null
    let subTitle: React.ReactNode = null
    let toggleGroup: React.ReactNode = null
    let actionButton: React.ReactNode = null

    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return

        if (child.type === HeadingWithActionsBackButton) {
            backButton = child
        } else if (child.type === HeadingWithActionsTitle) {
            title = child
        } else if (child.type === HeadingWithActionsSubTitle) {
            subTitle = child
        } else if (child.type === HeadingWithActionsToggleGroup) {
            toggleGroup = child
        } else if (child.type === HeadingWithActionsWrapper) {
            actionButton = child
        }
    })

    return (
        <div
            data-slot="heading-with-actions"
            className={cn(
                "flex flex-row items-start justify-between gap-3",
                className
            )}
            dir="rtl"
            {...props}
        >
            <div className="flex flex-row items-start gap-2 text-right">
                {backButton}
                <div className="flex flex-col gap-1">
                    {title}
                    {subTitle}
                </div>
            </div>
            <div className="flex shrink-0 flex-row items-center gap-2">
                {toggleGroup}
                {actionButton}
            </div>
        </div>
    )
}

function HeadingWithActionsBackButton({
    onClick,
    className,
}: {
    onClick: () => void
    className?: string
}) {
    return (
        <IconButton
            icon="arrorwRight400Linear"
            onClick={onClick}
            variant="ghost"
            className={cn("shrink-0", className)}
            iconClassName="size-6!"
        />
    )
}

function HeadingWithActionsTitle({
    className,
    children,
    ...props
}: React.ComponentProps<"h1">) {
    return (
        <h1
            data-slot="heading-with-actions-title"
            className={cn(
                "text-title-lg! font-medium text-on-surface",
                className
            )}
            {...props}
        >
            {children}
        </h1>
    )
}

function HeadingWithActionsSubTitle({
    className,
    children,
    ...props
}: React.ComponentProps<"p">) {
    return (
        <p
            data-slot="heading-with-actions-subtitle"
            className={cn(
                "text-label-md font-medium text-outline",
                className
            )}
            {...props}
        >
            {children}
        </p>
    )
}

function HeadingWithActionsToggleGroup({
    className,
    children,
    ...props
}: React.ComponentProps<typeof ToggleGroup>) {
    return (
        <ToggleGroup
            data-slot="heading-with-actions-toggle-group"
            variant="filled"
            className={cn(
                "rounded-container-md! bg-surface-container-highest p-1.5",
                className
            )}
            {...props}
        >
            {children}
        </ToggleGroup>
    )
}

function HeadingWithActionsWrapper({
    className,
    children,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="heading-with-actions-action-button"
            className={cn(
                "flex shrink-0 flex-row items-center gap-2",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

HeadingWithActions.BackButton = HeadingWithActionsBackButton
HeadingWithActions.Title = HeadingWithActionsTitle
HeadingWithActions.SubTitle = HeadingWithActionsSubTitle
HeadingWithActions.ToggleGroup = HeadingWithActionsToggleGroup
HeadingWithActions.ButtonWrapper = HeadingWithActionsWrapper
HeadingWithActions.ToggleGroupItem = ToggleGroupItem

export default HeadingWithActions
export {
    HeadingWithActions,
    HeadingWithActionsBackButton,
    HeadingWithActionsTitle,
    HeadingWithActionsSubTitle,
    HeadingWithActionsToggleGroup,
    HeadingWithActionsWrapper,
}
