'use client'

import { useRouter } from 'next/navigation'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import { TABLE_COLOUMN, VARIABLES_DUMMY, type VariableItem } from './constants'

type VariableProps = {
    data?: VariableItem[]
}

const Variable = ({ data = VARIABLES_DUMMY }: VariableProps) => {
    const { push } = useRouter()

    return (
        <div className='flex w-full flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                hasHeaderActions={false}
                hasFilter={false}
                hasSort={false}
                hasTableSettings={false}
                hasExpand={false}
            >
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            {data.map((item) => (
                                <TableRow
                                    key={item.id}
                                    data={item}
                                    onEdit={() =>
                                        push(
                                            `/admin/categories/variable/new?id=${item.id}`
                                        )
                                    }
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TableListLayout>
        </div>
    )
}

export default Variable
