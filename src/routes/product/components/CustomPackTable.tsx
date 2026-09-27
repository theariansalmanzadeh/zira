'use client'

import { useState } from "react";
import { Pill } from "@/src/shared/components/ui/Pill";
import { Input } from "@/src/shared/components/ui/Input";
import { formatFaNumber } from "@/src/shared/libs/formatter";
import { toEnglishDigits } from "@/src/shared/schema/generalSchema";
import { COLOR_ITEMS, SIZE_ITEMS } from "../content/dummy";
import { Icon } from "@/src/shared/components/Icons/Icon";

const sanitizeNumericInput = (value: string) =>
    toEnglishDigits(value).replace(/\D/g, "");

const MAX_QUANTITIES = [6, 8, 10, 12, 18, 20, 24, 25, 30, 36];
const UNIT_PRICES = [708_000, 770_000, 790_000];

const getCell = (colorIndex: number, sizeIndex: number) => ({
    max: MAX_QUANTITIES[(colorIndex * 3 + sizeIndex) % MAX_QUANTITIES.length],
    price: UNIT_PRICES[(colorIndex + sizeIndex) % UNIT_PRICES.length],
});

type CustomPackTableProps = {
    sizes: string[];
    colors: string[];
};

const CustomPackTable = ({ sizes, colors }: CustomPackTableProps) => {
    const [quantities, setQuantities] = useState<Record<string, string>>({});
    const sizeItems = sizes
        .map((value) => SIZE_ITEMS.find((item) => item.value === value))
        .filter((item) => item !== undefined);
    const colorItems = colors
        .map((value) => COLOR_ITEMS.find((item) => item.value === value))
        .filter((item) => item !== undefined);

    return (
        <div
            className="flex w-full min-w-0 flex-col gap-4 rounded-card-md border border-primary/30 bg-surface-container-lowest p-4"
            dir="rtl"
        >
            <div className="flex items-center justify-between gap-3">
                <span className="text-label-lg text-on-surface">
                    جدول سفارش عمده B2B (پک سفارشی)
                </span>
                <Pill text="انتخاب تیراژ دلخواه" variant="success" />
            </div>

            <div className="w-full min-w-0 overflow-x-auto">
                <div
                    className="grid w-max min-w-full items-center gap-x-3 gap-y-4 bg-surface-container-high p-1 rounded-card-sm"
                    style={{
                        gridTemplateColumns: `auto repeat(${sizeItems.length}, minmax(7rem, 7rem)) auto`,
                    }}
                >
                    <span className="text-label-md text-outline">رنگ</span>
                    {sizeItems.map((size) => (
                        <span
                            key={size.value}
                            className="text-center text-label-md text-on-surface"
                        >
                            {size.label}
                        </span>
                    ))}
                    <span className="text-center text-label-md text-outline">جمع</span>

                    {colorItems.map((color, colorIndex) => {
                        const rowTotal = sizeItems.reduce((sum, size) => {
                            const raw = quantities[`${color.value}-${size.value}`] ?? "";
                            return sum + (raw === "" ? 0 : Number(raw));
                        }, 0);

                        return (
                            <div key={color.value} className="contents">
                                <div className="flex items-center justify-start gap-2">
                                    <span
                                        className="size-4 shrink-0 rounded-full border border-outline"
                                        style={{ backgroundColor: color.color }}
                                    />
                                    <span className="text-label-md text-on-surface">
                                        {color.label}
                                    </span>
                                </div>
                                {sizeItems.map((size, sizeIndex) => {
                                    const cell = getCell(colorIndex, sizeIndex);
                                    const cellKey = `${color.value}-${size.value}`;
                                    const quantity = quantities[cellKey] ?? "";
                                    return (
                                        <div
                                            key={cellKey}
                                            className="flex flex-col items-end gap-1 rounded-card-sm bg-surface-container-high px-2 py-2"
                                        >
                                            <Input
                                                inputMode="numeric"
                                                value={quantity ? formatFaNumber(quantity) : ""}
                                                placeholder={`حداکثر ${formatFaNumber(cell.max)}`}
                                                wrapperClassName="w-full bg-surface-container-lowest px-2 py-1.5"
                                                className="w-full text-center"
                                                onChange={(value) => {
                                                    const next = sanitizeNumericInput(value);
                                                    setQuantities((current) => ({
                                                        ...current,
                                                        [cellKey]: next,
                                                    }));
                                                }}
                                            />
                                            <div className="flex items-center gap-1">
                                                <span className="text-label-sm text-primary">
                                                    تک: {formatFaNumber(cell.price)}
                                                </span>
                                                <Icon label="currency" className="text-primary" />
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="flex items-center justify-center">
                                    <span className="text-label-md text-on-surface">
                                        {formatFaNumber(rowTotal)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CustomPackTable;
