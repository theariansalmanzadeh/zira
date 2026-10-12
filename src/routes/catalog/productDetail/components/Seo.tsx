'use client'

import { Input } from '@/src/shared/components/ui/Input'
import { cn } from '@shared/libs/utils'

type SeoProps = {
    slug?: string
    metaTitle?: string
    onSlugChange?: (value: string) => void
    onMetaTitleChange?: (value: string) => void
    className?: string
}

const Seo = ({
    slug = 'product-slug',
    metaTitle = 'سوتین بدون فنر مدل لوسی',
    onSlugChange,
    onMetaTitleChange,
    className,
}: SeoProps) => {
    return (
        <div
            className={cn(
                'rounded-card-lg border border-outline-variant bg-surface-container-lowest p-4',
                className
            )}
            dir="rtl"
        >
            <h3 className="pb-3 text-title-md font-bold text-on-surface">سئو</h3>
            <div className="border-0 border-t border-outline-variant" />
            <div className="mt-4 flex flex-col gap-4">
                <Input
                    label="Slug"
                    value={slug}
                    onChange={onSlugChange}
                    dir="ltr"
                    className="text-left"
                />
                <Input
                    label="Meta Title"
                    value={metaTitle}
                    onChange={onMetaTitleChange}
                />
            </div>
        </div>
    )
}

export default Seo
