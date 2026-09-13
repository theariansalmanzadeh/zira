'use client'

import { cn } from '@shared/libs/utils'
import {
    LANDING_SECTION_TYPE,
    type LandingSectionType,
} from '../types'
import { LANDING_TYPE_STYLES } from '../constants'

type SectionTypeThumbnailProps = {
    type: LandingSectionType
    className?: string
}

const shapeClassName = 'bg-current/35'

const BannerSlideThumbnail = () => (
    <div
        className={cn(
            'h-6 w-7 rounded-sm',
            shapeClassName
        )}
    />
)

const BannerThumbnail = () => (
    <div className="flex flex-col items-center gap-0.5">
        <div
            className={cn(
                'h-1 w-8 rounded-card-md',
                shapeClassName
            )}
        />
        <div
            className={cn(
                'h-4 w-full rounded-sm bg-current/15!',
                shapeClassName
            )}
        />
    </div>
)

const ProductSlideThumbnail = () => (
    <div className="flex h-5 items-stretch gap-0.5">
        <div className={cn('w-1 h-1 rounded-full self-center', shapeClassName)} />
        <div className={cn('w-2 rounded-xs', shapeClassName)} />
        <div className={cn('w-2 rounded-xs', shapeClassName)} />
        <div className={cn('w-2 rounded-xs', shapeClassName)} />
        <div className={cn('w-1 h-1 rounded-full self-center', shapeClassName)} />
    </div>
)

const FaqThumbnail = () => (
    <div className="flex items-end w-5 flex-col gap-1">
        <span className={cn('h-0.5 w-full rounded-full', shapeClassName)} />
        <span className={cn('h-0.5 w-2/3 rounded-full', shapeClassName)} />
        <span className={cn('h-0.5 w-1/3 rounded-full', shapeClassName)} />
    </div>
)

const BrandsThumbnail = () => (
    <div className="flex flex-wrap justify-center items-center gap-1">
        <div
            className={cn(
                'h-2 w-4 rounded-full',
                shapeClassName
            )}
        />
        <div
            className={cn(
                'h-2 w-4 rounded-full',
                shapeClassName
            )}
        />
        <div
            className={cn(
                'h-2 w-4 rounded-full',
                shapeClassName
            )}
        />
        <div
            className={cn(
                'h-2 w-4 rounded-full',
                shapeClassName
            )}
        />
    </div>
)

export const getSectionTypeThumbnail = (type: LandingSectionType) => {
    switch (type) {
        case LANDING_SECTION_TYPE.BANNER_SLIDE:
            return <BannerSlideThumbnail />
        case LANDING_SECTION_TYPE.PRODUCT_SLIDE:
            return <ProductSlideThumbnail />
        case LANDING_SECTION_TYPE.FAQ:
            return <FaqThumbnail />
        case LANDING_SECTION_TYPE.BRANDS:
            return <BrandsThumbnail />
        case LANDING_SECTION_TYPE.BANNER:
        default:
            return <BannerThumbnail />
    }
}

const SectionTypeThumbnail = ({
    type,
    className,
}: SectionTypeThumbnailProps) => {
    const typeStyles = LANDING_TYPE_STYLES[type]

    return (
        <div
            className={cn(
                'flex size-11 shrink-0 items-center justify-center rounded-card-md text-on-surface',
                typeStyles.iconBg,
                className
            )}
        >
            {getSectionTypeThumbnail(type)}
        </div>
    )
}

export default SectionTypeThumbnail
