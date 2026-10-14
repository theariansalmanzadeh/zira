'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import type { User } from '@/src/api/types/admin/user'
import Departments from './component/Departments'
import Header from './component/header'
import PersonnelInfo from './component/PersonnelInfo'
import Role from './component/Role'
import SecurityStatus from './component/SecurityStatus'
import SessionManagement from './component/SessionManagement'

const UserDetail = ({ user }: { user: User }) => {
    return (
        <div className='flex w-full flex-col gap-4' dir='rtl'>
            <Header user={user} />
            <Tabs defaultValue='personnel' dir='rtl' className='w-full'>
                <TabsList className='w-full justify-start overflow-x-auto overflow-y-hidden'>
                    <TabsTrigger value='personnel'>اطلاعات پرسنلی</TabsTrigger>
                    <TabsTrigger value='role'>نقش</TabsTrigger>
                    <TabsTrigger value='departments'>دپارتمان‌ها</TabsTrigger>
                    <TabsTrigger value='sessions'>مدیریت نشست</TabsTrigger>
                    <TabsTrigger value='security'>امنیت و وضعیت</TabsTrigger>
                </TabsList>
                <TabsContent value='personnel'>
                    <PersonnelInfo />
                </TabsContent>
                <TabsContent value='role'>
                    <Role roles={user.roles} />
                </TabsContent>
                <TabsContent value='departments'>
                    <Departments departments={user.departments} />
                </TabsContent>
                <TabsContent value='sessions'>
                    <SessionManagement />
                </TabsContent>
                <TabsContent value='security'>
                    <SecurityStatus />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default UserDetail
