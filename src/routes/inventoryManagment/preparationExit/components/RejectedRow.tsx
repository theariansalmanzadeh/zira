import ExitTableCells from './ExitTableCells'
import type { PreparationExitRecord } from '../constants/exits'

const RejectedRow = ({ data }: { data: PreparationExitRecord }) => {
    return (
        <ExitTableCells
            data={data}
            values={{
                dateTime: data.dateTime,
                salesChannel: data.salesChannel,
                invoiceNumber: data.invoiceNumber,
                customerCode: data.customerCode,
                customerName: data.customerName,
                customerPhone: data.customerPhone,
            }}
        />
    )
}

export default RejectedRow
