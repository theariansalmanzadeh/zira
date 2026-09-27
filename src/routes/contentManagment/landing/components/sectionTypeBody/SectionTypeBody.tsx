'use client'

import {
    LANDING_SECTION_TYPE,
    type LandingSectionType,
} from '../../types'
import {
    BANNER_SLIDE_DUMMY,
    BRAND_SLIDE_DUMMY,
    PRODUCT_SLIDE_DUMMY,
} from './constants'
import BannerSlideBody from './components/BannerSlideBody'
import BrandSlideBody from './components/BrandSlideBody'
import ProductSlideBody from './components/ProductSlideBody'

type SectionTypeBodyProps = {
    type: LandingSectionType
    className?: string
}

const SectionTypeBody = ({ type, className }: SectionTypeBodyProps) => {
    if (type === LANDING_SECTION_TYPE.BANNER_SLIDE) {
        return (
            <BannerSlideBody data={BANNER_SLIDE_DUMMY} className={className} />
        )
    }

    if (type === LANDING_SECTION_TYPE.PRODUCT_SLIDE) {
        return (
            <ProductSlideBody data={PRODUCT_SLIDE_DUMMY} className={className} />
        )
    }

    if (type === LANDING_SECTION_TYPE.BRANDS) {
        return (
            <BrandSlideBody data={BRAND_SLIDE_DUMMY} className={className} />
        )
    }

    return null
}

export default SectionTypeBody
