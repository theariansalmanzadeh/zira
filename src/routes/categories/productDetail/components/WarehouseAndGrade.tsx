'use client'

import { Fragment, useState } from 'react'
import { Badge } from '@/src/shared/components/ui/Badge'
import { Button } from '@/src/shared/components/ui/button'
import IconButton from '@/src/shared/components/ui/IconButton'
import SectionTitle from '@/src/shared/components/ui/SectionTitle'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { ModalTypes } from '@/src/shared/components/modals/types'
import type { ChangeWarehouseGradePayload } from '@/src/shared/components/modals/components/ChangeWarehouseGrade'
import { useModalStore } from '@/src/shared/store/modal-store'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import type { WarehouseGradeItem, WarehouseGradeLevel } from '../types'

type WarehouseAndGradeProps = {
    items?: WarehouseGradeItem[]
    className?: string
}

const TABLE_HEADERS = [
    'نام انبار',
    'آدرس در انبار',
    'موجودی',
    'گرید',
    '',
] as const

const GRADE_BADGE_CLASS: Record<WarehouseGradeLevel, string> = {
    1: 'border-0 bg-success-container text-on-success-container',
    2: 'border-0 bg-warning-container text-on-warning-container',
    3: 'border-0 bg-surface-container-high text-on-surface-variant',
}

export const WAREHOUSE_GRADE_DUMMY: WarehouseGradeItem[] = [
    {
        id: '1',
        warehouseName: 'انبار مرکزی تهران',
        address: 'راهرو B • قفسه ۱۲ • طبقه ۳',
        stock: 86,
        discountPercent: 10,
        grade: 1,
        description:
            'انبار اصلی توزیع کالاهای پوشاک زنانه با ظرفیت نگهداری بالا و دسترسی سریع به فروشگاه‌های تهران.',
    },
    {
        id: '2',
        warehouseName: 'انبار کرج',
        address: 'راهرو A • قفسه ۴ • طبقه ۱',
        stock: 48,
        discountPercent: null,
        grade: 2,
        description:
            'انبار پشتیبانی غرب تهران برای تامین موجودی فروشگاه‌های البرز و کرج.',
    },
    {
        id: '3',
        warehouseName: 'انبار فروشگاه',
        address: 'ویترین • کشو ۲',
        stock: 42,
        discountPercent: 25,
        grade: 3,
        description:
            'موجودی ویترینی فروشگاه برای نمایش و فروش سریع محصولات پرفروش.',
    },
]

const WarehouseAndGrade = ({
    items = WAREHOUSE_GRADE_DUMMY,
    className,
}: WarehouseAndGradeProps) => {
    const { openModal } = useModalStore()
    const [rows, setRows] = useState(items)
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const toggleExpanded = (id: string) => {
        setExpandedId((prev) => (prev === id ? null : id))
    }

    const openEditModal = (item: WarehouseGradeItem) => {
        openModal(ModalTypes.CHANGE_WAREHOUSE_GRADE, {
            currentGrade: item.grade,
            quantity: 0,
            description: item.description,
            discountPercent: item.discountPercent,
            onConfirm: (payload: ChangeWarehouseGradePayload) => {
                setRows((prev) =>
                    prev.map((row) =>
                        row.id === item.id
                            ? {
                                  ...row,
                                  grade: payload.grade,
                                  description: payload.description,
                                  discountPercent: payload.discountPercent,
                              }
                            : row
                    )
                )
            },
        })
    }

    return (
        <div
            className={cn(
                'rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5',
                className
            )}
            dir='rtl'
        >
            <SectionTitle>انبارها و آدرس نگه‌داری</SectionTitle>

            <div className='overflow-hidden rounded-card-md bg-surface-container-high p-2'>
                <Table>
                    <TableHeader className='rounded-xl'>
                        <TableRow className='[&>*]:text-label-sm [&>*]:font-normal [&>*]:text-outline'>
                            {TABLE_HEADERS.map((header, index) => (
                                <TableHead
                                    key={header || `actions-${index}`}
                                    className={cn(
                                        'bg-transparent! whitespace-nowrap',
                                        header === '' && 'w-[1%]'
                                    )}
                                >
                                    {header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((item) => {
                            const isExpanded = expandedId === item.id

                            return (
                                <Fragment key={item.id}>
                                    <TableRow className='[&>*]:text-label-lg [&>*]:text-on-surface-variant'>
                                        <TableCell>
                                            <span className='font-semibold text-on-surface'>
                                                {item.warehouseName}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='text-outline'>
                                                {item.address}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='text-on-surface'>
                                                {formatFaNumber(item.stock)}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant='default'
                                                className={
                                                    GRADE_BADGE_CLASS[item.grade]
                                                }
                                            >
                                                گرید {formatFaNumber(item.grade)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className='w-[1%] whitespace-nowrap'>
                                            <IconButton
                                                icon='chevronLeft300Broken'
                                                variant='ghost'
                                                className='size-8!'
                                                iconClassName={cn(
                                                    'size-5! text-outline transition-transform',
                                                    isExpanded && '-rotate-90'
                                                )}
                                                onClick={() =>
                                                    toggleExpanded(item.id)
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>

                                    {isExpanded && (
                                        <div className='hover:bg-transparent! w-full'>
                                            <div className='whitespace-normal rounded-t-none! bg-surface-container-lowest py-3'>
                                                <div className='flex flex-col gap-3 rounded-card-md p-4'>
                                                    <div className='flex flex-row items-start justify-between gap-3'>
                                                        <div className='flex min-w-0 flex-col gap-1.5'>
                                                            <span className='text-label-md font-semibold text-on-surface'>
                                                                توضیحات
                                                            </span>
                                                            <p className='text-body-md leading-7 text-on-surface-variant'>
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                        <Button
                                                            type='button'
                                                            variant='outline'
                                                            className='shrink-0 gap-1.5'
                                                            onClick={() =>
                                                                openEditModal(item)
                                                            }
                                                        >
                                                            <Icon
                                                                label='edit400Linear'
                                                                className='size-5!'
                                                            />
                                                            ویرایش
                                                        </Button>
                                                    </div>
                                                    <div className='flex items-center justify-between gap-3 border-0 border-t border-outline-variant pt-3'>
                                                        <span className='text-label-md text-outline'>
                                                            تخفیف
                                                        </span>
                                                        <span className='text-label-lg font-semibold text-primary'>
                                                            {item.discountPercent ==
                                                            null
                                                                ? '—'
                                                                : `${formatFaNumber(item.discountPercent)}٪`}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className='h-[2px]' />
                                </Fragment>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default WarehouseAndGrade
