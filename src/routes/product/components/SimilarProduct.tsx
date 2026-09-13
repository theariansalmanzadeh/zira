import ProductCard from "@/src/shared/components/ui/ProductCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/src/shared/components/ui/Carousel";
import Link from "next/link";
import { Icon } from "@/src/shared/components/Icons/Icon";

const SimilarProduct = () => {
    return (
        <div className="flex flex-col gap-xl w-full bg-surface-container-lowest pb-6xl">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-title-lg font-bold text-on-surface">
                    محصولات مشابه
                </h2>
                <Link href="/similar-products" className="flex flex-row items-center gap-1">
                    <p className="text-body-lg text-on-surface-variant">
                        مشاهده همه
                    </p>
                    <Icon label="chavaron" />
                </Link>
            </div>
            <Carousel className="w-full" dir="rtl" opts={{ direction: "rtl" }}>
                <CarouselContent className="-ml-1 gap-lg">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <CarouselItem key={index} className="basis-3/5 md:basis-1/4!">
                            <ProductCard href="#" brand="Brand" discount="10" title={`Product ${index + 1}`} price={100000} isLoggedIn={true} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext className="hidden md:flex" />
                <CarouselPrevious className="hidden md:flex" />
            </Carousel>
        </div>
    );
};

export default SimilarProduct;
