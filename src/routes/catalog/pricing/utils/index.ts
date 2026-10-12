import { formatFaNumber } from '@/src/shared/libs/formatter'

export const parsePercentValue = (value: number | string): number => {
    if (typeof value === 'number') {
        return Number.isFinite(value) ? value : 0
    }

    const normalized = value
        .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
        .replace(/[٪%]/g, '')
        .replace(/,/g, '')
        .trim()

    const parsed = Number(normalized)
    return Number.isFinite(parsed) ? parsed : 0
}

export const getAdjustmentPercentDisplay = (value: number | string) => {
    const percent = parsePercentValue(value)
    const isPositive = percent > 0
    const absolute = Math.abs(percent)

    return {
        text: `${formatFaNumber(absolute)}٪ ${isPositive ? '+' : '-'}`,
        className: isPositive ? 'text-success' : 'text-error',
        isPositive,
        percent,
    }
}
