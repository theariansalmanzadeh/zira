'use client'

import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import type { User } from '@/src/api/types/admin/user'
import { userKeys, useUpdateUser } from '@/src/routes/userManagment/hooks/user'
import { Button } from '@/src/shared/components/ui/button'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/src/shared/components/ui/Tabs'
import AddressForm from '../createNewUser/components/AddressForm'
import BankInfo from '../createNewUser/components/BankInfo'
import DocumentsForm from '../createNewUser/components/DocumentsForm'
import EmergencyForm from '../createNewUser/components/EmergencyForm'
import IdentityForm from '../createNewUser/components/IdentityForm'
import OccupationInfo from '../createNewUser/components/OccupationInfo'
import SecurityAndRole from '../createNewUser/components/SecurityAndRole'
import {
    newUserFormSchema,
    type NewUserFormValues,
} from '../createNewUser/schema'
import {
    toEditUserFormValues,
    toUpdateUserRequest,
} from './utils/toEditUserFormValues'

const EditUser = ({ user }: { user: User }) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { mutate: updateUser, isPending } = useUpdateUser()
    const methods = useForm<NewUserFormValues>({
        resolver: zodResolver(newUserFormSchema),
        defaultValues: toEditUserFormValues(user),
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    })

    const onSubmit = (values: NewUserFormValues) => {
        updateUser(
            {
                userId: user.id,
                body: toUpdateUserRequest(values),
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: userKeys.detail(user.id),
                    })
                    router.push(
                        `/admin/user-management/user-details/${user.id}`
                    )
                },
            }
        )
    }

    return (
        <FormProvider {...methods}>
            <form
                className='mx-auto flex w-full sm:max-w-[1000px] flex-col gap-6 bg-surface-container-lowest p-4 rounded-card-lg'
                dir='rtl'
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <Tabs defaultValue='identity' dir='rtl' className='w-full'>
                    <TabsList className='w-full justify-start overflow-x-auto overflow-y-hidden'>
                        <TabsTrigger value='identity'>اطلاعات هویتی</TabsTrigger>
                        <TabsTrigger value='address'>نشانی</TabsTrigger>
                        <TabsTrigger value='emergency'>مخاطبین ضروری</TabsTrigger>
                        <TabsTrigger value='bank'>اطلاعات بانکی</TabsTrigger>
                        <TabsTrigger value='security'>امنیت و نقش</TabsTrigger>
                        <TabsTrigger value='occupation'>اطلاعات شغلی</TabsTrigger>
                        <TabsTrigger value='documents'>مدارک</TabsTrigger>
                    </TabsList>

                    <TabsContent value='identity' className='pt-4'>
                        <IdentityForm />
                    </TabsContent>
                    <TabsContent value='address' className='pt-4'>
                        <AddressForm />
                    </TabsContent>
                    <TabsContent value='emergency' className='pt-4'>
                        <EmergencyForm />
                    </TabsContent>
                    <TabsContent value='bank' className='pt-4'>
                        <BankInfo />
                    </TabsContent>
                    <TabsContent value='security' className='pt-4'>
                        <SecurityAndRole />
                    </TabsContent>
                    <TabsContent value='occupation' className='pt-4'>
                        <OccupationInfo />
                    </TabsContent>
                    <TabsContent value='documents' className='pt-4'>
                        <DocumentsForm />
                    </TabsContent>
                </Tabs>

                <Button
                    type='submit'
                    variant='primary'
                    size='lg'
                    className='w-full text-label-lg'
                    isLoading={isPending}
                    disabled={isPending}
                >
                    ذخیره تغییرات
                </Button>
            </form>
        </FormProvider>
    )
}

export default EditUser
