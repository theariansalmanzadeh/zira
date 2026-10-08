import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableHeader from '../userManagment/components/TableHeader'
import TableRow, { GroupUserRowProps } from '../userManagment/components/TableRow'
import TableProvider from '@/src/shared/context/TableProvider'
import { TABLE_COLOUMN } from '../userManagment/constants'

export const GROUP_USERS_DUMMY: GroupUserRowProps[] = [
    {
        data: {
            userName: 'نام کاربر',
            userCode: 'PR0239',
            roles: '-',
            permissions: '-',
            status: 'active',
        },
    },
    {
        data: {
            userName: 'علی محمدی',
            userCode: 'PR0240',
            roles: '-',
            permissions: '-',
            status: 'active',
        },
    },
    {
        data: {
            userName: 'سارا احمدی',
            userCode: 'PR0241',
            roles: 'مدیر',
            permissions: 'ویرایش',
            status: 'inactive',
        },
    },
]

const GroupDetails = ({ data = GROUP_USERS_DUMMY }: { data?: GroupUserRowProps[] }) => {
    return (
        <TableProvider TableColoumn={TABLE_COLOUMN}>
            <div className='rounded-card-lg bg-surface-container-high p-2'>
            <Table className='border-collapse border-spacing-y-4'>
                <TableHeader />
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index} data={item.data} />
                    ))}
                </TableBody>
            </Table>
        </div>
        </TableProvider>
    )
}

export default GroupDetails
