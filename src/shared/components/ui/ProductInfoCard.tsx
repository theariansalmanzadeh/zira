"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card } from "@shared/components/ui/Card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@shared/components/ui/Breadcrumb";
import { ToggleGroup, ToggleGroupItem } from "@shared/components/ui/ToggleGroup";
import { Tabs, TabsList, TabsTrigger } from "@shared/components/ui/Tabs";
import IconButton from "./IconButton";
import { cn } from "@/src/shared/libs/utils";

const QUANTITY_OPTIONS = [
  { value: "single", label: "پک ۶ عددی" },
  { value: "double", label: "پک ۱۲ عددی" },
  { value: "quad", label: "پک ۲۴ عددی" },
  { value: "full", label: "پک سایز کامل (۱۸ عدد)" },
];

const SIZE_OPTIONS = ["Xs", "Sm", "Md", "Lg", "Xl", "2Xl", "3Xl"];

const COLOR_OPTIONS = [
  { value: "pink", label: "صورتی", hex: "#EC66B4" },
  { value: "blue", label: "آبی", hex: "#6BB7E9" },
  { value: "green", label: "سبز", hex: "#80D5BA" },
  { value: "black", label: "مشکی", hex: "#111111" },
  { value: "purple", label: "بنفش", hex: "#A730C3" },
  { value: "gray", label: "خاکستری", hex: "#BFBFBF" },
  { value: "cream", label: "کرم", hex: "#F1E8D7" },
  { value: "white", label: "سفید", hex: "#FFFFFF" },
];

interface ProductInfoCardProps {
  imgUrl?: string;
}

const ProductInfoCard = ({ imgUrl }: ProductInfoCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <Card className={cn("w-full max-w-[390px] rounded-container-lg bg-surface-container-lowest p-xl gap-xl shadow-none", isExpanded && "absolute top-0 left-0")} dir="ltr">
      <div className="flex flex-col gap-xs items-end w-full">
        <div className="flex flex-row-reverse items-center justify-between w-full">
          <h3 className="text-title-md text-on-surface">پشم شیشه ای</h3>
          <IconButton icon="expandContent" variant="ghost" iconClassName="size-6" onClick={handleExpand} />
        </div>
        <Breadcrumb className="*:text-outline *:text-label-md mt-xl">
          <BreadcrumbList className="text-body-small text-outline">
            <BreadcrumbItem>
              <BreadcrumbPage className="text-outline">دسته‌بندی مادر</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="-rotate-180" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-outline">دسته‌بندی فرعی</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="relative min-h-[240px] w-full overflow-hidden rounded-container-md bg-surface-container-high mt-3">
        {imgUrl && (
          <Image
            src={imgUrl}
            alt="product-image"
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="w-full flex flex-col items-end gap-lg">
        <div className="w-full flex flex-col items-end gap-xs mt-lg">
          <span className="text-title-md text-outline">برند</span>
          <div className="w-full flex flex-row-reverse items-center justify-between">
            <span className="text-title-md text-on-surface font-medium">عنوان محصول</span>
            <span className="text-title-md text-outline">کد محصول</span>
          </div>
        </div>

        <div className="w-full flex flex-col items-end gap-sm py-xl">
          <span className="text-title-md text-on-surface-variant">تعداد</span>
          <ToggleGroup
            type="single"
            className="w-full flex flex-wrap justify-end gap-lg"
            variant="outline-variant"
          >
            {QUANTITY_OPTIONS.map((item) => (
              <ToggleGroupItem key={item.value} value={item.value}>
                {item.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="w-full flex flex-col items-end gap-lg py-xl">
          <span className="text-title-md text-on-surface-variant">سایز</span>
          <ToggleGroup
            type="single"
            className="w-full flex flex-wrap justify-end gap-sm"
            variant="outline-variant"
          >
            {SIZE_OPTIONS.map((size) => (
              <ToggleGroupItem key={size} value={size}>
                {size}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="w-full flex flex-col items-end gap-lg py-xl">
          <span className="text-title-md text-on-surface-variant">رنگ</span>
          <ToggleGroup
            type="single"
            className="w-full flex flex-wrap justify-end gap-sm"
            variant="outline-variant"
          >
            {COLOR_OPTIONS.map((color) => (
              <ToggleGroupItem key={color.value} value={color.value} className="gap-xs">
                <span
                  className="size-4 rounded-full border border-outline-variant"
                  style={{ backgroundColor: color.hex }}
                />
                {color.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <Tabs defaultValue="specs" className="w-full">
          <TabsList className="w-full justify-end border-0">
            <TabsTrigger value="availability">موجودی محصول</TabsTrigger>
            <TabsTrigger value="size-guide">راهنمای سایز</TabsTrigger>
            <TabsTrigger value="specs">مشخصات</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </Card>
  );
};

export default ProductInfoCard;
