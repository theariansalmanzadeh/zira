'use client'

import { Pill } from '@/src/shared/components/ui/Pill'
import { cn } from '@shared/libs/utils'

export type DomainSection = {
    label: string
    summary: string
    items: string[]
    pillClassName: string
}

type DomainsProps = {
    title?: string
    products?: DomainSection
    customers?: DomainSection
    className?: string
}

export const DOMAIN_PRODUCTS_DUMMY: DomainSection = {
    label: 'محصولات مورد نظر',
    summary: '۱۸۴ کالا — محصولات انتخابی',
    items: [
        'سوتین نخی مدل لوسی',
        'ست لباس خواب ساتن',
        'جوراب نخی ۶ عددی',
        'تاپ کشی مودال',
    ],
    pillClassName:
        'border-0 bg-primary-container [&_span]:text-on-primary-container',
}

export const DOMAIN_CUSTOMERS_DUMMY: DomainSection = {
    label: 'مشتریان مورد هدف',
    summary: 'بر اساس سطح مشتری',
    items: ['مشتریان طلایی', 'مشتریان نقره‌ای'],
    pillClassName: 'border-0 bg-info-container [&_span]:text-on-info-container',
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className='mb-4 flex items-center gap-2'>
        <span className='h-4 w-1 shrink-0 rounded-full bg-primary' />
        <h3 className='text-title-md font-bold text-on-surface'>{children}</h3>
    </div>
)

const DomainBlock = ({ section }: { section: DomainSection }) => (
    <div className='flex flex-col gap-3'>
        <div className='flex flex-row items-center justify-between gap-3'>
            <span className='text-label-lg text-on-surface'>{section.label}</span>
            <span className='text-label-md text-outline'>{section.summary}</span>
        </div>
        <div className='flex flex-row flex-wrap gap-2'>
            {section.items.map((item) => (
                <Pill
                    key={item}
                    text={item}
                    variant='tonal'
                    className={section.pillClassName}
                />
            ))}
        </div>
    </div>
)

const Domains = ({
    title = 'دامنه کمپین',
    products = DOMAIN_PRODUCTS_DUMMY,
    customers = DOMAIN_CUSTOMERS_DUMMY,
    className,
}: DomainsProps) => {
    return (
        <div
            className={cn(
                'rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5',
                className
            )}
            dir='rtl'
        >
            <SectionTitle>{title}</SectionTitle>
            <div className='flex flex-col gap-5'>
                <DomainBlock section={products} />
                <DomainBlock section={customers} />
            </div>
        </div>
    )
}

export default Domains
