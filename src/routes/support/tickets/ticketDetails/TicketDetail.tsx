import Conversation from '@/src/shared/components/conversation/Conversation'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

const TicketDetail = () => {
    return (
        <div className="flex flex-col gap-6" dir="rtl">
            <Header
                ticketCode="TC-5521"
                statusText="باز"
                statusVariant="success"
                subtitle="عدم تطبیق اقلام فاکتور SI-۸۹۰۲"
            />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-9">
                    <Conversation />
                </div>
                <div className="col-span-12 lg:col-span-3">
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}

export default TicketDetail
