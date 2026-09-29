'use client'

import { useState } from 'react'
import { Colorful, validHex, type ColorResult } from '@uiw/react-color'
import { Input } from '@/src/shared/components/ui/Input'

type ColorPickerProps = {
    value?: string
    onChange?: (hex: string) => void
}

const DEFAULT_HEX = '#d64545'

const toHex = (value: string) => {
    const next = value.trim()
    if (!next) return null
    const withHash = next.startsWith('#') ? next : `#${next}`
    return validHex(withHash) ? withHash : null
}

const ColorPicker = ({ value = DEFAULT_HEX, onChange }: ColorPickerProps) => {
    const [hex, setHex] = useState(toHex(value) ?? DEFAULT_HEX)
    const [draft, setDraft] = useState(hex)

    // TODO: fix this issue
    const commit = (next: string) => {
        // setHex(next)
        // setDraft(next)
        // onChange?.(next)
    }

    return (
        <div className="flex flex-col gap-3">
            <span className="text-label-md text-on-surface-variant">انتخاب رنگ</span>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end">
                <div dir="ltr">
                    <Colorful
                        color={hex}
                        disableAlpha
                        style={{ width: 220 }}
                        onChange={(color: ColorResult) => commit(color.hex)}
                    />
                </div>
                <div className="w-full min-w-0 sm:w-48">
                    <Input
                        label="Hex"
                        value={draft}
                        dir="ltr"
                        placeholder="#RRGGBB"
                        onChange={(next) => {
                            // setDraft(next)
                            const parsed = toHex(next)
                            if (!parsed) return
                            setHex(parsed)
                            onChange?.(parsed)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default ColorPicker
