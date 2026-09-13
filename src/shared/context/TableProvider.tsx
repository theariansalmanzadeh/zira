"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import type { TableFilterItem } from "@/src/shared/store/table-actions-store";
import { useTableActionsStore } from "@/src/shared/store/table-actions-store";

type TableContextType = {
    TableColoumn: TableFilterItem[];
    setTableColoumn: (columns: TableFilterItem[]) => void;
    visibleTableColoumn: TableFilterItem[];
};

const TableContext = createContext<TableContextType | null>(null);

export const useTable = () => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error("useTable must be used within a TableProvider");
    }
    return context;
};

type TableProviderProps = {
    TableColoumn?: TableFilterItem[];
    children: React.ReactNode;
};

const TableProvider = ({
    TableColoumn: initialColumns = [],
    children,
}: TableProviderProps) => {
    const setFilter = useTableActionsStore((state) => state.setFilter);
    const [TableColoumn, setTableColoumnState] =
        useState<TableFilterItem[]>(initialColumns);

    useEffect(() => {
        setTableColoumnState(initialColumns);
        if (initialColumns.length > 0) {
            setFilter(initialColumns);
        }
    }, [initialColumns, setFilter]);

    const setTableColoumn = useCallback(
        (columns: TableFilterItem[]) => {
            setTableColoumnState(columns);
            setFilter(columns);
        },
        [setFilter],
    );

    const visibleTableColoumn = useMemo(
        () => TableColoumn.filter((column) => column.isChecked),
        [TableColoumn],
    );

    const value = useMemo(
        () => ({
            TableColoumn,
            setTableColoumn,
            visibleTableColoumn,
        }),
        [TableColoumn, setTableColoumn, visibleTableColoumn],
    );

    return (
        <TableContext.Provider value={value}>{children}</TableContext.Provider>
    );
};

export default TableProvider;
