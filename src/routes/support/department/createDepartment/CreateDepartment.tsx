"use client"

import { useState, type ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { CopyableInput } from '@/src/shared/components/ui/CopyableInput'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { RELATED_SECTION_OPTIONS, MANAGER_OPTIONS, SLA_OPTIONS } from './constants'
import TimeSelectRow from './components/TimeSelectRow'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useModalStore } from '@/src/shared/store/modal-store'

const handleInputChange =
    (setter: (value: string) => void) =>
        (value: string | ChangeEvent<HTMLInputElement>) => {
            setter(typeof value === 'string' ? value : value.target.value)
        }

const CreateDepartment = () => {
    const { back } = useRouter()
    const [departmentName, setDepartmentName] = useState('')
    const [relatedSection, setRelatedSection] = useState<string>()
    const [departmentManager, setDepartmentManager] = useState<string>()
    const [slaResponse, setSlaResponse] = useState<string>()
    const [responseHours, setResponseHours] = useState({ start: '09:00', end: '18:00' })
    const [description, setDescription] = useState('')
    const [departmentManagerSearchQuery, setDepartmentManagerSearchQuery] = useState('')
    const openModal = useModalStore((state) => state.openModal)
    const isSubmitDisabled =
        !departmentName.trim() || !relatedSection || !slaResponse

    return (
        <div className='mx-auto flex w-full max-w-[700px] flex-col gap-6' dir='rtl'>
            <div className='flex flex-row items-center gap-2'>
                <IconButton
                    icon='arrorwRight400Linear'
                    variant='ghost'
                    iconClassName='size-6'
                    onClick={() => back()}
                />
                <span className='text-title-lg font-bold text-on-surface'>
                    ایجاد دپارتمان جدید
                </span>
            </div>

            <div className='rounded-card-md bg-surface-container-lowest p-6'>
                <div className='grid grid-cols-2 gap-6'>
                    <Input
                        label='نام دپارتمان *'
                        placeholder='مثلاً پشتیبانی مالی'
                        value={departmentName}
                        onChange={handleInputChange(setDepartmentName)}
                    />
                    <div className='flex flex-col'>
                        <span className='mb-1.5 text-label-md text-on-surface-variant'>
                            شناسه دپارتمان
                        </span>
                        <CopyableInput
                            value='DP-5318_92'
                            onCopy={() => { }}
                            readOnly
                            groupClassName='bg-surface-container-high h-10 rounded-container-lg border-0'
                        />
                    </div>
                    <FormDropdown
                        label='بخش مربوطه *'
                        value={relatedSection}
                        options={RELATED_SECTION_OPTIONS}
                        onChange={setRelatedSection}
                    />
                    <FormDropdown
                        hasSearch
                        searchQuery={departmentManagerSearchQuery}
                        onSearch={setDepartmentManagerSearchQuery}
                        label='مسئول دپارتمان'
                        placeholder='انتخاب کاربر'
                        value={departmentManager}
                        options={MANAGER_OPTIONS}
                        onChange={setDepartmentManager}
                    />
                    <FormDropdown
                        label='پاسخ SLA *'
                        value={slaResponse}
                        options={SLA_OPTIONS}
                        onChange={setSlaResponse}
                    />
                    <TimeSelectRow
                        value={responseHours}
                        onChange={setResponseHours}
                    />
                    <div className='col-span-2 flex flex-col'>
                        <label className='mb-1.5 text-label-md text-on-surface-variant'>
                            توضیحات
                        </label>
                        <Textarea
                            className='bg-surface-container-high min-h-32 resize-none rounded-container-lg border-0 px-3 py-2 text-on-surface placeholder:text-outline'
                            placeholder='این بخش به چه تیکت‌هایی رسیدگی می‌کند؟'
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-6 rounded-card-md bg-surface-container-lowest p-3'>
                <div className='flex w-full items-center justify-between'>
                    <div className='flex flex-col gap-1 text-right'>
                        <span className='text-label-lg text-on-surface'>کارشناسان</span>
                        <span className='text-label-md text-outline'>
                            کارشناسان این دپارتمان را از لیست انتخاب کنید
                        </span>
                    </div>
                    <Button variant='ghost' onClick={() => openModal(ModalTypes.SELECT_USER_AND_GROUPS)}>
                        <span className='text-label-md text-on-surface-variant'>انتخاب</span>
                        <Icon label='chevronDown300Linear' className='size-4 rotate-90 text-on-surface-variant' />
                    </Button>
                </div>
                <Button
                    variant='primary'
                    size='lg'
                    className='w-full text-label-lg'
                    disabled={isSubmitDisabled}
                >
                    ثبت دپارتمان
                </Button>
            </div>
        </div>
    )
}

export default CreateDepartment
