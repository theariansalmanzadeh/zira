const DEFAULT_FA_NUMBER_OPTIONS: Intl.NumberFormatOptions = {
    useGrouping: true,
    maximumFractionDigits: 20,
}

const faDigitFormatter = new Intl.NumberFormat('fa-IR', {
    useGrouping: false,
    maximumFractionDigits: 20,
})

const isPureNumericString = (value: string) =>
    /^-?(?:0|[1-9]\d*)(?:\.\d+)?$/.test(value.replace(/,/g, '').trim())

/**
 * Formats a number (or numeric string) with Persian digits via `Intl.NumberFormat('fa-IR')`.
 * Mixed strings (dates, phones, IDs with leading zeros) keep structure and convert digit runs only.
 */
export const formatFaNumber = (
    value: number | string,
    options?: Intl.NumberFormatOptions
): string => {
    const formatter = new Intl.NumberFormat('fa-IR', {
        ...DEFAULT_FA_NUMBER_OPTIONS,
        ...options,
    })

    if (typeof value === 'number') {
        if (!Number.isFinite(value)) return String(value)
        return formatter.format(value)
    }

    const trimmed = value.trim()
    if (isPureNumericString(trimmed)) {
        return formatter.format(Number(trimmed.replace(/,/g, '')))
    }

    return value.replace(/\d+/g, (digits) => {
        if (/^0\d/.test(digits)) {
            return [...digits]
                .map((digit) => faDigitFormatter.format(Number(digit)))
                .join('')
        }

        return faDigitFormatter.format(Number(digits))
    })
}

/** Formats a monetary amount with Persian digits and grouping. */
export const formatPrice = (value: number, options?: Intl.NumberFormatOptions) =>
    formatFaNumber(value, options)

const DEFAULT_FA_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
}

/**
 * Formats an ISO date string or `Date` to Persian calendar `DD/MM/YYYY`
 * (e.g. `۰۹/۱۲/۱۴۰۴`) via `Intl.DateTimeFormat('fa-IR')`.
 */
export const formatFaDate = (
    value: string | Date,
    options?: Intl.DateTimeFormatOptions
): string => {
    const date = value instanceof Date ? value : new Date(value)
    if (Number.isNaN(date.getTime())) {
        return typeof value === 'string' ? value : ''
    }

    const parts = new Intl.DateTimeFormat('fa-IR', {
        ...DEFAULT_FA_DATE_OPTIONS,
        ...options,
    }).formatToParts(date)

    const day = parts.find((part) => part.type === 'day')?.value
    const month = parts.find((part) => part.type === 'month')?.value
    const year = parts.find((part) => part.type === 'year')?.value

    if (!day || !month || !year) {
        return new Intl.DateTimeFormat('fa-IR', {
            ...DEFAULT_FA_DATE_OPTIONS,
            ...options,
        }).format(date)
    }

    return `${day}/${month}/${year}`
}

const DEFAULT_FA_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
}

/**
 * Formats an ISO datetime string or `Date` to Persian `HH:mm`
 * (e.g. `۱۰:۴۲`) via `Intl.DateTimeFormat('fa-IR')`.
 */
export const formatFaTime = (
    value: string | Date,
    options?: Intl.DateTimeFormatOptions
): string => {
    const date = value instanceof Date ? value : new Date(value)
    if (Number.isNaN(date.getTime())) {
        return typeof value === 'string' ? value : ''
    }

    return new Intl.DateTimeFormat('fa-IR', {
        ...DEFAULT_FA_TIME_OPTIONS,
        ...options,
    }).format(date)
}

/**
 * Formats an ISO datetime string as `DD/MM/YYYY - HH:mm` in Persian digits.
 */
export const formatFaDateTime = (
    value: string | Date,
    options?: Intl.DateTimeFormatOptions
): string => {
    const date = value instanceof Date ? value : new Date(value)
    if (Number.isNaN(date.getTime())) {
        return typeof value === 'string' ? value : ''
    }

    const datePart = formatFaDate(date, options)
    const timePart = formatFaTime(date, options)

    return `${datePart} - ${timePart}`
}

/**
 * Extracts the Persian weekday name from an ISO/UTC date string or `Date`
 * (e.g. `چهارشنبه`) via `Intl.DateTimeFormat('fa-IR', { weekday: 'long' })`.
 */
export const formatFaWeekday = (
    value: string | Date,
    options?: Intl.DateTimeFormatOptions
): string => {
    const date = value instanceof Date ? value : new Date(value)
    if (Number.isNaN(date.getTime())) {
        return typeof value === 'string' ? value : ''
    }

    return new Intl.DateTimeFormat('fa-IR', {
        weekday: 'long',
        ...options,
    }).format(date)
}

/**
 * Formats an ISO/UTC date as `weekday - DD/MM/YYYY` in Persian
 * (e.g. `چهارشنبه - ۱۷/۱۰/۱۴۰۵`).
 */
export const formatFaWeekdayDate = (
    value: string | Date,
    options?: Intl.DateTimeFormatOptions
): string => {
    const date = value instanceof Date ? value : new Date(value)
    if (Number.isNaN(date.getTime())) {
        return typeof value === 'string' ? value : ''
    }

    return `${formatFaWeekday(date, options)} - ${formatFaDate(date, options)}`
}
