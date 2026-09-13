export type OrderPaymentStatus = 'paid' | 'pending' | 'error'

export const orderPaymentStatusType = (status: OrderPaymentStatus) => {
    if (status === 'paid') {
        return { variant: 'success', text: 'پرداخت موفق', icon: 'checkCircle' }
    }

    if (status === 'error') {
        return { variant: 'warning', text: 'پرداخت ناموفق', icon: 'cross' }
    }

    return { variant: 'tonal', text: 'در انتظار تایید', icon: 'clockDashed' }
}
