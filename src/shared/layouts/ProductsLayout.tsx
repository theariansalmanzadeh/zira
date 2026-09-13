import React from "react";

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-surface-container-lowest p-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-10 w-full">
            {children}
        </div>
    );
};

export default ProductsLayout;
