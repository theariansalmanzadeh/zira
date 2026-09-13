"use client"

import { useEffect, useRef, useState } from "react"
import { Icon } from "@shared/components/Icons/Icon"
import { cn } from "@shared/libs/utils"
import { Button } from "./button"
import { InputGroupButton } from "./InputGroup"

interface CopyButtonProps {
    value: string
    className?: string
    iconClassName?: string
    onCopy?: () => void
    asInputGroupButton?: boolean
}

const CopyButton = ({
    value,
    className,
    iconClassName,
    onCopy,
    asInputGroupButton = false,
}: CopyButtonProps) => {
    const [copied, setCopied] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            onCopy?.()

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            timeoutRef.current = setTimeout(() => {
                setCopied(false)
            }, 1500)
        } catch {
            setCopied(false)
        }
    }

    const icon = (
        <Icon label={copied ? "checkSm400Linear" : "copyFile400Linear"} className={iconClassName} />
    )

    if (asInputGroupButton) {
        return (
            <InputGroupButton
                type="button"
                variant="ghost"
                size="icon-xs"
                className={cn(className, "text-on-surface-variant hover:text-on-surface rounded-container-lg!")}
                onClick={handleCopy}
                aria-label={copied ? "کپی شد" : "کپی"}
            >
                {icon}
            </InputGroupButton>
        )
    }

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(className)}
            onClick={handleCopy}
            aria-label={copied ? "کپی شد" : "کپی"}
        >
            {icon}
        </Button>
    )
}

export default CopyButton
