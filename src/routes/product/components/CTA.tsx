import { Button } from "@/src/shared/components/ui/button";
import { Badge } from "@/src/shared/components/ui/Badge";
import { Icon } from "@/src/shared/components/Icons/Icon";
import { useAuth } from "@/src/shared/context/AuthProvider";
import { formatFaNumber } from "@/src/shared/libs/formatter";
import router from "next/router";

interface CTAProps {
    discount: number;
    price: number;
    quantity: number;
}

const CTA = ({ discount, price, quantity }: CTAProps) => {
    const { isLoggedIn } = useAuth();
    const currentPrice = discount ? price - (price * +discount / 100) : price


    return (
        <div className="flex flex-row-reverse items-center justify-between sticky bottom-0 bg-surface-container-high z-10 rounded-card-lg py-sm px-lg">
            <Button variant="primary" size="lg" className="self-stretch rounded-2xl!" onClick={() => {
                if (!isLoggedIn) {
                    router.push("/login");
                }
            }}>
                {true ? "افزودن به سبد" : "ورود به سایت"}
            </Button>
            <div className="flex flex-col items-end justify-center gap-1">
                {true ? <>{discount > 0 && (
                    <div className="flex flex-row justify-between items-center gap-lg">
                        <Badge variant='warning'>{discount}%</Badge>
                        <div className='relative flex flex-row justify-between items-center gap-1'>
                            <span className='text-outline text-label-md font-bold block'>{formatFaNumber(price)}</span>
                            <div className='absolute w-full h-px top-1/2 -translate-y-full left-0 bg-outline' />
                            <Icon label='currency' />
                        </div>
                    </div>
                )}
                    <div className='flex flex-row justify-end items-start w-full'>
                        <div className="flex flex-row justify-between items-center gap-1">
                            <span className='text-on-surface text-label-lg font-bold'>{formatFaNumber(currentPrice)}</span>
                            <Icon label='currency' />
                        </div>
                    </div>
                </> :
                    <p className='text-on-surface-variant text-body-md font-medium'>برای مشاهده قیمت, موجودی و پیشنهادهای ویژه, وارد فروشگاه شوید.</p>}
            </div>
        </div>
    );
};

export default CTA;
