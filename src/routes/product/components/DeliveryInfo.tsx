import { Icon } from "@/src/shared/components/Icons/Icon";

const DeliveryInfo = ({ quantity = 0, deliveryTime = '۳ تا ۵ روز کاری' }: { quantity: number, deliveryTime: string }) => {
    return (
        <div className="flex flex-col gap-sm p-lg bg-surface-container-lowest">
            <div className="flex flex-row items-center gap-1">
                <Icon label="box" />
                <span className="text-body-md text-on-surface-variant">{quantity} موجود در انبار</span>
            </div>
            <div className="flex flex-row items-center gap-1">
                <Icon label="delivery" />
                <span className="text-body-md text-on-surface-variant">{deliveryTime}</span>
            </div>
        </div>
    );
};

export default DeliveryInfo;
