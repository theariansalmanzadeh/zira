"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import FormDropdown, {
    type FormDropdownOption,
} from '@/src/shared/components/ui/FormDropdown'
import SelectUsers from './compoenents/SelectUsers'
import { CopyableInput } from '@/src/shared/components/ui/CopyableInput'

const GROUP_ROLE_OPTIONS: FormDropdownOption[] = [
    { label: 'مدیر', value: 'manager' },
    { label: 'کارشناس', value: 'expert' },
    { label: 'اپراتور', value: 'operator' },
]

const GROUP_MANAGER_OPTIONS: FormDropdownOption[] = [
    { label: 'نام کاربر ۱', value: 'user-1' },
    { label: 'نام کاربر ۲', value: 'user-2' },
    { label: 'نام کاربر ۳', value: 'user-3' },
]

const CreateNewGroup = () => {
    const { back } = useRouter()
    const [groupRole, setGroupRole] = useState<string>()
    const [groupManager, setGroupManager] = useState<string>()

    return (
        <div className='flex w-full max-w-[700px] mx-auto flex-col gap-6' dir='rtl'>
            <div className='flex flex-row items-center gap-2'>
                <IconButton
                    icon='rightArrow'
                    variant='ghost'
                    iconClassName='size-6'
                    onClick={() => back()}
                />
                <span className='text-title-lg font-bold text-on-surface'>ایجاد گروه جدید</span>
            </div>
            <div className='rounded-card-md bg-surface-container-lowest p-6'>
                <div className='grid grid-cols-2 gap-6'>
                    <Input label='نام گروه *' placeholder='نام گروه' value='' onChange={() => { }} />
                    <CopyableInput
                        label='شناسه گروه'
                        value='GR-5318_92'
                        onCopy={() => { }}
                        readOnly
                    />
                    <FormDropdown
                        label='نقش گروه *'
                        value={groupRole}
                        options={GROUP_ROLE_OPTIONS}
                        onChange={setGroupRole}
                    />
                    <FormDropdown
                        label='مدیر گروه *'
                        value={groupManager}
                        options={GROUP_MANAGER_OPTIONS}
                        onChange={setGroupManager}
                    />
                    <div className='col-span-2 flex flex-col'>
                        <label className='mb-1.5 text-label-md text-on-surface-variant'>توضیحات</label>
                        <Textarea
                            className='bg-surface-container-high min-h-32 resize-none rounded-container-lg border-0 px-3 py-2 text-on-surface placeholder:text-outline'
                            placeholder=''
                        />
                    </div>
                </div>
            </div>

            <SelectUsers />
        </div >
    )
}

export default CreateNewGroup
