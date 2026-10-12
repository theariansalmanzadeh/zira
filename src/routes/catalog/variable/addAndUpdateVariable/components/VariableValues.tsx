'use client'

import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { Button } from '@/src/shared/components/ui/button'
import ColorPill from '@/src/shared/components/ui/ColorPill'
import { Input } from '@/src/shared/components/ui/Input'
import { Pill } from '@/src/shared/components/ui/Pill'
import type { AddAndUpdateVariableFormValues } from '../schema'

const COLOR_HEX_BY_LABEL: Record<string, string> = {
    مشکی: '#1A1A1A',
    سفید: '#FFFFFF',
    زغالی: '#36454F',
    سرمه‌ای: '#1B3A4B',
    سرخابی: '#C71585',
}

const FALLBACK_COLOR = '#d64545'

type VariableValuesProps = {
    formDisplayControl: string
    colorHex?: string
}

const VariableValues = ({
    formDisplayControl,
    colorHex = FALLBACK_COLOR,
}: VariableValuesProps) => {
    const { control, setValue } = useFormContext<AddAndUpdateVariableFormValues>()
    const [draftValue, setDraftValue] = useState('')
    const [colorByLabel, setColorByLabel] = useState<Record<string, string>>({})
    const values = useWatch({ control, name: 'values' }) ?? []
    const isColorSwatch = formDisplayControl === 'SWATCH'

    const addValue = () => {
        const next = draftValue.trim()
        if (!next || values.includes(next)) return
        if (isColorSwatch) {
            setColorByLabel((prev) => ({ ...prev, [next]: colorHex }))
        }
        setValue('values', [...values, next], { shouldDirty: true })
        setDraftValue('')
    }

    const removeValue = (value: string) => {
        setValue(
            'values',
            values.filter((item) => item !== value),
            { shouldDirty: true }
        )
    }

    return (
        <div className="flex flex-col gap-3 sm:col-span-2">
            <div className="flex items-end gap-2">
                <div className="min-w-0 flex-1">
                    <Input
                        label="مقدار"
                        value={draftValue}
                        onChange={setDraftValue}
                        placeholder="مقدار جدید"
                        onKeyDown={(event) => {
                            if (event.key !== 'Enter') return
                            event.preventDefault()
                            addValue()
                        }}
                    />
                </div>
                <Button
                    type="button"
                    variant="primary"
                    className="h-12"
                    onClick={addValue}
                >
                    افزودن
                </Button>
            </div>
            {values.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {values.map((value) =>
                        isColorSwatch ? (
                            <ColorPill
                                key={value}
                                hex={
                                    colorByLabel[value] ??
                                    COLOR_HEX_BY_LABEL[value] ??
                                    FALLBACK_COLOR
                                }
                                label={value}
                                onClose={() => removeValue(value)}
                            />
                        ) : (
                            <Pill
                                key={value}
                                variant="primary"
                                text={value}
                                onClose={() => removeValue(value)}
                            />
                        )
                    )}
                </div>
            )}
        </div>
    )
}

export default VariableValues
