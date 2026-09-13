import ProductCard from "@/src/shared/components/ui/ProductCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/src/shared/components/ui/Carousel";
import Link from "next/link";
import { Icon } from "@/src/shared/components/Icons/Icon";

const ProductCarousel = ({ title }: { title: string }) => {
    return (
        <div className="flex flex-col gap-xl w-full bg-surface-container-lowest" >
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-title-lg font-bold text-on-surface">
                    {title}
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
                            <ProductCard discount="10" title={`Product ${index + 1}`} price={100000} isLoggedIn={true} href={`product-${index + 1}`} brand="Brand 1" />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext className="hidden md:flex p-lg! rounded-button-lg!" />
                <CarouselPrevious className="hidden md:flex p-lg! rounded-button-lg!" />
            </Carousel>
        </div>
    );
};

export default ProductCarousel;
