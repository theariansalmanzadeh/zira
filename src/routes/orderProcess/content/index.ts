import { DeliveryDateOption, DeliveryMethodOption, DeliveryTimeOption } from "../types"

export const DELIVERY_METHODS: DeliveryMethodOption[] = [
    {
        id: 'tipax',
        name: 'تیپاکس',
        description: 'بسته بندی و ارسال',
        duration: 'طی ۳ تا ۴ روز کاری',
        price: '-',
    },
    {
        id: 'mahak',
        name: 'ماهک',
        description: 'بسته بندی و ارسال',
        duration: 'طی ۳ تا ۴ روز کاری',
        price: '-',
    },
    {
        id: 'post',
        name: 'پست پیشتاز',
        description: 'بسته بندی و ارسال',
        duration: 'طی ۳ تا ۴ روز کاری',
        price: '-',
    },
]

export const DELIVERY_DATES: DeliveryDateOption[] = [
    { id: 'sat', dayLabel: 'شنبه', dateLabel: '۴/۲۴' },
    { id: 'sun', dayLabel: 'یکشنبه', dateLabel: '۴/۲۵' },
    { id: 'mon', dayLabel: 'دوشنبه', dateLabel: '۴/۲۶' },
    { id: 'tue', dayLabel: 'سه‌شنبه', dateLabel: '۴/۲۷' },
    { id: 'wed', dayLabel: 'چهارشنبه', dateLabel: '۴/۲۸' },
]

export const DELIVERY_TIMES: DeliveryTimeOption[] = [
    { id: '08-22', label: 'ساعت ۰۸:۰۰ الی ۲۲:۰۰' },
]