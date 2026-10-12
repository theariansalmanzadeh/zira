import type { ProductStatus } from '@/src/api/types/admin/catalog'
import { formatFaNumber } from '@/src/shared/libs/formatter'

export type Status = 'active' | 'diactive' | 'pending' | ProductStatus

type StatusConfig = {
    variant: 'success' | 'warning' | 'tonal'
    text: string
    icon: string
}

export const statusType = (status: Status): StatusConfig => {
    if (status === 'active' || status === 'ACTIVE') {
        return { variant: 'success', text: 'فعال', icon: 'checkCircle' }
    } else if (status === 'diactive') {
        return { variant: 'warning', text: 'غیرفعال', icon: 'cross' }
    } else if (status === 'ARCHIVED') {
        return { variant: 'warning', text: 'بایگانی شده', icon: 'cross' }
    } else if (status === 'DRAFT') {
        return { variant: 'tonal', text: 'پیش‌نویس', icon: 'clockDashed' }
    } else if (status === 'pending') {
        return { variant: 'tonal', text: 'در حال بررسی', icon: 'clockDashed' }
    }
    return { variant: 'tonal', text: 'در انتظار تایید', icon: 'clockDashed' }
}

export const formatCountWithCap = (
    count?: number | null,
    max = 6
): string => {
    if (count == null || Number.isNaN(Number(count))) {
        return formatFaNumber(0)
    }
    const num = Math.floor(Number(count))
    if (num > max) {
        return `${formatFaNumber(max)}+`
    }
    return formatFaNumber(num)
}
