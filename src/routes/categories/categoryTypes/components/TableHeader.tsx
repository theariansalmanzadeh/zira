"use client";

import { useTable } from "@/src/shared/context/TableProvider";
import { cn } from "@shared/libs/utils";
import { CATEGORY_HEADER_CELL_CLASS } from "../constants";

const TableHeader = () => {
    const { visibleTableColoumn } = useTable();

    return (
        <>
            {visibleTableColoumn.map((column, index) => (
                <span
                    key={column.id}
                    className={cn(
                        CATEGORY_HEADER_CELL_CLASS,
                        column.className,
                        index === 0 && "ps-4",
                    )}
                >
                    {column.header_label}
                </span>
            ))}
        </>
    );
};

export default TableHeader;
