"use client"

import logo from "@/public/images/brandLogo.svg"
import loginImage from "@/public/images/login.jpg"
import { useVerifyCustomerOtp } from "@/src/api/hooks/auth"
import type { ApiError } from "@/src/api/http"
import { Button } from "@/src/shared/components/ui/button"
import { Card, CardContent, CardHeader } from '@/src/shared/components/ui/Card'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Input } from "@/src/shared/components/ui/Input"
import { OtpResendTimer } from "@/src/shared/components/ui/OtpResendTimer"
import { PUBLIC_ROUTES } from "@/src/shared/constants"
import { useRegistration } from "@/src/shared/context/RegistrationProvider"
import { useResendTimer } from "@/src/shared/hooks/useResendTimer"
import { onlyNumber } from "@/src/shared/schema/generalSchema"
import { useAuthStore } from "@/src/shared/store/auth-store"
import { useLastPageStore } from "@/src/shared/store/last-page-store"
import Image from 'next/image'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const OTP_RESEND_SECONDS = 180
const OTP_REGEX = /^\d{6}$/

const OtpPage = () => {
    const { phoneNumber, otp, setOtp } = useRegistration()
    const { back, push } = useRouter()
    const { remaining } = useResendTimer(OTP_RESEND_SECONDS)
    const lastPage = useLastPageStore((state) => state.lastPage)
    const setAccessToken = useAuthStore((state) => state.setAccessToken)
    const { mutate: verifyOtp, isPending } = useVerifyCustomerOtp()

    const otpHandler = () => {
        if (!OTP_REGEX.test(otp) || !phoneNumber) return

        verifyOtp(
            { phone_number: phoneNumber, code: otp },
            {
                onSuccess: (data) => {
                    setAccessToken(data.access_token)
                    push(lastPage || PUBLIC_ROUTES.landing)
                },
                onError: (error) => {
                    toast.error((error as ApiError).message)
                }
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
                    <p className="text-xl font-bold text-on-surface">کد تایید خود را وارد کنید</p>
                    <div className="flex flex-col justify-start pt-5 pb-4 [&>span]:text-on-surface-variant! font-light">
                        <span>کد تاییده برای شماره ی ارسال شد {phoneNumber}</span>
                    </div>
                    <Input
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern="[0-9]*"
                        value={otp}
                        onChange={(value) => {
                            setOtp(onlyNumber(value).slice(0, 6))
                        }}
                        className="rounded-2xl!"
                        wrapperClassName="mb-11 rounded-2xl!"
                    />
                    <OtpResendTimer remaining={remaining} />
                    <Button
                        className="w-full"
                        variant="primary"
                        onClick={otpHandler}
                        disabled={isPending}
                    >
                        تایید
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

export default OtpPage
