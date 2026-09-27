import ExitTableCells from './ExitTableCells'
import type { PreparationExitRecord } from '../constants/exits'

const OnlineRow = ({ data }: { data: PreparationExitRecord }) => {
    return (
        <ExitTableCells
            data={data}
            values={{
                dateTime: data.dateTime,
                invoiceNumber: data.invoiceNumber,
                customerCode: data.customerCode,
                customerName: data.customerName,
                actionType: data.actionType,
                warehouse: data.warehouse,
                warehouseCode: data.warehouseCode,
            }}
        />
    )
}

export default OnlineRow
