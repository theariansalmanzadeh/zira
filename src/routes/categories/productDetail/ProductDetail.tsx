'use client'

import Info from './components/Info'
import OverView from './components/OverView'
import Seo from './components/Seo'
import SpesificationTabs from './components/SpesificationTabs'
import Stats from './components/Stats'

type ProductDetailProps = {
    image?: string
}

const ProductDetail = ({
    image = '/images/product1.jpg',
}: ProductDetailProps) => {
    return (
        <div className="flex w-full flex-col gap-4" dir="rtl">
            <OverView image={image} />
            <Stats />
            <div className='grid grid-cols-12 gap-8 '>
                <div className="gap-4 col-span-8">
                    <SpesificationTabs />
                </div>
                <div className="gap-4 col-span-4 flex flex-col">
                    <Info />
                    <Seo />
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
