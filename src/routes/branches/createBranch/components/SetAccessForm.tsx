"use client"

import { Dispatch, SetStateAction, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/src/shared/components/ui/Accordion'
import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import { Switch } from '@/src/shared/components/ui/Switch'
import { Button } from '@/src/shared/components/ui/button'
import { Icon } from '@/src/shared/components/Icons/Icon'

type AccessItem = {
    id: string
    label: string
    checked: boolean
}

type AccessGroup = {
    id: string
    label: string
    items: AccessItem[]
}

type Permission = {
    id: string
    label: string
    enabled: boolean
}

const INITIAL_ACCESS_GROUPS: AccessGroup[] = [
    {
        id: 'group-1',
        label: 'عنوان گروه دسترسی',
        items: [
            { id: 'access-1', label: 'عنوان دسترسی', checked: true },
            { id: 'access-2', label: 'عنوان دسترسی', checked: true },
            { id: 'access-3', label: 'عنوان دسترسی', checked: false },
            { id: 'access-4', label: 'عنوان دسترسی', checked: true },
            { id: 'access-5', label: 'عنوان دسترسی', checked: false },
        ],
    },
    {
        id: 'group-2',
        label: 'عنوان گروه دسترسی',
        items: [
            { id: 'access-6', label: 'عنوان دسترسی', checked: false },
            { id: 'access-7', label: 'عنوان دسترسی', checked: false },
            { id: 'access-8', label: 'عنوان دسترسی', checked: false },
        ],
    },
]

const INITIAL_PERMISSIONS: Permission[] = [
    { id: 'permission-1', label: 'عنوان مجوز', enabled: true },
    { id: 'permission-2', label: 'عنوان مجوز', enabled: false },
    { id: 'permission-3', label: 'عنوان مجوز', enabled: false },
    { id: 'permission-4', label: 'عنوان مجوز', enabled: true },
    { id: 'permission-5', label: 'عنوان مجوز', enabled: false },
]

const getGroupCheckedState = (
    items: AccessItem[]
): boolean | 'indeterminate' => {
    const checkedCount = items.filter((item) => item.checked).length

    if (checkedCount === 0) return false
    if (checkedCount === items.length) return true
    return 'indeterminate'
}

type SetAccessFormProps = {
    setActiveStep: Dispatch<SetStateAction<number>>
}

const SetAccessForm = ({ setActiveStep }: SetAccessFormProps) => {
    const [accessGroups, setAccessGroups] = useState(INITIAL_ACCESS_GROUPS)
    const [permissions, setPermissions] = useState(INITIAL_PERMISSIONS)

    const updateAccessItem = (
        groupId: string,
        itemId: string,
        checked: boolean
    ) => {
        setAccessGroups((groups) =>
            groups.map((group) =>
                group.id === groupId
                    ? {
                        ...group,
                        items: group.items.map((item) =>
                            item.id === itemId ? { ...item, checked } : item
                        ),
                    }
                    : group
            )
        )
    }

    const toggleAccessGroup = (groupId: string, checked: boolean) => {
        setAccessGroups((groups) =>
            groups.map((group) =>
                group.id === groupId
                    ? {
                        ...group,
                        items: group.items.map((item) => ({
                            ...item,
                            checked,
                        })),
                    }
                    : group
            )
        )
    }

    const togglePermission = (permissionId: string, enabled: boolean) => {
        setPermissions((items) =>
            items.map((item) =>
                item.id === permissionId ? { ...item, enabled } : item
            )
        )
    }

    return (
        <div className='flex flex-col gap-6' dir='rtl'>
            <div className='rounded-card-md bg-surface-container-lowest p-6'>
                <Accordion
                    type='single'
                    collapsible
                    defaultValue='group-1'
                    className='w-full'
                >
                    {accessGroups.map((group) => (
                        <AccordionItem
                            key={group.id}
                            value={group.id}
                            className='border-b border-outline-variant last:border-b-0'
                        >
                            <AccordionTrigger iconType='keyboardArrowDown400Linear' className='py-4 text-right font-normal'>
                                <div className='flex flex-1 items-center gap-3'>
                                    <Checkbox
                                        className='size-6'
                                        checked={getGroupCheckedState(group.items)}
                                        onCheckedChange={(checked) => {
                                            if (checked === 'indeterminate') return
                                            toggleAccessGroup(
                                                group.id,
                                                checked === true
                                            )
                                        }}
                                        onClick={(event) => event.stopPropagation()}
                                    />
                                    <span className='text-label-lg text-on-surface'>
                                        {group.label}
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className='pb-2'>
                                <div className='flex flex-col gap-1 pr-7'>
                                    {group.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className='flex items-center justify-start gap-3 py-2'
                                        >
                                            <Checkbox
                                                className='size-6'
                                                checked={item.checked}
                                                onCheckedChange={(checked) =>
                                                    updateAccessItem(
                                                        group.id,
                                                        item.id,
                                                        checked === true
                                                    )
                                                }
                                            />
                                            <span className='text-label-lg text-on-surface'>
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div className='flex flex-col gap-3'>
                <span className='text-label-lg font-medium text-outline'>
                    مجوزها
                </span>
                <div className='rounded-card-md bg-surface-container-lowest p-6'>
                    <div className='flex flex-col gap-1'>
                        {permissions.map((permission) => (
                            <div
                                key={permission.id}
                                className='flex items-center justify-between py-2'
                            >
                                <span className='text-label-lg text-on-surface'>
                                    {permission.label}
                                </span>
                                <Switch
                                    checked={permission.enabled}
                                    onCheckedChange={(enabled) =>
                                        togglePermission(permission.id, enabled)
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    <div className='flex flex-row gap-3 mt-10'>
                        <Button
                            type='button'
                            variant='ghost'
                            className='w-fit gap-2 self-end text-on-surface-variant'
                            onClick={() => setActiveStep(3)}
                        >
                            <Icon label='arrorwRight400Linear' className='size-4 text-on-surface-variant' />
                            <span className='text-label-lg'>بازگشت</span>
                        </Button>
                        <Button
                            type='button'
                            variant='primary'
                            size='lg'
                            className='w-full text-label-lg'
                        >
                            ثبت شعبه
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SetAccessForm
