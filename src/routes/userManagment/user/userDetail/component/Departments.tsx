'use client'

import type { UserDepartment } from '@/src/api/types/admin/user'
import { Pill } from '@/src/shared/components/ui/Pill'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader as UiHeader,
    TableRow,
    TableRow as UiTableRow,
} from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { cn } from '@/src/shared/libs/utils'
import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'id', header_label: 'شناسه', isChecked: true },
    { id: 'code', header_label: 'کد', isChecked: true },
    { id: 'name', header_label: 'نام', isChecked: true },
    { id: 'is_active', header_label: 'وضعیت', isChecked: true },
]

const DepartmentTableHeader = () => {
    const { visibleTableColoumn } = useTable()

    return (
        <UiHeader className='rounded-xl'>
            <TableRow className='[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-outline'>
                {visibleTableColoumn.map((column) => (
                    <TableHead key={column.id} className={cn(column.className)}>
                        {column.header_label}
                    </TableHead>
                ))}
            </TableRow>
        </UiHeader>
    )
}

const DepartmentRow = ({ department }: { department: UserDepartment }) => {
    const { TableColoumn } = useTable()

    return (
        <>
            <UiTableRow className='[&>*]:text-on-surface-variant!'>
                {TableColoumn[0]?.isChecked && (
                    <TableCell>
                        <span dir='ltr'>{department.id}</span>
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && <TableCell>{department.code}</TableCell>}
                {TableColoumn[2]?.isChecked && <TableCell>{department.name}</TableCell>}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>
                        <Pill
                            text={department.is_active ? 'فعال' : 'غیرفعال'}
                            variant={department.is_active ? 'success' : 'tonal'}
                            className='border-0'
                        />
                    </TableCell>
                )}
            </UiTableRow>
            <div className='py-1' />
        </>
    )
}

const Departments = ({ departments }: { departments: UserDepartment[] }) => {
    return (
        <TableListLayout TableColoumn={TABLE_COLOUMN} hasHeaderActions={false}>
            <div className='rounded-card-lg bg-surface-container-high p-2'>
                {departments.length === 0 ? (
                    <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                        دپارتمانی یافت نشد.
                    </div>
                ) : (
                    <Table className='border-collapse border-spacing-y-4'>
                        <DepartmentTableHeader />
                        <TableBody>
                            {departments.map((department) => (
                                <DepartmentRow
                                    key={department.id}
                                    department={department}
                                />
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </TableListLayout>
    )
}

export default Departments
