import { z } from 'zod'

export const staffLoginSchema = z.object({
    username: z.string().trim().min(1, 'نام کاربری الزامی است'),
    password: z.string().min(1, 'رمز عبور الزامی است'),
})

export type StaffLoginFormValues = z.infer<typeof staffLoginSchema>

export const STAFF_LOGIN_DEFAULTS: StaffLoginFormValues = {
    username: '',
    password: '',
}
