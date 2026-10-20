"use client";

import React, { Fragment, useState } from "react";
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
import IconButton from "./IconButton";
import { cn } from "@/src/shared/libs/utils";

export type ProductPreviewColor = {
  value: string;
  label: string;
  hex: string;
};

export type ProductPreviewAttributeValue = {
  value: string;
  label: string;
  hex?: string;
};

export type ProductPreviewAttribute = {
  id: string;
  title: string;
  values: ProductPreviewAttributeValue[];
};

interface ProductInfoCardProps {
  imgUrl?: string;
  title?: string;
  productCode?: string;
  brand?: string;
  sizes?: { value: string; label: string }[] | string[];
  colors?: ProductPreviewColor[];
  packs?: { value: string; label: string }[];
  attributes?: ProductPreviewAttribute[];
  breadcrumbs?: string[];
}

const toSizeItems = (
  sizes: ProductInfoCardProps["sizes"] = []
): { value: string; label: string }[] =>
  sizes.map((size) =>
    typeof size === "string" ? { value: size, label: size } : size
  );

const ProductInfoCard = ({
  imgUrl,
  title = "عنوان محصول",
  productCode = "کد محصول",
  brand = "برند",
  sizes = [],
  colors = [],
  packs = [],
  attributes = [],
  breadcrumbs = [],
}: ProductInfoCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sizeItems = toSizeItems(sizes);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card
      className={cn(
        "w-full rounded-container-lg bg-surface-container-lowest p-xl gap-xl shadow-none",
        isExpanded && "absolute top-0 left-0"
      )}
      dir="ltr"
    >
      <div className="flex flex-col gap-xs items-end w-full">
        <div className="flex flex-row-reverse items-center justify-between w-full">
          <h3 className="text-title-md text-on-surface">{title}</h3>
          <IconButton
            icon="expandContent"
            variant="ghost"
            iconClassName="size-6"
            onClick={handleExpand}
          />
        </div>
        <Breadcrumb className="*:text-outline *:text-label-md mt-xl">
          <BreadcrumbList className="text-body-small text-outline">
            {breadcrumbs.map((item, index) => (
              <Fragment key={`${item}-${index}`}>
                {index > 0 && <BreadcrumbSeparator className="-rotate-180" />}
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-outline">{item}</BreadcrumbPage>
                </BreadcrumbItem>
              </Fragment>
            ))}
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

      <div className="w-full flex flex-col items-end gap-lg">
        <div className="w-full flex flex-col items-end gap-xs mt-lg">
          <span className="text-title-md text-outline">{brand}</span>
          <div className="w-full flex flex-row-reverse items-center justify-between">
            <span className="text-title-md text-on-surface font-medium">
              {title}
            </span>
            <span className="text-title-md text-outline">{productCode}</span>
          </div>
        </div>

        {packs.length > 0 ? (
          <div className="w-full flex flex-col items-end gap-sm py-xl">
            <span className="text-title-md text-on-surface-variant">تعداد</span>
            <ToggleGroup
              type="single"
              className="w-full flex flex-wrap justify-end gap-lg"
              variant="outline-variant"
            >
              {packs.map((item) => (
                <ToggleGroupItem key={item.value} value={item.value}>
                  {item.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        ) : null}

        {sizeItems.length > 0 ? (
          <div className="w-full flex flex-col items-end gap-lg py-xl">
            <span className="text-title-md text-on-surface-variant">سایز</span>
            <ToggleGroup
              type="single"
              className="w-full flex flex-wrap justify-end gap-sm"
              variant="outline-variant"
            >
              {sizeItems.map((size) => (
                <ToggleGroupItem key={size.value} value={size.value}>
                  {size.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        ) : null}

        {colors.length > 0 ? (
          <div className="w-full flex flex-col items-end gap-lg py-xl">
            <span className="text-title-md text-on-surface-variant">رنگ</span>
            <ToggleGroup
              type="single"
              className="w-full flex flex-wrap justify-end gap-sm"
              variant="outline-variant"
            >
              {colors.map((color) => (
                <ToggleGroupItem
                  key={color.value}
                  value={color.value}
                  className="gap-xs"
                >
                  <span
                    className="size-4 rounded-full border border-outline-variant"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        ) : null}

        {attributes.map((attribute) => (
          <div
            key={attribute.id}
            className="w-full flex flex-col items-end gap-lg py-xl"
          >
            <span className="text-title-md text-on-surface-variant">
              {attribute.title}
            </span>
            <ToggleGroup
              type="single"
              className="w-full flex flex-wrap justify-end gap-sm"
              variant="outline-variant"
            >
              {attribute.values.map((item) => (
                <ToggleGroupItem
                  key={item.value}
                  value={item.value}
                  className="gap-xs"
                >
                  {item.hex ? (
                    <span
                      className="size-4 rounded-full border border-outline-variant"
                      style={{ backgroundColor: item.hex }}
                    />
                  ) : null}
                  {item.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProductInfoCard;
