import {
    LICENSES_DUMMY,
    LICENSE_FILE_TYPE_STYLES,
    type LicenseCardData,
} from '../../liecenses/constants'

export type LiecenseDetailsData = LicenseCardData & {
    expiresAt: string
    fileSize: string
    description: string
    previewUrl: string
}

type LiecenseDetailsExtra = Pick<
    LiecenseDetailsData,
    'expiresAt' | 'fileSize' | 'description' | 'previewUrl'
>

const DETAILS_EXTRA: Record<string, LiecenseDetailsExtra> = {
    'cert-0': {
        expiresAt: '2027-09-03T00:00:00.000Z',
        fileSize: '۸۶۰ کیلوبایت',
        description: 'گواهی انطباق محصولات نساجی با استاندارد ملی.',
        previewUrl: '/images/blog1.jpg',
    },
    'cert-1': {
        expiresAt: '2027-08-19T00:00:00.000Z',
        fileSize: '۱,۱ مگابایت',
        description: 'تایید کنترل کیفیت محصول پیش از عرضه.',
        previewUrl: '/images/product1.jpg',
    },
    'cert-2': {
        expiresAt: '2027-07-01T00:00:00.000Z',
        fileSize: '۷۴۰ کیلوبایت',
        description: 'گواهی عضویت در اتحادیه پوشاک ایران.',
        previewUrl: '/images/hero.jpg',
    },
    'cert-3': {
        expiresAt: '2027-06-12T00:00:00.000Z',
        fileSize: '۹۲۰ کیلوبایت',
        description: 'نتیجه آزمون آزمایشگاه برای پارچه تولیدی.',
        previewUrl: '/images/banner.jpg',
    },
    'lic-0': {
        expiresAt: '2027-05-05T00:00:00.000Z',
        fileSize: '۱,۲ مگابایت',
        description: 'مجوز قانونی فعالیت تولیدی و استاندارد کیفیت.',
        previewUrl: '/images/blog1.jpg',
    },
    'lic-1': {
        expiresAt: '2027-02-26T00:00:00.000Z',
        fileSize: '۶۸۰ کیلوبایت',
        description: 'پروانه کسب برای فعالیت صنفی فروشگاه.',
        previewUrl: '/images/item-1.jpg',
    },
    'lic-2': {
        expiresAt: '2027-02-08T00:00:00.000Z',
        fileSize: '۱,۴ مگابایت',
        description: 'گواهینامه سیستم مدیریت کیفیت ISO 9001.',
        previewUrl: '/images/item-2.jpg',
    },
}

const FALLBACK_EXTRA = DETAILS_EXTRA['lic-0']

export const getLiecenseDetails = (id: string): LiecenseDetailsData => {
    const license =
        LICENSES_DUMMY.find((item) => item.id === id) ??
        LICENSES_DUMMY.find((item) => item.id === 'lic-0')!

    return {
        ...license,
        ...(DETAILS_EXTRA[license.id] ?? FALLBACK_EXTRA),
    }
}

export const getFileTypeLabel = (data: LiecenseDetailsData) =>
    `${LICENSE_FILE_TYPE_STYLES[data.fileType].badge} · ${data.fileSize}`
