import type { IconLabel } from '@/src/shared/types/icon'

export type CreditCardItem = {
    id: 'cheque' | 'gold'
    title: string
    icon: IconLabel
    levelLabel: string
    cap: number
    used: number
    guarantee: string
    theme: {
        fg: string
        headBg: string
        progressClassName: string
        increaseClassName: string
        titleClassName: string
        badgeClassName: string
        iconClassName: string
    }
}

export const CREDIT_CARDS: CreditCardItem[] = [
    {
        id: 'cheque',
        title: 'اعتبار چکی',
        icon: 'receipt',
        levelLabel: 'سطح چک ۴ (راس تا ۴ ماه)',
        cap: 200000000,
        used: 142000000,
        guarantee: 'ضمانت: سفته به مبلغ ۲۵۰٬۰۰۰٬۰۰۰ تومان',
        theme: {
            fg: '#8E6CB0',
            headBg: '#F1ECF7',
            progressClassName: 'bg-[#8E6CB0]',
            increaseClassName:
                'bg-[#8E6CB0] text-white hover:bg-[#8E6CB0]/90',
            titleClassName: 'text-[#8E6CB0]',
            badgeClassName: 'bg-white text-[#8E6CB0]',
            iconClassName: 'text-[#8E6CB0]',
        },
    },
    {
        id: 'gold',
        title: 'اعتبار طلایی',
        icon: 'star',
        levelLabel: 'افزایش پله‌ای فعال',
        cap: 150000000,
        used: 58000000,
        guarantee: 'ضمانت: چک شخصی بانک ملت به مبلغ ۱۵۰٬۰۰۰٬۰۰۰ تومان',
        theme: {
            fg: '#C8841A',
            headBg: '#FBF0E2',
            progressClassName: 'bg-[#C8841A]',
            increaseClassName:
                'bg-[#C8841A] text-white hover:bg-[#C8841A]/90',
            titleClassName: 'text-[#C8841A]',
            badgeClassName: 'bg-white text-[#C8841A]',
            iconClassName: 'text-[#C8841A]',
        },
    },
]
