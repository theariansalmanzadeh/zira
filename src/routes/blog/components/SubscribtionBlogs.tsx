"use client"

import IconButton from "@/src/shared/components/ui/IconButton";
import { Input } from "@/src/shared/components/ui/Input";

const SubscribeBlogs = () => {
    return (
        <div className="hidden md:flex flex-col items-center gap-2xl py-[120px]">
            <p className="text-headline-sm lg:text-headline-lg font-bold text-on-surface text-center">
                جدیدترین مطالب مد و فشن را دنبال کنید!
            </p>
            <div className="w-full md:w-[45%] relative" dir="rtl">
                <Input
                    placeholder="ایمیل خود را وارد کنید"
                    className="text-label-lg!"
                    wrapperClassName="bg-surface-container-lowest shadow-2xl w-full! py-2xl rounded-container-lg!"
                />
                <IconButton
                    icon="rightArrow"
                    iconClassName="rotate-180"
                    fill="#eee"
                    variant="primary"
                    className="absolute top-[4px] left-[1%]"
                    onClick={() => { }}
                />
            </div>
        </div>
    );
};

export default SubscribeBlogs;
