'use client'

import { useParams } from 'next/navigation'
import type { ActivityLogDetail } from '@/src/api/types/admin/securityAndEvents'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import { formatFaDate, formatFaTime } from '@/src/shared/libs/formatter'
import { useGetActivityLog } from '../hooks/activity'
import type { EventDetailData } from '../constants'
import Info from './components/Info'
import Changes from './components/Changes'
import User from './components/User'
import Session from './components/Session'

const ACTOR_KIND_LABEL = {
    USER: 'کاربر',
    SYSTEM: 'سیستم',
    ANONYMOUS: 'ناشناس',
} as const

const RESULT_LABEL = {
    SUCCESS: 'موفق',
    FAILURE: 'ناموفق',
    DENIED: 'رد شده',
} as const

const display = (value?: string | null) => {
    const text = value?.trim()
    return text || '—'
}

const sessionIdFromPayload = (payload: Record<string, unknown>) => {
    const value = payload.session_id ?? payload.sessionId
    return typeof value === 'string' ? value : ''
}

const toEventDetail = (log: ActivityLogDetail): EventDetailData => {
    const actorLabel = ACTOR_KIND_LABEL[log.actor_kind] ?? log.actor_kind
    const sessionId = sessionIdFromPayload(log.payload ?? {})

    return {
        id: log.id,
        info: [
            { label: 'ماژول', value: display(log.domain_code) },
            { label: 'نوع فعالیت', value: display(log.event_title) },
            { label: 'تاریخ', value: formatFaDate(log.occurred_at) },
            { label: 'زمان', value: formatFaTime(log.occurred_at) },
            { label: 'نتیجه', value: RESULT_LABEL[log.result] ?? log.result },
            { label: 'موجودیت مرتبط', value: display(log.object_label) },
        ],
        changes: (log.changes ?? []).map((change) => ({
            field: change.field_label || change.field_path,
            previousValue: display(change.old_value),
            newValue: display(change.new_value),
        })),
        user: {
            name: display(log.actor_user_id) === '—' ? actorLabel : log.actor_user_id!,
            role: actorLabel,
            userCode: display(log.actor_user_id),
            avatarClassName: 'bg-info-container text-info',
        },
        session: {
            sessionId: sessionId || display(log.request_id),
            subtitle: [log.ip_address, log.user_agent].filter(Boolean).join(' — ') || '—',
            status: RESULT_LABEL[log.result] ?? log.result,
            href: sessionId ? `/admin/events/session/${sessionId}` : undefined,
        },
    }
}

const EventDetails = () => {
    const params = useParams<{ id: string }>()
    const logId = params.id ?? ''
    const { data, isPending, isError } = useGetActivityLog(logId)

    if (isPending) {
        return <TableLoadingSkeleton isPending rows={4} />
    }

    if (isError || !data) {
        return (
            <div
                className='rounded-card-md bg-surface-container-lowest p-6 text-center text-label-md text-error'
                dir='rtl'
            >
                خطا در دریافت جزئیات رخداد
            </div>
        )
    }

    const detail = toEventDetail(data)

    return (
        <div className='grid grid-cols-12 gap-3' dir='rtl'>
            <div className='col-span-8 flex flex-col gap-3'>
                <Info fields={detail.info} />
                <Changes changes={detail.changes} />
            </div>
            <div className='col-span-4 flex flex-col gap-3'>
                <User user={detail.user} />
                <Session session={detail.session} />
            </div>
        </div>
    )
}

export default EventDetails
