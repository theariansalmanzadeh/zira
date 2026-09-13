"use client"

import logo from "@/public/images/brandLogo.svg"
import { Button } from "@/src/shared/components/ui/button"
import { Card, CardContent, CardHeader } from '@/src/shared/components/ui/Card'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Input } from "@/src/shared/components/ui/Input"
import { OtpResendTimer } from "@/src/shared/components/ui/OtpResendTimer"
import { PUBLIC_ROUTES } from "@/src/shared/constants"
import { useRegistration } from "@/src/shared/context/RegistrationProvider"
import Image from 'next/image'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link"
import { otpValidation } from "@/src/shared/schema/authSchema"
import { useResendTimer } from "@/src/shared/hooks/useResendTimer"
import { useState } from "react"
import loginImage from "@/public/images/login.jpg"
import { useRouter } from "next/navigation"

const OTP_RESEND_SECONDS = 180

const OtpPage = () => {
    const { phoneNumber } = useRegistration()
    const { back } = useRouter()
    const { remaining } = useResendTimer(OTP_RESEND_SECONDS)
    const { register, formState: { errors } } = useForm<z.infer<typeof otpValidation>>({
        resolver: zodResolver(otpValidation),
        defaultValues: {
            otp: ""
        },
        mode: "onChange"
    })
    const otpFields = register("otp")
    const [otpValue, setOtpValue] = useState("")

    const otpHandler = () => {
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
                    <p className="text-xl font-bold text-on-surface">کد تایید خود را وارد کنید</p>
                    <div className="flex flex-col justify-start pt-5 pb-4 [&>span]:text-on-surface-variant! font-light">
                        <span>کد تاییده برای شماره ی ارسال شد {phoneNumber}</span>
                    </div>
                    <Input
                        error={!!errors["otp"]}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern="[0-9]*"
                        {...otpFields}
                        value={otpValue}
                        onChange={(value) => {
                            const sanitized = value.replace(/\D/g, "").slice(0, 6)
                            setOtpValue(sanitized)
                            void otpFields.onChange({
                                target: { name: otpFields.name, value: sanitized },
                                type: "change",
                            })
                        }}
                        className="rounded-2xl!"
                        wrapperClassName="mb-11 rounded-2xl!" />
                    <OtpResendTimer remaining={remaining} />
                    <Button className="w-full" variant="primary" onClick={otpHandler}>تایید</Button>
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

export default OtpPage