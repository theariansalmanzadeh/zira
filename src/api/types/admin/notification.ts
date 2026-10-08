export type Notification = {
    id: string
    title: string
    body: string
    topic: string
    priority: string
    recipient_mode: string
    target_type?: string | null
    target_id?: string | null
    sent_at?: string | null
    created_at: string
}

export type ListNotificationsResponse = Notification[]

export type GetNotificationResponse = Notification

export type SendNotificationRequest = {
    title?: string
    body: string
    topic?: string
    priority?: string
    recipient_mode?: string
    target_type?: string | null
    target_id?: string | null
    recipient_ids: string[]
}

export type SendNotificationResponse = Notification
