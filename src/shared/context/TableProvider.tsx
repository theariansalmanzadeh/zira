"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
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

const EMPTY_COLUMNS: TableFilterItem[] = [];

const columnsKey = (columns: TableFilterItem[]) =>
    columns
        .map(
            (column) =>
                `${column.id}:${column.header_label}:${column.isChecked}`,
        )
        .join("|");

const TableProvider = ({
    TableColoumn: initialColumns = EMPTY_COLUMNS,
    children,
}: TableProviderProps) => {
    const setFilter = useTableActionsStore((state) => state.setFilter);
    const [TableColoumn, setTableColoumnState] =
        useState<TableFilterItem[]>(initialColumns);
    const columnsRef = useRef(initialColumns);
    columnsRef.current = initialColumns;
    const serializedColumns = columnsKey(initialColumns);

    useEffect(() => {
        const nextColumns = columnsRef.current;
        setTableColoumnState((current) =>
            columnsKey(current) === serializedColumns ? current : nextColumns,
        );
        if (nextColumns.length > 0) {
            setFilter(nextColumns);
        }
    }, [serializedColumns, setFilter]);

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
