import { Icon } from '@/src/shared/components/Icons/Icon'
import { Pill } from '@/src/shared/components/ui/Pill'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import { formatFaDate } from '@/src/shared/libs/formatter'

const HEADERS = [
    'نقش',
    'دپارتمان',
    'تاریخ انتساب',
    'تاریخ انقضا',
    'وضعیت',
] as const

const ROLE_ROW = {
    title: 'مدیر سیستم',
    slug: 'system_admin',
    department: 'مدیریت',
    assignedAt: '2019-05-05T00:00:00.000Z',
}

const Role = () => {
    return (
        <div
            className='flex flex-col gap-5 rounded-card-lg bg-surface-container-lowest px-6 py-5'
            dir='rtl'
        >
            <div className='flex flex-col gap-2'>
                <div className='flex flex-row items-center gap-2'>
                    <span className='h-5 w-1 rounded-full bg-error' />
                    <span className='text-title-md font-bold text-on-surface'>
                        نقش سیستمی کاربر
                    </span>
                </div>
                <p className='text-body-md text-outline'>
                    هر کاربر فقط یک نقش دارد؛ نقش سراسری است و در همه شعب در دسترس کاربر معتبر است.
                </p>
            </div>

            <div className='flex flex-row items-center justify-center gap-2 rounded-card-md border border-warning/30 bg-warning-container px-4 py-3'>
                <Icon
                    label='info400Linear'
                    className='size-5! shrink-0 text-on-warning-container'
                />
                <p className='text-center text-label-md text-on-warning-container'>
                    شما مجاز به انتساب یا تغییر نقش برای حساب کاربری خود نیستید.
                </p>
            </div>

            <div className='overflow-x-auto rounded-card-md border border-outline-variant'>
                <Table>
                    <TableHeader>
                        <TableRow className='bg-surface-container-high hover:bg-surface-container-high'>
                            {HEADERS.map((header) => (
                                <TableHead
                                    key={header}
                                    className='text-label-md font-medium text-outline'
                                >
                                    {header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className='[&>*]:text-label-lg [&>*]:text-on-surface-variant'>
                            <TableCell>
                                <div className='flex flex-col gap-0.5'>
                                    <span className='font-semibold text-on-surface'>
                                        {ROLE_ROW.title}
                                    </span>
                                    <span className='text-label-sm text-info' dir='ltr'>
                                        {ROLE_ROW.slug}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>{ROLE_ROW.department}</TableCell>
                            <TableCell>
                                {formatFaDate(ROLE_ROW.assignedAt, { timeZone: 'UTC' })}
                            </TableCell>
                            <TableCell>
                                <Pill text='نامحدود (دائمی)' variant='success' />
                            </TableCell>
                            <TableCell>
                                <Pill text='فعال' variant='success' />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Role
