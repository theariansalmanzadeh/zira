'use client'

import Header from './components/Header'
import Summary from './components/Summary'
import RecipientsTable from './components/RecipientsTable'
import { getAnnouncementDetailById } from './constants'

type AnnouncementDetailProps = {
    id: string
}

const AnnouncementDetail = ({ id }: AnnouncementDetailProps) => {
    const data = getAnnouncementDetailById(id)

    return (
        <div className='flex flex-col gap-6' dir='rtl'>
            <div className='flex flex-col gap-6 rounded-card-md bg-surface-container-lowest p-6'>
                <Header data={data} />
                <Summary data={data} />
            </div>
            <RecipientsTable />
        </div>
    )
}

export default AnnouncementDetail
