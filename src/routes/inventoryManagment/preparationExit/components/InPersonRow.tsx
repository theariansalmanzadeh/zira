import ExitTableCells from './ExitTableCells'
import type { PreparationExitRecord } from '../constants/exits'

const InPersonRow = ({ data }: { data: PreparationExitRecord }) => {
    return (
        <ExitTableCells
            data={data}
            values={{
                dateTime: data.dateTime,
                invoiceNumber: data.invoiceNumber,
                customerCode: data.customerCode,
                customerName: data.customerName,
                sellerName: data.sellerName,
                settlementStatus: data.settlementStatus,
            }}
        />
    )
}

export default InPersonRow
