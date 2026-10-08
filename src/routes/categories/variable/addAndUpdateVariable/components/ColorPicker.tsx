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

    // TODO: fix this issue
    const commit = (next: string) => {
        setHex(toHex(next) ?? DEFAULT_HEX)
        onChange?.(next)
    }

    return (
        <div className="flex flex-col gap-3">
            <span className="text-label-md text-on-surface-variant">انتخاب رنگ</span>
            <div className="flex flex-col items-center gap-3">
                <Colorful
                    color={hex}
                    disableAlpha
                    style={{ width: 250 }}
                    onChange={(color: ColorResult) => commit(color.hex)}
                />
                <Input
                    label="Hex"
                    value={hex}
                    dir="ltr"
                    wrapperClassName='w-full'
                    placeholder="#RRGGBB"
                    onChange={(next) => {
                        const parsed = toHex(next)
                        if (!parsed) return
                        setHex(parsed)
                        onChange?.(parsed)
                    }}
                />
            </div>
        </div>
    )
}

export default ColorPicker
