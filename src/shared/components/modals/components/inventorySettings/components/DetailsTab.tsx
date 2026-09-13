"use client";

import type { ReactNode } from "react";
import { Button } from "@shared/components/ui/button";
import { Icon } from "@shared/components/Icons/Icon";
import type { InventoryDetails } from "../types";

type DetailsTabProps = {
    details: InventoryDetails;
    onEdit?: () => void;
};

const displayValue = (value?: string) => {
    const trimmed = value?.trim();
    return trimmed ? trimmed : "-";
};

const Field = ({ label, value }: { label: string; value?: string }) => (
    <div className="flex min-w-0 flex-col gap-1 text-right">
        <span className="text-label-md text-outline">{label}</span>
        <span className="text-label-lg text-on-surface-variant">
            {displayValue(value)}
        </span>
    </div>
);

const ManagerField = ({
    label,
    name,
}: {
    label: string;
    name: string;
}) => (
    <div className="flex min-w-0 flex-col gap-1 text-right">
        <span className="text-label-md text-outline">{label}</span>
        <div className="flex flex-row items-center gap-2">
            <div className="size-8 shrink-0 rounded-full bg-surface-container-highest" />
            <span className="text-label-lg text-on-surface underline">
                {name}
            </span>
        </div>
    </div>
);

const Section = ({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) => (
    <div className="flex flex-col gap-3">
        <span className="text-label-lg text-outline">{title}</span>
        <div className="rounded-card-md bg-surface-container-lowest p-6">
            <div className="grid grid-cols-2 gap-6">{children}</div>
        </div>
    </div>
);

const DetailsTab = ({ details, onEdit }: DetailsTabProps) => {
    return (
        <div className="flex flex-1 flex-col gap-4 rounded-card-md bg-surface-container-high p-3">
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto">
                <Section title="عمومی">
                    <Field label="نام انبار" value={details.name} />
                    <Field label="کد انبار" value={details.id} />
                    <ManagerField label="مسئول انبار" name={details.managerName} />
                    <Field label="تاریخ شروع فعالیت" value={details.startDate} />
                    <Field label="متراژ (متر مربع)" value={details.area} />
                    <Field label="وضعیت بیمه" value={details.insuranceStatus} />
                    <Field label="وضعیت" value={details.status} />
                    <div />
                    <Field label="توضیحات" value={details.description} />
                </Section>

                <Section title="نشانی">
                    <div className="col-span-2">
                        <Field label="آدرس" value={details.address} />
                    </div>
                    <Field label="کد پستی" value={details.postalCode} />
                    <Field label="تلفن ثابت" value={details.landlinePhone} />
                </Section>
            </div>

            <div className="flex justify-end">
                <Button
                    type="button"
                    variant="outline"
                    className="rounded-card-md bg-surface-container-lowest px-4"
                    onClick={onEdit}
                >
                    <Icon label="edit400Linear" className="size-4" />
                    ویرایش
                </Button>
            </div>
        </div>
    );
};

export default DetailsTab;
