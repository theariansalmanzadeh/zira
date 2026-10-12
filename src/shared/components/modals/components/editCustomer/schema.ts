import { z } from 'zod'

export const editCustomerSchema = z.object({
    firstName: z.string().trim().min(1, 'نام الزامی است'),
    lastName: z.string().trim().min(1, 'نام خانوادگی الزامی است'),
    gender: z.string(),
    username: z.string(),
    nationalId: z.string(),
    licenseNumber: z.string(),
    mobile1: z.string(),
    mobile2: z.string(),
    landline: z.string(),
    referrerName: z.string(),
    address: z.string(),
})

export type EditCustomerFormValues = z.infer<typeof editCustomerSchema>
