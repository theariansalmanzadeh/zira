"use client";

import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface RegistrationContextType {
    phoneNumber: string;
    otp: string;
    setPhoneNumber: Dispatch<SetStateAction<string>>;
    setOtp: Dispatch<SetStateAction<string>>;

}

const RegistrationContext = createContext<RegistrationContextType | null>(null);

export const useRegistration = () => {
    const context = useContext(RegistrationContext);
    if (!context) {
        throw new Error("useRegistration must be used within an RegistrationProvider");
    }
    return context;
};

const RegistrationProvider = ({ children }: { children: React.ReactNode }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const value = {
        phoneNumber,
        otp,
        setPhoneNumber,
        setOtp
    }

    return (
        <RegistrationContext.Provider value={value}>
            {children}
        </RegistrationContext.Provider>
    );
};

export default RegistrationProvider;
