import RegistrationProvider from '@/src/shared/context/RegistrationProvider'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <RegistrationProvider>
            <div className='w-full h-screen flex justify-center items-center'>
                {children}
            </div>
        </RegistrationProvider>
    )
}

export default layout