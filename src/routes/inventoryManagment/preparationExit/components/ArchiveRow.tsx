import ExitTableCells from './ExitTableCells'
import type { PreparationExitRecord } from '../constants/exits'

const ArchiveRow = ({ data }: { data: PreparationExitRecord }) => {
    return (
        <ExitTableCells
            data={data}
            values={{
                dateTime: data.dateTime,
                invoiceNumber: data.invoiceNumber,
                customerCode: data.customerCode,
                customerName: data.customerName,
                customerPhone: data.customerPhone,
                warehouseCode: data.warehouseCode,
            }}
        />
    )
}

export default ArchiveRow
