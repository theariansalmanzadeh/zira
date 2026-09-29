'use client'

import { Fragment } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { ModalTypes, SelectUserItem } from '@/src/shared/components/modals/types'
import { useModalStore } from '@/src/shared/store/modal-store'
import { useFormContext } from 'react-hook-form'
import type { CreateNewGroupValues } from '../schema'

const SelectUsers = () => {
    const { openModal } = useModalStore()
    const { setValue, watch } = useFormContext<CreateNewGroupValues>()
    const users = watch('users')

    const openUserPicker = () => {
        openModal(ModalTypes.SELECT_USER_AND_GROUPS, {
            hasOnlyUsers: true,
            selectedIds: users.map((user) => user.id),
            onSelectUser: (selected: SelectUserItem[]) => {
                setValue('users', selected, { shouldValidate: true })
            },
        })
    }

    const removeUser = (id: string) => {
        setValue(
            'users',
            users.filter((user) => user.id !== id),
            { shouldValidate: true }
        )
    }

    return (
        <>
            <div className='flex flex-col gap-6 rounded-card-md bg-surface-container-lowest p-3'>
                <div className='flex w-full items-center justify-between'>
                    <div className='flex flex-col gap-1 text-right'>
                        <span className='text-label-lg text-on-surface'>کاربران</span>
                        <span className='text-label-md text-outline'>
                            کاربران دارای نقش در این گروه را از لیست انتخاب کنید
                        </span>
                    </div>
                    <div className='flex shrink-0 items-center gap-1 text-outline'>
                        <Button variant='ghost' type='button' onClick={openUserPicker}>
                            <span className='text-label-md'>انتخاب</span>
                            <Icon label='chevronLeft400Linear' className='size-6!' />
                        </Button>
                    </div>
                </div>
                {users.length > 0 && (
                    <div
                        className='grid grid-cols-6 items-center overflow-hidden rounded-card-md border border-outline-variant text-right'
                        dir='rtl'
                    >
                        {['نام کاربر', 'شناسه', 'نقش‌ها', 'دسترسی‌ها', 'وضعیت'].map(
                            (label) => (
                                <div
                                    key={label}
                                    className='px-3 py-2 text-label-md font-normal text-outline'
                                >
                                    {label}
                                </div>
                            )
                        )}
                        <div className='px-3 py-2' />
                        {users.map((user) => (
                            <Fragment key={user.id}>
                                <div className='border-t border-outline-variant px-3 py-2 text-label-md text-on-surface-variant'>
                                    {user.userName}
                                </div>
                                <div className='border-t border-outline-variant px-3 py-2 text-label-md text-on-surface-variant'>
                                    {user.userId}
                                </div>
                                <div className='border-t border-outline-variant px-3 py-2 text-label-md text-on-surface-variant'>
                                    {user.roles}
                                </div>
                                <div className='border-t border-outline-variant px-3 py-2 text-label-md text-on-surface-variant'>
                                    {user.permissions}
                                </div>
                                <div className='border-t border-outline-variant px-3 py-2 text-label-md text-on-surface-variant'>
                                    {user.status === 'active' ? 'فعال' : 'غیرفعال'}
                                </div>
                                <div className='border-t border-outline-variant px-3 py-2'>
                                    <button
                                        type='button'
                                        className='flex items-center justify-center'
                                        onClick={() => removeUser(user.id)}
                                        aria-label='حذف کاربر'
                                    >
                                        <Icon
                                            label='closeSm400Linear'
                                            className='size-5 text-outline'
                                        />
                                    </button>
                                </div>
                            </Fragment>
                        ))}
                    </div>
                )}
            </div>
            <Button
                variant='primary'
                size='lg'
                className='w-full text-label-lg'
                type='submit'
            >
                ثبت گروه
            </Button>
        </>
    )
}

export default SelectUsers
