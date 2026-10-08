import DetailLayout from '@/src/shared/layouts/detailLayout/DetailLayout'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { GROUP_USERS_DUMMY } from '@/src/routes/groupDetails/GroupDetails'
import TableHeader from '../../components/TableHeader'
import TableRow from '../../components/TableRow'
import RoleDetailInfo from './components/RoleDetailInfo'
import { TABLE_COLOUMN } from '../../constants'

const RoleDetail = () => {
    return (
        <DetailLayout topContent={<RoleDetailInfo />} header="لیست کاربران">
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                hasHeaderActions={false}
                hasSearch={false}
                hasFilter={false}
                hasExpand={false}
                hasSort={false}
                hasTableSettings={false}
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <TableHeader />
                        <TableBody>
                            {GROUP_USERS_DUMMY.map((item, index) => (
                                <TableRow key={index} data={item.data} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TableListLayout>
        </DetailLayout>
    )
}

export default RoleDetail
