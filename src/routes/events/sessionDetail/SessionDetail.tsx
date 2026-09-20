'use client'

import { useParams } from 'next/navigation'
import { getSessionDetailById } from '../constants'
import Header from './components/Header'
import Info from './components/Info'
import Activity from './components/Activity'

const SessionDetail = () => {
    const params = useParams<{ id: string }>()
    const detail = getSessionDetailById(params.id)

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
