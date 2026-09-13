"use client";

import { useState } from "react";
import { Input } from "@/src/shared/components/ui/Input";
import IconButton from "@/src/shared/components/ui/IconButton";

const Search = () => {
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <IconButton
                icon="magnifier"
                onClick={() => setIsOpen(true)}
            />
        );
    }

    return (
        <Input
            dir="rtl"
            iconId="magnifier"
            placeholder="جستجو با شماره سفارش یا نام مشتری..."
            wrapperClassName="rounded-full flex-row-reverse min-w-[320px] px-1"
            className="text-right"
            autoFocus
            onBlur={() => setIsOpen(false)}
        />
    );
};

export default Search;
