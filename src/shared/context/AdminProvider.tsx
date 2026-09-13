"use client";

import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";

type AdminContextType = {
    isExpanded: boolean;
    setIsExpanded: Dispatch<SetStateAction<boolean>>;
};

const AdminContext = createContext<AdminContextType | null>(null);

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmin must be used within an AdminProvider");
    }
    return context;
};

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <AdminContext.Provider value={{ isExpanded, setIsExpanded }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminProvider;
