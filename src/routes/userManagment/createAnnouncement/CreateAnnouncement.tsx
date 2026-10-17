'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import {
    ToggleGroup,
    ToggleGroupItem,
} from '@/src/shared/components/ui/ToggleGroup'
import type { StaffUser } from '@/src/api/types/admin/user'
import type { SelectAnnouncementUserItem } from '@/src/shared/components/modals/components/selectUsers/types'
import { useListStaffUsers } from '../hooks/user'
import { useSendNotification } from '../hooks/notification'
import RecipientsSelector from './components/RecipientsSelector'
import {
    ANNOUNCEMENT_PRIORITY_OPTIONS,
    ANNOUNCEMENT_SUBJECT_OPTIONS,
} from './constants'
import {
    CREATE_ANNOUNCEMENT_DEFAULTS,
    createAnnouncementSchema,
    type CreateAnnouncementValues,
} from './schema'

const toSelectableUser = (user: StaffUser): SelectAnnouncementUserItem => ({
    id: user.id,
    name:
        [user.first_name, user.last_name].filter(Boolean).join(' ') ||
        user.username,
    personnelCode: user.personnel_code || user.username,
    role: user.job_title || '—',
    branch: user.primary_branch_id || '—',
    status: user.is_active ? 'active' : 'inactive',
    phone: user.phone_number,
})

const CreateAnnouncement = () => {
    const { push } = useRouter()
    const { mutateAsync, isPending } = useSendNotification()
    const { data: staffUsers } = useListStaffUsers()
    const users = useMemo(
        () => (staffUsers?.results ?? []).map(toSelectableUser),
        [staffUsers?.results]
    )
    const { control, handleSubmit, watch, setValue } =
        useForm<CreateAnnouncementValues>({
            resolver: zodResolver(createAnnouncementSchema),
            defaultValues: CREATE_ANNOUNCEMENT_DEFAULTS,
            mode: 'onSubmit',
        })

    const selectedUsers = watch('selectedUsers')

    const onSubmit = async (data: CreateAnnouncementValues) => {
        try {
            await mutateAsync({
                title: data.title.trim(),
                body: data.body.trim(),
                topic: data.subject,
                priority: data.priority,
                recipient_mode:
                    users.length > 0 &&
                    data.selectedUsers.length === users.length
                        ? 'ALL'
                        : 'SPECIFIC',
                recipient_ids: data.selectedUsers.map((user) => user.id),
            })
            push('/admin/user-management?sub=announcements')
        } catch {
            // Keep the form open so the user can retry after a failed send.
        }
    }

    return (
        <form
            className='mx-auto flex w-full max-w-[720px] flex-col gap-5 rounded-card-md bg-surface-container-lowest p-6'
            dir='rtl'
            onSubmit={handleSubmit(onSubmit)}
        >
            <Controller
                name='title'
                control={control}
                render={({ field, fieldState }) => (
                    <Input
                        label='عنوان *'
                        placeholder='عنوان کوتاه اعلان'
                        value={field.value}
                        onChange={field.onChange}
                        error={!!fieldState.error}
                        msg={fieldState.error?.message}
                    />
                )}
            />

            <div className='flex flex-col'>
                <label className='mb-1.5 text-label-md text-on-surface-variant'>
                    متن پیام <span className='text-error'>*</span>
                </label>
                <Controller
                    name='body'
                    control={control}
                    render={({ field, fieldState }) => (
                        <Textarea
                            placeholder='متن اعلان...'
                            value={field.value}
                            onChange={(event) =>
                                field.onChange(event.target.value)
                            }
                            className='min-h-28 bg-surface-container-high'
                            aria-invalid={!!fieldState.error}
                        />
                    )}
                />
            </div>

            <Controller
                name='subject'
                control={control}
                render={({ field }) => (
                    <FormDropdown
                        label='موضوع'
                        value={field.value}
                        options={[...ANNOUNCEMENT_SUBJECT_OPTIONS]}
                        onChange={field.onChange}
                        placeholder='انتخاب موضوع'
                    />
                )}
            />

            <div className='flex flex-col'>
                <span className='mb-1.5 text-label-md text-on-surface-variant'>
                    اولویت
                </span>
                <Controller
                    name='priority'
                    control={control}
                    render={({ field }) => (
                        <ToggleGroup
                            type='single'
                            value={field.value}
                            onValueChange={(value) => {
                                if (!value) return
                                field.onChange(value)
                            }}
                            variant='filled'
                            className='w-full rounded-container-md bg-surface-container-high p-1.5'
                        >
                            {ANNOUNCEMENT_PRIORITY_OPTIONS.map((option) => (
                                <ToggleGroupItem
                                    key={option.value}
                                    value={option.value}
                                    className='flex-1 data-[state=on]:bg-surface-container-lowest data-[state=on]:text-primary data-[state=on]:shadow-sm'
                                >
                                    {option.label}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    )}
                />
            </div>

            <RecipientsSelector
                users={users}
                selectedUsers={selectedUsers}
                onUsersChange={(users) =>
                    setValue('selectedUsers', users, { shouldValidate: true })
                }
            />

            <Button
                type='submit'
                variant='primary'
                className='mt-2 w-full'
                isLoading={isPending}
            >
                ارسال اعلان
            </Button>
        </form>
    )
}

export default CreateAnnouncement
