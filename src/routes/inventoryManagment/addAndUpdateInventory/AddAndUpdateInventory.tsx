'use client'

import { useState } from 'react'
import Stepper from './components/Stepper'
import GeneralInfoForm from './components/GeneralInfoForm'
import ManagerForm from './components/ManagerForm'
import MapAddressForm from './components/MapAddressForm'
import { INVENTORY_STEPS } from './constants'

const AddAndUpdateInventory = () => {
    const [activeStep, setActiveStep] = useState(1)

    return (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-12' dir='rtl'>
            <div className='col-span-1 md:col-span-3' dir='rtl'>
                <Stepper>
                    <Stepper.Header />
                    <Stepper.List>
                        {INVENTORY_STEPS.map((item) => (
                            <Stepper.Step
                                key={item.step}
                                activeStep={activeStep}
                                step={item.step}
                                label={item.label}
                            />
                        ))}
                    </Stepper.List>
                </Stepper>
            </div>
            <div className='col-span-1 md:col-span-6' dir='rtl'>
                {activeStep === 1 && (
                    <GeneralInfoForm setActiveStep={setActiveStep} />
                )}
                {activeStep === 2 && (
                    <ManagerForm setActiveStep={setActiveStep} />
                )}
                {activeStep === 3 && (
                    <MapAddressForm setActiveStep={setActiveStep} />
                )}
            </div>
        </div>
    )
}

export default AddAndUpdateInventory
