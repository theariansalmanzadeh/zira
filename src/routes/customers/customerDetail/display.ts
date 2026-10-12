export const displayValue = (value?: string | number | null) => {
    if (value === undefined || value === null) return '-'
    const text = String(value).trim()
    return text || '-'
}
