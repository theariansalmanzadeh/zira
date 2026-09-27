export type ProductColor = {
    id: string;
    label: string;
    value: string;
};

export interface ProductContextType {
    selectedSize: string;
    setSelectedSize: (value: string) => void;
    selectedQuantity: string;
    setSelectedQuantity: (value: string) => void;
    openProductModal: boolean;
    setOpenProductModal: (value: boolean) => void;
    quantity: string;
    setQuantity: (value: string) => void;
    sizes: string[];
    setSizes: (value: string[]) => void;
    colors: string[];
    setColors: (value: string[]) => void;
    storedSizes: string[];
    storedColors: string[];
    isCustomPack: boolean;
}