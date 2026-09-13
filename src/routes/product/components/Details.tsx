import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/shared/components/ui/Tabs";

interface DetailItem {
    label: string;
    value: string;
}

interface DetailsProps {
    details: DetailItem[];
}

const Details = ({ details }: DetailsProps) => {
    return (
        <Tabs defaultValue="specs" dir="rtl" className="w-full">
            <TabsList className="w-full">
                <TabsTrigger value="specs" className="flex-1">مشخصات</TabsTrigger>
                <TabsTrigger value="description" className="flex-1">توضیحات</TabsTrigger>
            </TabsList>
            <TabsContent value="specs" className="pt-xl">
                <div className="flex flex-col gap-lg">
                    {details.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-row justify-start items-start gap-xl py-md"
                        >
                            <span className="text-outline text-body-lg basis-1/3">
                                {item.label}
                            </span>
                            <span className="text-on-surface-variant text-body-lg text-right">
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="description" className="pt-xl">
                <p className="text-on-surface-variant text-body-lg leading-relaxed">
                    این محصول با کیفیت بالا و طراحی مدرن، یکی از محبوب‌ترین محصولات فروشگاه ماست. جنس پارچه نرم و راحت بوده و برای استفاده روزمره مناسب است.
                </p>
            </TabsContent>
        </Tabs>
    );
};

export default Details;
