export type PlpProduct = {
    href: string
    title: string
    brand: string
    price: number
    discount?: string
    isLoggedIn?: boolean
    image: string
    description: string
}

export const PLP_PRODUCTS: PlpProduct[] = [
    {
        href: '1',
        title: 'بادی گیپور',
        brand: 'Lorenzo',
        price: 1280000,
        discount: '10',
        isLoggedIn: true,
        image: '/images/product1.jpg',
        description: 'بادی گیپور برند Lorenzo مناسب استفاده روزمره و رسمی',
    },
    {
        href: '2',
        title: 'ست لباس خواب ساتن',
        brand: 'Victoria',
        price: 2450000,
        discount: '15',
        image: '/images/product1.jpg',
        description: 'ست لباس خواب ساتن برند Victoria با بافت نرم و لطیف',
    },
    {
        href: '3',
        title: 'شورت کشی مشکی',
        brand: 'Lorenzo',
        price: 390000,
        image: '/images/product1.jpg',
        description: 'شورت کشی مشکی Lorenzo با کشسانی بالا و راحتی تمام‌روز',
    },
    {
        href: '4',
        title: 'سوتین پوش‌دار',
        brand: 'Calvin Klein',
        price: 980000,
        discount: '10',
        image: '/images/product1.jpg',
        description: 'سوتین پوش‌دار Calvin Klein با فرم‌دهی مناسب و پارچه باکیفیت',
    },
    {
        href: '5',
        title: 'تاپ ورزشی زنانه',
        brand: 'Nike',
        price: 740000,
        discount: '20',
        image: '/images/product1.jpg',
        description: 'تاپ ورزشی زنانه Nike مناسب تمرین و استفاده روزمره',
    },
    {
        href: '6',
        title: 'ربدوشامبر گیپور',
        brand: 'زرین‌پال',
        price: 1890000,
        discount: '10',
        image: '/images/product1.jpg',
        description: 'ربدوشامبر گیپور زرین‌پال با طراحی ظریف و پارچه لطیف',
    },
    {
        href: '7',
        title: 'لباس خواب ابریشمی',
        brand: 'زرین‌پال',
        price: 2160000,
        discount: '12',
        image: '/images/product1.jpg',
        description: 'لباس خواب ابریشمی زرین‌پال برای راحتی در طول شب',
    },
    {
        href: '8',
        title: 'سوتین دانتل فنردار',
        brand: 'Victoria',
        price: 1120000,
        discount: '8',
        image: '/images/product1.jpg',
        description: 'سوتین دانتل فنردار Victoria با پشتیبانی مناسب و جزئیات دانتل',
    },
]

export function getPlpProductById(id: string) {
    return PLP_PRODUCTS.find((product) => product.href === id)
}
