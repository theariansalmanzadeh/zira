import Image from "next/image";
import Link from "next/link";

interface Brand {
    name: string;
    image: string;
    link: string;
}

interface PopularProductsProps {
    brands: Brand[];
}

const PopularProducts = ({ brands }: PopularProductsProps) => {
    return (
        <div className="flex flex-col gap-xl w-full">
            <h2 className="text-on-surface font-bold text-title-lg">
                برندهای محبوب
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-lg">
                {brands.map((brand, index) => (
                    <Link
                        key={index}
                        href={brand.link}

                    >
                        <div className="relative w-full min-h-[133px] md:min-h-[283px]! rounded-full overflow-hidden bg-surface-container-high flex items-center justify-center">
                            <span className="text-inverse-on-surface text-[24px] md:text-[40px] font-bold z-10">
                                {brand.name}
                            </span>
                            <Image
                                src={brand.image}
                                alt={brand.name}
                                fill
                                className="absolute top-0 left-0 w-full h-full object-cover"
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PopularProducts;
