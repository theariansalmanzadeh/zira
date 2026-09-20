'use client'

import { useParams } from 'next/navigation'
import { getEventDetailById } from '../constants'
import Info from './components/Info'
import Changes from './components/Changes'
import User from './components/User'
import Session from './components/Session'

const EventDetails = () => {
    const params = useParams<{ id: string }>()
    const detail = getEventDetailById(params.id)

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
