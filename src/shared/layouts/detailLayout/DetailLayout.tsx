"use client";

import { cn } from "@shared/libs/utils";
import TableProvider from "@/src/shared/context/TableProvider";
import HeaderCard from "./components/HeaderCard";
import { ToggleGroup, ToggleGroupItem } from "@components/ui/ToggleGroup";
import IconButton from "@components/ui/IconButton";
import { useState } from "react";
import Filter from "./components/Filter";
import Search from "./components/Search";
import Sort from "./components/Sort";

interface DetailLayoutProps {
    header?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    topContent?: React.ReactNode;
    toggleButtonValue?: { label: string; value: string }[];
    onChange?: (value: string) => void;
}

const DetailLayout = ({
    header,
    children,
    className,
    topContent,
    onChange,
    toggleButtonValue,
}: DetailLayoutProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <TableProvider>
            <div className={cn("flex flex-col gap-3", className)} dir="rtl">
                {topContent}
                {!topContent && <HeaderCard title="عنوان" identifier="شناسه" />}
                <section
                    className={`rounded-container-xl bg-surface-container-lowest p-md ${isExpanded ? "fixed inset-0 z-50 bg-surface-container-lowest" : ""}`}
                >
                    <div className="bg-surface-container-lowest flex flex-row justify-between pb-2">
                        {toggleButtonValue && (
                            <ToggleGroup
                                type="single"
                                value={toggleButtonValue[0].value}
                                variant="filled"
                                className="p-1.5 rounded-container-md! bg-surface-container-high"
                                onValueChange={(nextValue) => {
                                    if (nextValue) {
                                        onChange?.(nextValue);
                                    }
                                }}
                            >
                                {toggleButtonValue.map((item) => (
                                    <ToggleGroupItem
                                        key={item.value}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>
                        )}
                        {header && (
                            <span className="text-title-lg text-on-surface">
                                {header}
                            </span>
                        )}
                        <div className="flex flex-row mr-auto">
                            <Search />
                            <Filter />
                            <IconButton icon="star" />
                            <IconButton icon="star" />
                            <Sort />
                            <IconButton
                                icon={
                                    isExpanded
                                        ? "collapseContent"
                                        : "expandContent"
                                }
                                onClick={() => setIsExpanded((prev) => !prev)}
                            />
                        </div>
                    </div>
                    <div id="admin-layout-content">{children}</div>
                </section>
            </div>
        </TableProvider>
    );
};

export default DetailLayout;
