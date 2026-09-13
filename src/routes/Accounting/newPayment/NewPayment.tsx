'use client'

import Form from './component/Form'
import Summary from './component/Summary'
import NewPaymentProvider from './provider/NewPaymentProvider'

const NewPayment = () => {
    return (
        <NewPaymentProvider>
            <div dir="rtl">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
                    <div className="col-span-7">
                        <Form />
                    </div>
                    <div className="col-span-5">
                        <Summary />
                    </div>
                </div>
            </div>
        </NewPaymentProvider>
    )
}

export default NewPayment
