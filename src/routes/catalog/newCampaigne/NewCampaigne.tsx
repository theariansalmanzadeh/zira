'use client'

import ProductFieldsLayout from '../addProducts/components/Layout'
import CampaigneForm from './components/CampaigneForm'
import PreviewCode from './components/PreviewCode'

const NewCampaigne = () => {
    return (
        <div className='w-full rounded-card-lg p-6'>
            <ProductFieldsLayout>
                <div className='col-span-8'>
                    <div className='mt-3'>
                        <CampaigneForm />
                    </div>
                </div>
                <div className='col-span-4'>
                    <div className='mt-3'>
                        <PreviewCode />
                    </div>
                </div>
            </ProductFieldsLayout>
        </div>
    )
}

export default NewCampaigne
