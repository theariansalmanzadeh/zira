import * as z from 'zod'

const requiredString = (message: string) => z.string().trim().min(1, message)

const selectedItemStatus = z.enum(['active', 'inactive'])

export const selectedUserSchema = z.object({
    id: z.string(),
    userName: z.string(),
    userId: z.string(),
    roles: z.string(),
    permissions: z.string(),
    status: selectedItemStatus,
})

export const GROUP_ROLE_OPTIONS = [
    { label: 'مدیر', value: 'manager' },
    { label: 'کارشناس', value: 'expert' },
    { label: 'اپراتور', value: 'operator' },
]

export const GROUP_MANAGER_OPTIONS = [
    { label: 'نام کاربر ۱', value: 'user-1' },
    { label: 'نام کاربر ۲', value: 'user-2' },
    { label: 'نام کاربر ۳', value: 'user-3' },
]

export const createNewGroupSchema = z.object({
    name: requiredString('نام گروه الزامی است'),
    groupId: z.string(),
    groupRole: requiredString('نقش گروه الزامی است'),
    groupManager: requiredString('مدیر گروه الزامی است'),
    description: z.string(),
    users: z.array(selectedUserSchema),
})

export type CreateNewGroupValues = z.infer<typeof createNewGroupSchema>

export const CREATE_NEW_GROUP_DEFAULTS: CreateNewGroupValues = {
    name: '',
    groupId: 'GR-5318_92',
    groupRole: '',
    groupManager: '',
    description: '',
    users: [],
}
