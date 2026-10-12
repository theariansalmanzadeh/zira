import { TableCell, TableRow } from '@/src/shared/components/ui/Table'
import { Pill } from '@/src/shared/components/ui/Pill'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import IconButton from '@/src/shared/components/ui/IconButton'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/src/shared/components/ui/Avatar'
import type { BranchEmployeeItem } from '../provider/CreateBranchProvider'

const ROLE_OPTIONS = [
    { label: 'مدیر شعبه', value: 'manager' },
    { label: 'فروشنده', value: 'salesperson' },
    { label: 'حسابدار', value: 'accountant' },
    { label: 'انباردار', value: 'warehouseman' },
]

const WORK_HOURS_OPTIONS = [
    { label: 'تمام وقت', value: 'full_time' },
    { label: 'پاره وقت', value: 'part_time' },
    { label: 'شیفتی', value: 'shift' },
]

type EployeeTableRowProps = {
    employee: BranchEmployeeItem
    onRemove: () => void
    onRoleChange?: (role: string) => void
    onWorkHoursChange?: (workHours: string) => void
}

const EployeeTableRow = ({
    employee,
    onRemove,
    onRoleChange,
    onWorkHoursChange,
}: EployeeTableRowProps) => {
    return (
        <TableRow>
            <TableCell className="w-[1%] bg-transparent!">
                <IconButton
                    icon="closeLg400Linear"
                    className="size-6 bg-transparent! text-on-surface-variant cursor-pointer"
                    onClick={onRemove}
                />
            </TableCell>
            <TableCell className="text-label-sm">
                <div className="flex flex-row-reverse justify-end gap-2 items-center">
                    <span className="text-label-sm text-on-surface-variant">
                        {employee.name}
                    </span>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>
                            {employee.name.slice(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </TableCell>
            <TableCell>
                <FormDropdown
                    placeholder="انتخاب سمت"
                    options={ROLE_OPTIONS}
                    value={employee.role}
                    onChange={(val) => onRoleChange?.(val)}
                />
            </TableCell>
            <TableCell>
                <FormDropdown
                    placeholder="انتخاب ساعت کاری"
                    options={WORK_HOURS_OPTIONS}
                    value={employee.workHours}
                    onChange={(val) => onWorkHoursChange?.(val)}
                />
            </TableCell>
            <TableCell>
                <Pill
                    text={employee.status || 'فعال'}
                    variant={employee.status === 'غیرفعال' ? 'error' : 'success'}
                    className="border-0"
                />
            </TableCell>
        </TableRow>
    )
}

export default EployeeTableRow
