import { z } from 'zod'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const ROLE_LEVEL_OPTIONS = [
    { label: 'کاربر', value: '0' },
    { label: 'کارشناس', value: '1' },
    { label: 'سرپرست', value: '2' },
    { label: 'مدیر', value: '3' },
] as const

const roleLevelValues = ROLE_LEVEL_OPTIONS.map((option) => option.value) as [
    (typeof ROLE_LEVEL_OPTIONS)[number]['value'],
    ...(typeof ROLE_LEVEL_OPTIONS)[number]['value'][],
]

export const createRoleSchema = z.object({
    code: requiredString('کد نقش الزامی است'),
    name: requiredString('نام نقش الزامی است'),
    description: z.string(),
    level: z.enum(roleLevelValues, { message: 'سطح الزامی است' }),
    department: z.string(),
})

export type CreateRoleFormValues = z.infer<typeof createRoleSchema>

export const CREATE_ROLE_DEFAULTS: CreateRoleFormValues = {
    code: '',
    name: '',
    description: '',
    level: '0',
    department: '',
}
