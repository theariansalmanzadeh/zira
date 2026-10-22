import { z } from 'zod'
import type { Role } from '@/src/api/types/admin/role'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const ROLE_LEVEL_OPTIONS = [
    { label: 'سطح 0', value: '0' },
    { label: 'سطح 1', value: '1' },
    { label: 'سطح 2', value: '2' },
    { label: 'سطح 3', value: '3' },
] as const

const roleLevelValues = ROLE_LEVEL_OPTIONS.map((option) => option.value) as [
    (typeof ROLE_LEVEL_OPTIONS)[number]['value'],
    ...(typeof ROLE_LEVEL_OPTIONS)[number]['value'][],
]

export const addAndUpdateRoleSchema = z.object({
    code: requiredString('کد نقش الزامی است'),
    name: requiredString('نام نقش الزامی است'),
    description: z.string(),
    level: z.enum(roleLevelValues, { message: 'سطح الزامی است' }),
    department: z.string(),
})

export type AddAndUpdateRoleFormValues = z.infer<typeof addAndUpdateRoleSchema>

export const ADD_AND_UPDATE_ROLE_DEFAULTS: AddAndUpdateRoleFormValues = {
    code: '',
    name: '',
    description: '',
    level: '0',
    department: '',
}

export const mapRoleToFormValues = (
    role: Role
): AddAndUpdateRoleFormValues => {
    const levelValue = String(role.level)
    const level = roleLevelValues.includes(
        levelValue as AddAndUpdateRoleFormValues['level']
    )
        ? (levelValue as AddAndUpdateRoleFormValues['level'])
        : '0'

    return {
        code: role.code,
        name: role.name,
        description: role.description ?? '',
        level,
        department: role.department ?? '',
    }
}
