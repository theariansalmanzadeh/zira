import Header from './component/Header'
import InventoryInfoDetails from './component/InventoryInfoDetails'

const InventoryDetail = () => {
    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <Header />
            <InventoryInfoDetails />
        </div>
    )
}

export default InventoryDetail
