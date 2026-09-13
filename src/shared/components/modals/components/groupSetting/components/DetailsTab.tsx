"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@shared/components/ui/Avatar";
import { Button } from "@shared/components/ui/button";
import { Icon } from "@shared/components/Icons/Icon";
import type { GroupDetails } from "../types";

type DetailsTabProps = {
    details: GroupDetails;
    onEdit?: () => void;
};

const Field = ({ label, value }: { label: string; value: string }) => (
    <div className="flex min-w-0 flex-col gap-1 text-right">
        <span className="text-label-md text-outline">{label}</span>
        <span className="text-label-lg text-on-surface-variant">{value}</span>
    </div>
);

const ManagerField = ({
    label,
    name,
    avatarUrl,
}: {
    label: string;
    name: string;
    avatarUrl?: string;
}) => (
    <div className="flex min-w-0 flex-col gap-1 text-right">
        <span className="text-label-md text-outline">{label}</span>
        <div className="flex flex-row items-center gap-2">
            <Avatar size="sm" className="bg-surface-container-highest">
                {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
                <AvatarFallback className="bg-surface-container-highest text-on-surface-variant">
                    {name.charAt(0)}
                </AvatarFallback>
            </Avatar>
            <span className="text-label-lg text-on-surface-variant">{name}</span>
        </div>
    </div>
);

const DetailsTab = ({ details, onEdit }: DetailsTabProps) => {
    return (
        <div className="flex flex-1 flex-col gap-4 rounded-card-md bg-surface-container-high p-3">
            <div className="rounded-card-md bg-surface-container-lowest p-4 grow">
                <div className="grid grid-cols-2 gap-6">
                    <Field label="نام گروه" value={details.name} />
                    <Field label="شناسه گروه" value={details.id} />
                    <Field label="نقش گروه" value={details.role} />
                    <ManagerField
                        label="مدیر گروه"
                        name={details.managerName}
                        avatarUrl={details.managerAvatarUrl}
                    />
                    <Field label="وضعیت" value={details.status} />
                    <Field label="توضیحات" value={details.description} />
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    type="button"
                    variant="secondary"
                    className="rounded-card-md border-outline bg-surface-container-lowest px-4"
                    onClick={onEdit}
                >
                    ویرایش
                    <Icon label="edit400Linear" className="size-4" />
                </Button>
            </div>
        </div>
    );
};

export default DetailsTab;
