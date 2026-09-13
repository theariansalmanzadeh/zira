import { PreOrderStatusStep } from "../types";

export const PRE_ORDER_STATUS_STEPS: PreOrderStatusStep[] = [
    { id: 'registration', label: 'ثبت پیش‌سفارش', status: 'complete' },
    { id: 'accountant-approval', label: 'تایید حسابدار', status: 'complete' },
    { id: 'deposit-payment', label: 'پرداخت بیعانه', status: 'complete' },
    { id: 'full-settlement', label: 'تسویه کامل', status: 'pending' },
    { id: 'preparation', label: 'آماده‌سازی و بسته‌بندی', status: 'not_reached' },
    { id: 'shipment', label: 'ارسال مرسوله', status: 'not_reached' },
    { id: 'customer-receipt', label: 'دریافت توسط مشتری', status: 'not_reached' },
]
