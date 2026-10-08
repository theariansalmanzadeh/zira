"use client"

import logo from "@/public/images/brandLogo.svg"
import loginImage from "@/public/images/login.jpg"
import { useRequestCustomerOtp } from "@/src/api/hooks/auth"
import { Button } from "@/src/shared/components/ui/button"
import { Card, CardContent, CardHeader } from '@/src/shared/components/ui/Card'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Input } from "@/src/shared/components/ui/Input"
import { PUBLIC_ROUTES } from "@/src/shared/constants"
import { useRegistration } from "@/src/shared/context/RegistrationProvider"
import { onlyNumber } from "@/src/shared/schema/generalSchema"
import Image from 'next/image'
import Link from "next/link"
import { useRouter } from "next/navigation"

const PHONE_NUMBER_REGEX = /^\d{11}$/

const LoginPage = () => {
    const { phoneNumber, setPhoneNumber } = useRegistration()
    const { push, back } = useRouter()
    const { mutate: requestOtp, isPending } = useRequestCustomerOtp()

    const submitHandler = () => {
        if (!PHONE_NUMBER_REGEX.test(phoneNumber)) return

        requestOtp(
            { phone_number: phoneNumber },
            {
                onSuccess: () => {
                    push(PUBLIC_ROUTES.otp)
                },
            }
        )
    }

    return (
        <>
            <Image src={loginImage} alt="login" fill className="w-full object-cover absolute top-0 left-0 z-0" />
            <div className="absolute top-0 left-0 w-full h-screen bg-black/30"></div>
            <Card className="w-full max-w-[400px] relative z-10">
                <CardHeader className="flex flex-row items-center justify-center relative pb-8">
                    <IconButton icon='rightArrow' iconClassName="w-6! h-6!" className="items-start absolute right-1 top-1" onClick={() => { back() }} />
                    <Image src={logo} alt="logo" width={143} height={22} />
                </CardHeader>
                <CardContent>
                    <p className="text-xl font-bold text-on-surface">ورود|تبت نام</p>
                    <div className="flex flex-col justify-start pt-5 pb-4 [&>span]:text-on-surface-variant! font-light">
                        <span>سلام!</span>
                        <span>لطفا شماره موبایل خود را وارد کنید</span>
                    </div>
                    <Input
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern="[0-9]*"
                        value={phoneNumber}
                        onChange={(value) => {
                            setPhoneNumber(onlyNumber(value).slice(0, 11))
                        }}
                        wrapperClassName="mb-11 rounded-2xl!"
                    />
                    <Button
                        className="w-full"
                        variant="primary"
                        onClick={submitHandler}
                        disabled={isPending}
                    >
                        ورود
                    </Button>
                    <div className="flex flex-row justify-start text-sm mt-8 text-on-surface">
                        <p className="text-nowrap">ورود شما به معنای پذیرش</p>
                        <Link href={PUBLIC_ROUTES.terms} className="text-primary">شرایط</Link>
                        <p>و</p>
                        <Link href={PUBLIC_ROUTES.terms} className="text-primary text-nowrap">قوانین حریم خصوصی</Link>
                        <p>است</p>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default LoginPage
