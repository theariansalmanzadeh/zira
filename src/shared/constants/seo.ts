import type { Metadata } from 'next'

export const SITE_NAME = 'زیرا مارکت'
export const SITE_DESCRIPTION =
    'فروشگاه آنلاین لباس زیر، لباس خواب و پوشاک زنانه و مردانه'
export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

type BuildMetadataOptions = {
    title: string
    description: string
    path: string
    images?: string[]
    type?: 'website' | 'article'
}

export function buildMetadata({
    title,
    description,
    path,
    images = ['/images/product1.jpg'],
    type = 'website',
}: BuildMetadataOptions): Metadata {
    return {
        title,
        description,
        alternates: {
            canonical: path,
        },
        openGraph: {
            title,
            description,
            url: path,
            siteName: SITE_NAME,
            locale: 'fa_IR',
            type,
            images,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images,
        },
    }
}
