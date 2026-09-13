import { TableCell, TableRow } from '@/src/shared/components/ui/Table'
import { Pill } from '@/src/shared/components/ui/Pill'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/src/shared/components/ui/Avatar'

const EployeeTableRow = () => {
    return (
        <TableRow>
            <TableCell className="w-[1%] bg-transparent!">
                <IconButton
                    icon="closeLg400Linear"
                    className="size-6 bg-transparent! text-on-surface-variant"
                />
            </TableCell>
            <TableCell className="text-label-sm">
                <div className='flex flex-row-reverse justify-end gap-2 items-center'>
                    <span className='text-label-sm text-on-surface-variant'>علی محمدی</span>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </TableCell>
            <TableCell>
                <FormDropdown
                    placeholder="انتخاب"
                    options={[]}
                    onChange={() => { }}
                />
            </TableCell>
            <TableCell>
                <FormDropdown
                    placeholder="انتخاب"
                    options={[]}
                    onChange={() => { }}
                />
            </TableCell>
            <TableCell>
                <Pill text="فعال" variant="success" className='border-0' />
            </TableCell>
        </TableRow>
    )
}

export default EployeeTableRow
