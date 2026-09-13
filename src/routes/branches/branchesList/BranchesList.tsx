"use client"

import InfoCard from '@/src/shared/components/infoCard/InfoCard'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import React from 'react'

const BranchesList = () => {
    return (
        <div className='flex flex-col gap-3'>
            <TableListLayout value='branches' toggleButtonValue={ROUTE_CONFIGS.branches.TOGGLE_BUTTON_VALUE} hasHeaderActions={true} isCardLayout={true}>
                <InfoCard title='شعبه 1' subtitle='شناسه 1' manager={{ label: 'مسئول', value: 'محمد حسین محمدی' }} email={{ label: 'ایمیل', value: 'mohammad@gmail.com' }} phone={{ label: 'شماره تماس', value: '+98 912 2571 928' }} address={{ label: 'آدرس', value: 'تهران، خیابان ولیعصر' }} status='active' href={`/admin/branches/details/${1}`} />
                <InfoCard title='شعبه 1' subtitle='شناسه 1' manager={{ label: 'مسئول', value: 'محمد حسین محمدی' }} email={{ label: 'ایمیل', value: 'mohammad@gmail.com' }} phone={{ label: 'شماره تماس', value: '+98 912 2571 928' }} address={{ label: 'آدرس', value: 'تهران، خیابان ولیعصر' }} status='active' href={`/admin/branches/details/${2}`} />
                <InfoCard title='شعبه 1' subtitle='شناسه 1' manager={{ label: 'مسئول', value: 'محمد حسین محمدی' }} email={{ label: 'ایمیل', value: 'mohammad@gmail.com' }} phone={{ label: 'شماره تماس', value: '+98 912 2571 928' }} address={{ label: 'آدرس', value: 'تهران، خیابان ولیعصر' }} status='active' href={`/admin/branches/details/${3}`} />
            </TableListLayout>
        </div>
    )
}

export default BranchesList