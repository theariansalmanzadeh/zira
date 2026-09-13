"use client"

import CreateBranchProvider from './provider/CreateBranchProvider'
import Stepper from './components/Stepper'
import GeneralForm from './components/GeneralForm'
import WorkTimeForm from './components/WorkTimeForm'
import SetAccessForm from './components/SetAccessForm'
import { useState } from 'react'
import ChooseEmployeeForm from './components/ChooseEmployeeForm'

const CreateBranch = () => {
    const [activeStep, setActiveStep] = useState<number>(1)
    return (
        <CreateBranchProvider>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-4' dir='rtl'>
                <div className='col-span-1 md:col-span-3 ' dir='rtl'>
                    <Stepper>
                        <Stepper.Header />
                        <Stepper.List>
                            <Stepper.Step activeStep={activeStep} step={1} label='اطلاعات عمومی و نشانی' />
                            <Stepper.Step activeStep={activeStep} step={2} label='ساعات کاری' />
                            <Stepper.Step activeStep={activeStep} step={3} label='کارمندان' />
                            <Stepper.Step activeStep={activeStep} step={4} label='دسترسی‌ها و مجوزها' />
                        </Stepper.List>
                    </Stepper>
                </div>
                <div className='col-span-1 md:col-span-6' dir='rtl'>
                    {activeStep === 1 && <GeneralForm setActiveStep={setActiveStep} />}
                    {activeStep === 2 && <WorkTimeForm setActiveStep={setActiveStep} />}
                    {activeStep === 3 && <ChooseEmployeeForm setActiveStep={setActiveStep} />}
                    {activeStep === 4 && <SetAccessForm setActiveStep={setActiveStep} />}
                </div>
            </div>
        </CreateBranchProvider>
    )
}

export default CreateBranch
