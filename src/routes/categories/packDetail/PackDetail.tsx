'use client'

import Info from '../productDetail/components/Info'
import OverView from '../productDetail/components/OverView'
import Seo from '../productDetail/components/Seo'
import SpesificationTabs from '../productDetail/components/SpesificationTabs'
import Stats from '../productDetail/components/Stats'

type PackDetailProps = {
    image?: string
}

const PackDetail = ({
    image = '/images/product1.jpg',
}: PackDetailProps) => {
    return (
        <div className="flex w-full flex-col gap-4" dir="rtl">
            <OverView image={image} />
            <Stats />
            <div className='grid grid-cols-12 gap-8 '>
                <div className="gap-4 col-span-8">
                    <SpesificationTabs warehouseLabel='انبار' showGallery />
                </div>
                <div className="gap-4 col-span-4 flex flex-col">
                    <Info />
                    <Seo />
                </div>
            </div>
        </div>
    )
}

export default PackDetail
