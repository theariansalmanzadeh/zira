'use client'

import {
    type Dispatch,
    type SetStateAction,
    useState,
    type ChangeEvent,
} from 'react'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { Button } from '@/src/shared/components/ui/button'

const handleInputChange =
    (setter: (value: string) => void) =>
    (value: string | ChangeEvent<HTMLInputElement>) => {
        setter(typeof value === 'string' ? value : value.target.value)
    }

type GeneralInfoFormProps = {
    setActiveStep: Dispatch<SetStateAction<number>>
}

const GeneralInfoForm = ({ setActiveStep }: GeneralInfoFormProps) => {
    const [code, setCode] = useState('WH-1005')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [area, setArea] = useState('')
    const [address, setAddress] = useState('')

    return (
        <div
            className='flex flex-col gap-6 rounded-card-md bg-surface-container-lowest p-6'
            dir='rtl'
        >
            <div className='flex flex-col gap-4'>
                <h2 className='text-title-md font-semibold text-on-surface'>
                    اطلاعات کلی
                </h2>

                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                    <Input
                        label='کد انبار'
                        placeholder='WH-1005'
                        value={code}
                        onChange={handleInputChange(setCode)}
                    />
                    <Input
                        label='نام انبار'
                        placeholder='مثلاً انبار مرکزی تهران'
                        value={name}
                        onChange={handleInputChange(setName)}
                    />
                    <Input
                        label='تلفن'
                        placeholder='+۹۸ ۲۱ ...'
                        value={phone}
                        onChange={handleInputChange(setPhone)}
                    />
                    <Input
                        label='متراژ (متر مربع)'
                        placeholder='۴۵۰'
                        inputMode='numeric'
                        value={area}
                        onChange={handleInputChange(setArea)}
                    />
                    <div className='col-span-1 flex flex-col sm:col-span-2'>
                        <label className='mb-1.5 text-label-md text-on-surface-variant'>
                            آدرس انبار
                        </label>
                        <Textarea
                            placeholder='آدرس کامل انبار را وارد کنید'
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            className='min-h-28 resize-none rounded-container-lg border-0 bg-surface-container-high px-3 py-3'
                        />
                    </div>
                </div>
            </div>

            <Button
                type='button'
                variant='primary'
                size='lg'
                className='w-full text-label-lg'
                onClick={() => setActiveStep(2)}
            >
                ادامه
            </Button>
        </div>
    )
}

export default GeneralInfoForm
