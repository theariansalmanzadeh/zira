'use client'

import type { ActiveSession } from '@/src/api/types/admin/securityAndEvents'
import { formatFaDateTime } from '@/src/shared/libs/formatter'
import type { SessionDetailData } from '../constants'
import Activity from './components/Activity'
import Header from './components/Header'
import Info from './components/Info'

const mapStatus = (status: string) => {
    const normalized = status.toLowerCase()
    if (
        normalized === 'active' ||
        normalized === 'alive' ||
        normalized === 'فعال'
    ) {
        return 'فعال'
    }
    if (normalized === 'expired' || normalized === 'منقضی') return 'منقضی'
    if (
        normalized === 'terminated' ||
        normalized === 'inactive' ||
        normalized === 'غیرفعال'
    ) {
        return 'غیرفعال'
    }
    return status || '—'
}

const toSessionDetail = (session: ActiveSession): SessionDetailData => {
    const status = mapStatus(session.status)
    const deviceBrowser = [session.device_type, session.browser]
        .filter(Boolean)
        .join(' ، ')
    const ip = [session.ip_address, session.approx_location]
        .filter(Boolean)
        .join(' / ')
    const startedAt = formatFaDateTime(session.started_at)
    const lastActivityAt = formatFaDateTime(session.last_activity_at)

    return {
        id: session.id,
        sessionId: session.id,
        status,
        deviceBrowser: deviceBrowser || '—',
        ip: ip || '—',
        startedAt,
        lastActivityAt,
        user: {
            name: session.user_mobile || '—',
            role: '—',
            userCode: session.user_id,
        },
        info: [
            { label: 'شناسه نشست', value: session.id },
            { label: 'وضعیت', value: status },
            { label: 'دستگاه / مرورگر', value: deviceBrowser || '—' },
            { label: 'IP / مکان', value: ip || '—' },
            { label: 'شروع نشست', value: startedAt },
            { label: 'آخرین فعالیت', value: lastActivityAt },
        ],
        activities: [],
    }
}

type SessionDetailProps = {
    session: ActiveSession
}

const SessionDetail = ({ session }: SessionDetailProps) => {
    const detail = toSessionDetail(session)

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <Header session={detail} />

            <div className='grid grid-cols-12 gap-3'>
                <div className='col-span-5'>
                    <Info
                        fields={detail.info}
                        user={detail.user}
                        status={detail.status}
                    />
                </div>
                <div className='col-span-7'>
                    <Activity activities={detail.activities} />
                </div>
            </div>
        </div>
    )
}

export default SessionDetail
