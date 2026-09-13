"use client"

import { useState, type ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Input, InputField } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import CopyButton from '@/src/shared/components/ui/CopyButton'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/src/shared/components/ui/InputGroup'
import { Label } from '@/src/shared/components/ui/Label'

const CONTRACT_ID = 'CMP-5141'

const handleInputChange =
    (setter: (value: string) => void) =>
        (value: string | ChangeEvent<HTMLInputElement>) => {
            setter(typeof value === 'string' ? value : value.target.value)
        }

const Header = () => {
    const { back } = useRouter()
    const [contractTitle, setContractTitle] = useState('')
    const [adjustmentPercent, setAdjustmentPercent] = useState('')
    const [contractDate, setContractDate] = useState<Date>()

    return (
        <div className='flex flex-col gap-6' dir='rtl'>
            <div className='flex flex-row items-center justify-between gap-3'>
                <div className='flex flex-row items-center gap-2'>
                    <IconButton
                        icon='arrorwRight400Broken'
                        variant='ghost'
                        iconClassName='size-6! text-on-surface-variant'
                        onClick={() => back()}
                    />
                    <span className='text-title-lg font-bold text-on-surface'>
                        قرارداد قیمت‌گذاری جدید (تعدیل گروهی)
                    </span>
                </div>

                <div className='flex shrink-0 flex-row items-center gap-2'>
                    <Button variant='outline'>ذخیره پیش‌نویس</Button>
                    <Button variant='primary'>ثبت و اعمال روی دامنه</Button>
                </div>
            </div>

            <div className='rounded-card-md bg-surface-container-lowest p-6'>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-4'>
                    <Input
                        label='عنوان قرارداد'
                        placeholder='عنوان قرارداد'
                        value={contractTitle}
                        onChange={handleInputChange(setContractTitle)}
                    />

                    <div className='flex flex-col'>
                        <Label className='mb-1.5 text-label-md text-on-surface-variant'>
                            شناسه
                        </Label>
                        <InputGroup className='h-10 rounded-container-lg border-0 bg-surface-container-high'>
                            <InputGroupInput value={CONTRACT_ID} readOnly />
                            <InputGroupAddon align='inline-end'>
                                <CopyButton
                                    value={CONTRACT_ID}
                                    onCopy={() =>
                                        navigator.clipboard.writeText(CONTRACT_ID)
                                    }
                                    asInputGroupButton
                                />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>

                    <div className='flex flex-col'>
                        <label className='mb-1.5 text-label-md text-on-surface-variant'>
                            درصد تعدیل
                        </label>
                        <div className='bg-surface-container-high flex h-10 flex-row items-center gap-1.5 rounded-container-lg px-3'>
                            <InputField
                                type='number'
                                placeholder='-'
                                value={adjustmentPercent}
                                onChange={(e) => setAdjustmentPercent(e.target.value)}
                                className='bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
                            />
                            <span className='shrink-0 text-outline'>%</span>
                        </div>
                    </div>

                    <CalendarButton
                        label='تاریخ'
                        placeholder='انتخاب تاریخ'
                        value={contractDate}
                        onChange={setContractDate}
                    />
                </div>
            </div>
        </div>
    )
}

export default Header
