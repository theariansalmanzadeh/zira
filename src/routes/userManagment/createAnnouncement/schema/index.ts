import { z } from 'zod'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const announcementPrioritySchema = z.enum([
    'low',
    'normal',
    'high',
    'urgent',
])
export type AnnouncementFormPriority = z.infer<typeof announcementPrioritySchema>

export const selectedUserSchema = z.object({
    id: z.string(),
    name: z.string(),
    personnelCode: z.string(),
    role: z.string(),
    branch: z.string(),
    status: z.enum(['active', 'inactive']),
    roleId: z.string().optional(),
    branchId: z.string().optional(),
    phone: z.string().optional(),
})

export const createAnnouncementSchema = z.object({
    title: z.string(),
    body: requiredString('متن پیام الزامی است'),
    subject: requiredString('موضوع الزامی است'),
    priority: announcementPrioritySchema,
    selectedUsers: z
        .array(selectedUserSchema)
        .min(1, 'حداقل یک کاربر انتخاب کنید'),
})

export type CreateAnnouncementValues = z.infer<typeof createAnnouncementSchema>

export const CREATE_ANNOUNCEMENT_DEFAULTS: CreateAnnouncementValues = {
    title: '',
    body: '',
    subject: 'system',
    priority: 'normal',
    selectedUsers: [],
}
