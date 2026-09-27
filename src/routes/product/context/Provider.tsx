"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { COLOR_ITEMS, SIZE_ITEMS } from "../content/dummy";
import type { ProductContextType } from "../types";

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
    const [quantity, setQuantity] = useState("custom-pack");
    const [sizes, setSizes] = useState<string[]>([SIZE_ITEMS[0].value]);
    const [colors, setColors] = useState<string[]>([COLOR_ITEMS[0].value]);
    const [storedSizes, setStoredSizes] = useState<string[]>([SIZE_ITEMS[0].value]);
    const [storedColors, setStoredColors] = useState<string[]>([COLOR_ITEMS[0].value]);
    const [isCustomPack, setIsCustomPack] = useState(quantity === "custom-pack");

    useEffect(() => {
        setIsCustomPack(quantity === "custom-pack");
    }, [quantity]);

    useEffect(() => {
        setStoredSizes(sizes);
        setStoredColors(colors);
    }, [sizes, colors]);

    const value = {
        selectedSize,
        setSelectedSize,
        selectedQuantity,
        setSelectedQuantity,
        openProductModal,
        setOpenProductModal,
        quantity,
        setQuantity,
        sizes,
        setSizes,
        colors,
        setColors,
        storedSizes,
        storedColors,
        isCustomPack,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
