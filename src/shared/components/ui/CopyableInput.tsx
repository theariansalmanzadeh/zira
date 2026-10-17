"use client"

import * as React from "react"
import { cn } from "@shared/libs/utils"
import CopyButton from "./CopyButton"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "./InputGroup"
import { Label } from "./Label"

type CopyableInputProps = React.ComponentProps<"input"> & {
    groupClassName?: string
    copyButtonClassName?: string
    copyIconClassName?: string
    label?: string
}

const CopyableInput = React.forwardRef<HTMLInputElement, CopyableInputProps>(
    (
        {
            value,
            className,
            groupClassName,
            copyButtonClassName,
            copyIconClassName,
            label,
            readOnly = false,
            ...props
        },
        ref
    ) => {
        const copyValue = String(value ?? "")
        const onCopy = () => {
            navigator.clipboard.writeText(copyValue)
        }

        return (
            <div className='flex flex-col justify-around'>
                {label && <Label className='mb-1.5 text-label-md text-on-surface-variant'>{label}</Label>}
                <InputGroup className={cn("h-auto!", groupClassName)}>
                    <InputGroupInput
                        ref={ref}
                        value={value}
                        readOnly={readOnly}
                        className={cn("py-2! h-auto!", className)}
                        {...props}
                    />
                    <InputGroupAddon align="inline-end">
                        <CopyButton
                            value={copyValue}
                            onCopy={onCopy}
                            asInputGroupButton
                            className={copyButtonClassName}
                            iconClassName={copyIconClassName}
                        />
                    </InputGroupAddon>
                </InputGroup>
            </div>
        )
    }
)
CopyableInput.displayName = "CopyableInput"

export { CopyableInput }
