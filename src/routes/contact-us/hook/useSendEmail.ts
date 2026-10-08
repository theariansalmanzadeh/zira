'use client'

import { useMutation } from '@tanstack/react-query'
import { http } from '@/src/shared/lib/http'

export type SendEmailBody = {
    name: string
    phone: string
    title: string
    message: string
}

const sendEmail = async (body: SendEmailBody) => {
    const { data } = await http.post('/api/contact/email', body)
    return data
}

export const useSendEmail = () => {
    return useMutation({
        mutationFn: sendEmail,
    })
}
