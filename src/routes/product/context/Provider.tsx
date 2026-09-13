"use client";

import React, { createContext, useContext, useState } from "react";

interface ProductContextType {
    selectedSize: string;
    setSelectedSize: (value: string) => void;
    selectedQuantity: string;
    setSelectedQuantity: (value: string) => void;
    openProductModal: boolean;
    setOpenProductModal: (value: boolean) => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct must be used within a ProductProvider");
    }
    return context;
};

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedQuantity, setSelectedQuantity] = useState("");
    const [openProductModal, setOpenProductModal] = useState(false);

    const value = {
        selectedSize,
        setSelectedSize,
        selectedQuantity,
        setSelectedQuantity,
        openProductModal,
        setOpenProductModal,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
