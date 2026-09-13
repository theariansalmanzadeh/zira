"use client"

import { Card } from "@shared/components/ui/Card";
import { Badge } from "@shared/components/ui/Badge";
import IconButton from "@shared/components/ui/IconButton";

interface PlanCardProps {
    title: string;
    address: string;
    status: string;
    id: string;
}

const PlanCard = ({ title, address, status, id }: PlanCardProps) => {
    return (
        <Card className="w-full rounded-card-lg bg-surface-container-high p-sm!" dir="ltr">
            <div className="flex flex-col gap-sm w-full">
                <div className="w-full rounded-card-md bg-surface-container-lowest p-lg">
                    <div className="flex flex-row items-start justify-between">
                        <Badge variant="primary" className="text-label-lg font-medium px-md py-sm">
                            {status}
                        </Badge>
                        <div className="flex flex-col items-end gap-sm">
                            <h3 className="text-title-lg font-medium text-on-surface">{title}</h3>
                            <span className="text-title-md text-outline">{id}</span>
                        </div>
                    </div>
                    <div className="mt-2xl flex flex-col items-end gap-sm">
                        <span className="text-lable-lg text-outline">نشانی</span>
                        <p className="text-lable-lg text-on-surface-variant">{address}</p>
                    </div>
                </div>

                <div className="flex flex-row gap-sm">
                    <IconButton icon="more" onClick={() => { }} iconClassName="rotate-90 size-5!" className="rounded-2xl bg-surface-container-lowest" />
                    <IconButton icon="edit" onClick={() => { }} iconClassName="size-5!" className="rounded-2xl bg-surface-container-lowest" />
                    <IconButton icon="filter" onClick={() => { }} iconClassName="size-5!" className="rounded-2xl bg-surface-container-lowest" />
                </div>
            </div>
        </Card>
    );
};

export default PlanCard;