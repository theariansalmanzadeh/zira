"use client";

import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/src/shared/components/ui/Dialog";
import { useProduct } from "../context/Provider";
import { Carousel, CarouselContent, CarouselCounter, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/src/shared/components/ui/Carousel";
import Image from "next/image";

type ProductModalProps = {
    images: string[]
    imageIndex: number
}

const ProductModal = ({ images, imageIndex }: ProductModalProps) => {
    const { openProductModal, setOpenProductModal } = useProduct();
    const [api, setApi] = useState<CarouselApi>()

    useEffect(() => {
        if (!openProductModal || !api) return
        api.scrollTo(imageIndex, true)
    }, [api, imageIndex, openProductModal])

    return (
        <Dialog open={openProductModal} onOpenChange={(value) => !value && setOpenProductModal(false)}>

            <DialogHeader>
                <DialogTitle />
            </DialogHeader>
            <DialogContent
                className="w-full! max-w-full! h-full! max-h-full! py-3 px-[120px] rounded-none! m-0 top-0 left-0 translate-x-0! translate-y-0!"
                showCloseButton={true}
            >
                <Carousel
                    className="flex h-full relative"
                    opts={{ startIndex: imageIndex }}
                    setApi={setApi}
                >
                    <CarouselCounter className="absolute z-10 top-1/10 left-0 -translate-x-1/2 -translate-y-1/2" />
                    <CarouselContent className="h-full">
                        {images.map((src, index) => (
                            <CarouselItem key={`${src}-${index}`} className="h-full overflow-hidden bg-surface-container-lowest relative">
                                <Image src={src} alt={`product-${index + 1}`} className=" h-full object-cover absolute top-0 bottom-0 left-1/4 w-1/2" width={1000} height={1000} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNext className="flex top-1/2 right-0" />
                    <CarouselPrevious className="flex" />
                </Carousel>
            </DialogContent>
        </Dialog>
    );
};

export default ProductModal;