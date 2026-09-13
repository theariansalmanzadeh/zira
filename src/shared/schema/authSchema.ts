import * as z from "zod"

export const loginValidation = z.object({
    phoneNumber: z.string().regex(/^[0-9]+$/)
})

export const otpValidation = z.object({
    otp: z.string().regex(/^\d{0,6}$/)
})