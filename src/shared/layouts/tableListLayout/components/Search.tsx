"use client";

import { useState } from "react";
import { Input } from "@/src/shared/components/ui/Input";
import IconButton from "@/src/shared/components/ui/IconButton";
import { useTableActionsStore } from "@/src/shared/store/table-actions-store";
import { cn } from "@/src/shared/libs/utils";

type SearchProps = {
    placeholder?: string;
    defaultOpen?: boolean;
};

const Search = ({
    placeholder = "جستجو با شماره سفارش یا نام مشتری...",
    defaultOpen = false,
}: SearchProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const search = useTableActionsStore((state) => state.search);
    const setSearch = useTableActionsStore((state) => state.setSearch);

    if (!isOpen) {
        return (
            <IconButton
                icon="search400Linear"
                onClick={() => setIsOpen(true)}
            />
        );
    }

    return (
        <Input
            dir="rtl"
            iconId="search400Linear"
            iconClassName="text-on-surface-variant"
            placeholder={placeholder}
            wrapperClassName={cn(
                "rounded-full flex-row-reverse px-1 border border-outline-variant",
                defaultOpen ? "w-full min-w-0" : "min-w-[320px]"
            )}
            className="text-right"
            value={search}
            onChange={setSearch}
            autoFocus={!defaultOpen}
            onBlur={() => {
                if (!defaultOpen) setIsOpen(false);
            }}
        />
    );
};

export default Search;
