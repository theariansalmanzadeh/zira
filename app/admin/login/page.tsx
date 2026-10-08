'use client'

import logo from '@/public/images/brandLogo.svg'
import loginImage from '@/public/images/login.jpg'
import { useStaffLogin } from '@/src/api/hooks/auth'
import type { ApiError } from '@/src/api/http'
import { Button } from '@/src/shared/components/ui/button'
import { Card, CardContent, CardHeader } from '@/src/shared/components/ui/Card'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Input } from '@/src/shared/components/ui/Input'
import { PasswordInput } from '@/src/shared/components/ui/PasswordInput'
import {
    STAFF_LOGIN_DEFAULTS,
    staffLoginSchema,
    type StaffLoginFormValues,
} from '@/src/routes/adminLogin/schema'
import { useStaffAuthStore } from '@/src/shared/store/staff-auth-store'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const AdminLoginPage = () => {
    const { back, push } = useRouter()
    const setAccessToken = useStaffAuthStore((state) => state.setAccessToken)
    const { mutate: login, isPending } = useStaffLogin()

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<StaffLoginFormValues>({
        resolver: zodResolver(staffLoginSchema),
        defaultValues: STAFF_LOGIN_DEFAULTS,
        mode: 'onSubmit',
    })

    const onSubmit = (values: StaffLoginFormValues) => {
        login(values, {
            onSuccess: (data) => {
                setAccessToken(data.access_token)
                push('/admin')
            },
            onError: (error) => {
                toast.error((error as ApiError).message)
            },
        })
    }

    return (
        <>
            <Image
                src={loginImage}
                alt='login'
                fill
                className='absolute top-0 left-0 z-0 w-full object-cover'
            />
            <div className='absolute top-0 left-0 h-screen w-full bg-black/30' />
            <Card className='relative z-10 w-full max-w-[400px]'>
                <CardHeader className='relative flex flex-row items-center justify-center pb-8'>
                    <IconButton
                        icon='rightArrow'
                        iconClassName='w-6! h-6!'
                        className='absolute top-1 right-1 items-start'
                        onClick={() => back()}
                    />
                    <Image src={logo} alt='logo' width={143} height={22} />
                </CardHeader>
                <CardContent>
                    <p className='text-xl font-bold text-on-surface'>ورود پنل مدیریت</p>
                    <div className='flex flex-col justify-start pt-5 pb-4 font-light [&>span]:text-on-surface-variant!'>
                        <span>سلام!</span>
                        <span>لطفا نام کاربری و رمز عبور خود را وارد کنید</span>
                    </div>
                    <form
                        className='flex flex-col gap-4'
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        <Controller
                            name='username'
                            control={control}
                            render={({ field, fieldState }) => (
                                <Input
                                    label='نام کاربری'
                                    autoComplete='username'
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    error={!!fieldState.error}
                                    msg={fieldState.error?.message}
                                    wrapperClassName='rounded-2xl!'
                                />
                            )}
                        />
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-label-md text-on-surface-variant'>
                                رمز عبور
                            </label>
                            <PasswordInput
                                autoComplete='current-password'
                                placeholder='رمز عبور'
                                wrapperClassName='rounded-2xl!'
                                error={!!errors.password}
                                message={errors.password?.message}
                                {...register('password')}
                            />
                        </div>
                        <Button
                            type='submit'
                            className='mt-6 w-full'
                            variant='primary'
                            isLoading={isPending}
                        >
                            ورود
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default AdminLoginPage
