import TableHeader from '../../components/TableHeader'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { GROUP_USERS_DUMMY } from '@/src/routes/groupDetails/GroupDetails'
import TableRow from '../../components/TableRow'

const RoleLists = () => {
    return (
        <>
            <div className='bg-surface-container-high rounded-card-lg p-2'>
                <Table className='border-spacing-y-4 border-collapse' >
                    <TableHeader />
                    <TableBody>
                        {GROUP_USERS_DUMMY.map((item, index) => (
                            <TableRow key={index} data={item.data} />
                        ))}
                    </TableBody>
                </Table>
            </div>

        </>
    )
}

export default RoleLists