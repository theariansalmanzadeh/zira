'use client'

import { Label } from '@/src/shared/components/ui/Label'
import { RadioGroup, RadioGroupItem } from '@/src/shared/components/ui/RadioGroup';
import { cn } from '@/src/shared/libs/utils';
import { COLOR_ITEMS } from '../content/dummy';
import { useProduct } from '../context/Provider';

export type ProductColorOption = {
    id: string
    label: string
    value: string
}

const Colors = ({ items }: { items?: ProductColorOption[] }) => {
    const { colors: selectedColors, setColors, isCustomPack } = useProduct()
    const colors = items?.length
        ? items
        : COLOR_ITEMS.map((item) => ({
              id: item.value,
              label: item.label,
              value: item.color,
          }))
    const value = isCustomPack ? selectedColors : (selectedColors[0] ?? '')
    const selected = Array.isArray(value) ? value : [value]

    const onValueChange = (id: string) => {
        if (!isCustomPack) {
            setColors([id])
            return
        }

        setColors(
            selectedColors.includes(id)
                ? selectedColors.filter((item) => item !== id)
                : [...selectedColors, id]
        )
    }

    const swatches = colors.map((color) => {
        const isSelected = selected.includes(color.id)

        return (
            <Label
                key={color.id}
                htmlFor={isCustomPack ? undefined : `color-${color.id}`}
                className="flex cursor-pointer flex-col items-center gap-1.5"
            >
                {isCustomPack ? (
                    <button
                        id={`color-${color.id}`}
                        type="button"
                        aria-label={color.label}
                        aria-pressed={isSelected}
                        data-state={isSelected ? 'checked' : 'unchecked'}
                        className={cn(
                            'size-8 rounded-full border-2 border-gray-200 shadow-none transition-colors',
                            'data-[state=checked]:border-gray-900 data-[state=checked]:ring-2 data-[state=checked]:ring-white data-[state=checked]:ring-inset [&_[data-slot=radio-group-indicator]]:hidden',
                        )}
                        style={{ backgroundColor: color.value }}
                        onClick={() => onValueChange(color.id)}
                    />
                ) : (
                    <RadioGroupItem
                        id={`color-${color.id}`}
                        value={color.id}
                        aria-label={color.label}
                        className={cn(
                            'size-8 rounded-full border-2 border-gray-200 shadow-none transition-colors',
                            'data-[state=checked]:border-gray-900 data-[state=checked]:ring-2 data-[state=checked]:ring-white data-[state=checked]:ring-inset [&_[data-slot=radio-group-indicator]]:hidden',
                        )}
                        style={{ backgroundColor: color.value }}
                    />
                )}
                <span
                    className={cn(
                        'text-xs',
                        isSelected
                            ? 'text-on-surface font-semibold'
                            : 'text-on-surface-variant'
                    )}
                >
                    {color.label}
                </span>
            </Label>
        )
    })

    if (isCustomPack) {
        return (
            <div className="flex w-full flex-row flex-wrap gap-3">
                {swatches}
            </div>
        )
    }
    return (
        <RadioGroup
            value={Array.isArray(value) ? value[0] : value}
            onValueChange={onValueChange}
            className="flex w-full flex-row flex-wrap gap-3"
        >
            {swatches}
        </RadioGroup>
    )
}

export default Colors