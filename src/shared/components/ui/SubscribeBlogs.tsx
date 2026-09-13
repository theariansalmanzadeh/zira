"use client"

import IconButton from "@/src/shared/components/ui/IconButton";
import { Input } from "@/src/shared/components/ui/Input";

const SubscribeBlogs = () => {
  return (
    <div className="flex flex-col items-center gap-2xl py-[120px]">
      <p className="text-headline-sm lg:text-headline-lg font-bold text-on-surface text-center">
        خبرنامه اختصاصی
      </p>
      <p className="text-title-sm lg:text-title-lg text-on-surface-variant text-center">
        اولین نفر از پیشنهادهای‌ ویژه و مدل‌های جدید مطلع شوید
      </p>
      <div className="w-full md:w-[50%] relative py-2xl">
        <Input
          placeholder="ایمیل خود را وارد کنید"
          className="text-label-lg!"
          wrapperClassName="bg-surface-container-lowest shadow-lg w-full! h-full! rounded-container-lg!"
        />
        <IconButton
          icon="rightArrow"
          fill="#fff"
          variant="primary"
          className="absolute top-1/2 left-[1%] -translate-y-1/2 rotate-180"
          onClick={() => { }}
        />
      </div>
    </div>
  );
};

export default SubscribeBlogs;
