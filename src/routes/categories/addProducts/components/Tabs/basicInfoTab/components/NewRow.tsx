import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import React, { useState } from 'react'
import { ACCUMULATION_CEILING_OPTIONS, PURCHASE_THRESHOLD_OPTIONS } from '../constats'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'

const NewRow = () => {
    const [accumulationCeiling, setAccumulationCeiling] = useState<string>()
    const [purchaseThreshold, setPurchaseThreshold] = useState<string>()
    const [numberOfRows, setNumberOfRows] = useState<number>(1)

    return (
        <>
            <Button
                type='button'
                variant='ghost'
                className='self-start justify-start inline-flex gap-1  text-label-md text-outline'
                onClick={() => setNumberOfRows(numberOfRows + 1)}
            >
                افزودن جدول مشخصات
                <Icon label='plus' fill='stroke-outline' />
            </Button>

            <hr className='col-span-2 border-0 border-t border-dashed border-outline-variant' />

            {Array.from({ length: numberOfRows }).map(() => (
                <>
                    <FormDropdown
                        label='سقف انباشت'
                        value={accumulationCeiling}
                        options={ACCUMULATION_CEILING_OPTIONS}
                        onChange={setAccumulationCeiling}
                    />
                    <FormDropdown
                        label='آستانه خرید'
                        value={purchaseThreshold}
                        options={PURCHASE_THRESHOLD_OPTIONS}
                        onChange={setPurchaseThreshold}
                    />
                </>
            ))}
        </>
    )
}

export default NewRow