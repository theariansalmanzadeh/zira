'use client'

import logo from '@/public/images/brandLogo.svg'
import logoLockup from '@/public/images/logoLockup.svg'
import logoMark from '@/public/images/logoMark.svg'
import { useStaffLogin } from '@/src/api/hooks/auth'
import type { ApiError } from '@/src/api/http'
import { Icon } from '@/src/shared/components/Icons/Icon'
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
        setError,
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
                setError('password', { message: (error as ApiError).message })
            },
        })
    }

    return (
        <div className='grid min-h-screen min-w-[1280px] w-full grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] bg-[#f5f2f3]'>
            <aside
                className='relative order-2 m-4 flex flex-col justify-between overflow-hidden rounded-3xl border border-[#EADBDA] bg-[linear-gradient(160deg,#FCF8F7_0%,#F7EFEE_55%,#EFE2E1_100%)] px-11 py-10 text-[#23232d]'
                aria-hidden='true'
            >
                <div
                    className='pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_80%_12%,rgba(255,255,255,.9)_0,rgba(255,255,255,0)_42%),linear-gradient(rgba(144,70,73,.055)_1px,transparent_1px)_0_0/44px_44px,linear-gradient(90deg,rgba(144,70,73,.055)_1px,transparent_1px)_0_0/44px_44px] [mask-image:linear-gradient(180deg,#000_0%,rgba(0,0,0,.6)_65%,rgba(0,0,0,.2)_100%)]'
                />
                <Image
                    src={logoMark}
                    alt=''
                    width={560}
                    height={560}
                    className='pointer-events-none absolute bottom-[-12%] left-[-9%] h-auto w-[min(560px,78%)] -rotate-[8deg] opacity-[0.09] select-none'
                />
                <div className='relative flex items-center gap-[18px]'>
                    <Image
                        src={logoLockup}
                        alt='زیرا مارکت'
                        height={64}
                        width={307}
                        className='block h-16 w-auto'
                        priority
                    />
                </div>
                <div className='relative max-w-[460px]'>
                    <h2 className='text-[clamp(30px,3vw,40px)] leading-[1.45] font-extrabold text-[#23232d]'>
                        پنل مدیریت
                        <br />
                        عمده‌فروشی{' '}
                        <span className='bg-[linear-gradient(135deg,#DA9999_0%,#D87F7D_20%,#C66A69_45%,#BE4849_65%,#904649_80%,#6D2F32_100%)] bg-clip-text text-transparent'>
                            زیرا مارکت
                        </span>
                    </h2>
                    <p className='mt-4 text-[15px] leading-[1.95] text-[#5a5a64]'>
                        کاتالوگ، قیمت‌گذاری، مشتریان، شعب و محتوای فروشگاه — همه در یک پنل.
                    </p>
                </div>
                <div className='relative flex items-center gap-2 text-[12.5px] text-[#6a6a73]'>
                    <Icon label='shield400Linear' size={16} className='text-[#904649]' />
                    <span>ورود فقط برای کارکنان مجاز است و همه‌ی تلاش‌های ورود ثبت می‌شوند.</span>
                </div>
            </aside>

            <main className='order-1 flex items-center justify-center px-6 py-8'>
                <div className='flex w-full max-w-[420px] flex-col gap-[22px]'>
                    <Card className='w-full max-w-[400px]'>
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
                    <footer className='text-center text-[11.5px] text-[#9a9aa5]'>
                        © زیرا مارکت · پنل مدیریت
                    </footer>
                </div>
            </main>
        </div>
    )
}

export default AdminLoginPage
