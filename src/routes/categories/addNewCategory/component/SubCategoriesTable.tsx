'use client'

import { Fragment } from 'react'
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
import { cn } from '@/src/shared/libs/utils'

export type SubCategoryRow = {
    id: string
    name: string
    level: string
    status: 'active' | 'inactive'
}

const TABLE_HEADERS = ['', 'اسم', 'سطح', 'وضعیت', 'شناسه'] as const

type SubCategoriesTableProps = {
    data: SubCategoryRow[]
    onRemove: (id: string) => void
    className?: string
}

const SubCategoriesTable = ({
    data,
    onRemove,
    className,
}: SubCategoriesTableProps) => {
    if (data.length === 0) return null

    return (
        <div className={cn('col-span-2 flex flex-col gap-3', className)}>
            <span className='text-label-lg font-bold text-outline'>
                زیر دسته‌ها
            </span>
            <div className='flex w-full flex-col justify-center rounded-card-md bg-surface-container-lowest p-6'>
                <div className='flex flex-col gap-3 rounded-card-lg bg-surface-container-high p-2'>
                    <Table>
                        <TableHeader className='rounded-xl'>
                            <TableRow className='[&>*]:text-label-sm [&>*]:font-normal [&>*]:text-outline'>
                                {TABLE_HEADERS.map((header, index) => (
                                    <TableHead
                                        key={`${header}-${index}`}
                                        className='bg-transparent!'
                                    >
                                        {header}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item) => (
                                <Fragment key={item.id}>
                                    <TableRow>
                                        <TableCell className='w-[1%] bg-transparent!'>
                                            <button
                                                type='button'
                                                className='size-6 bg-transparent!'
                                                onClick={() => onRemove(item.id)}
                                            >
                                                <Icon
                                                    label='closeLg400Linear'
                                                    className='size-6 text-on-surface-variant'
                                                />
                                            </button>
                                        </TableCell>
                                        <TableCell className='text-label-sm text-on-surface-variant'>
                                            {item.name}
                                        </TableCell>
                                        <TableCell className='text-label-sm text-on-surface-variant'>
                                            {item.level}
                                        </TableCell>
                                        <TableCell>
                                            <Pill
                                                text={
                                                    item.status === 'active'
                                                        ? 'فعال'
                                                        : 'غیرفعال'
                                                }
                                                variant={
                                                    item.status === 'active'
                                                        ? 'success'
                                                        : 'error'
                                                }
                                                className='border-0'
                                            />
                                        </TableCell>
                                        <TableCell className='text-label-sm text-outline'>
                                            {item.id}
                                        </TableCell>
                                    </TableRow>
                                    <div className='h-px w-full bg-outline' />
                                </Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default SubCategoriesTable
