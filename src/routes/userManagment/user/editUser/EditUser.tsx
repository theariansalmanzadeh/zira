'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
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
    EDIT_USER_DEFAULT_VALUES,
    newUserFormSchema,
    type NewUserFormValues,
} from '../createNewUser/schema'

type EditUserProps = {
    id: string
}

const EditUser = ({ id }: EditUserProps) => {
    const methods = useForm<NewUserFormValues>({
        resolver: zodResolver(newUserFormSchema),
        defaultValues: EDIT_USER_DEFAULT_VALUES,
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    })

    const onSubmit = (_data: NewUserFormValues) => {
        // Placeholder until update-user API is wired.
        console.log('edit user', id, _data)
    }

    return (
        <FormProvider {...methods}>
            <form
                className='mx-auto flex w-full max-w-[900px] flex-col gap-6'
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
                >
                    ذخیره تغییرات
                </Button>
            </form>
        </FormProvider>
    )
}

export default EditUser
