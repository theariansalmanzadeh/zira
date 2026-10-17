import Image from "next/image";
import { cn } from "@shared/libs/utils";
import { formatFaNumber } from "@shared/libs/formatter";
import Link from "next/link";

interface BlogCardProps {
    image: string;
    title: string;
    date: string;
    readTime: number;
    href: string;
    isCarousel?: boolean;
}

const BlogCard = ({ image, title, href, date, readTime, isCarousel }: BlogCardProps) => {
    return (
        <Link href={`/blog/${href}`}>
            <div className={cn("flex flex-col gap-md relative", isCarousel ? "h-full" : "h-auto")}>
                <div className={cn("relative rounded-xl overflow-hidden bg-surface-container-high", isCarousel ? "h-full min-h-[410px] w-full" : "h-auto min-h-[264px] min-w-[260px]")}>
                    {image && <Image
                        src={`https://api.bonksaz.ir${image}`}
                        alt={title}
                        fill
                        className="object-cover w-full h-full absolute top-0 left-0 right-0 bottom-0"
                    />}
                </div>
                <div className={cn("flex flex-col gap-lg mt-sm", isCarousel ? "absolute bottom-0 left-0 right-0 p-10" : "")}>
                    <h3 className="text-on-surface font-bold text-title-lg">
                        {title}
                    </h3>
                    <div className={cn("text-on-surface-variant! text-label-lg flex flex-row items-center gap-1", isCarousel ? "self-start" : "self-end")}>
                        <span>{Intl.DateTimeFormat("fa-IR", { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(date))}</span> <div className="w-1 h-1 bg-on-surface-variant rounded-full" />  <span>{formatFaNumber(readTime, { maximumFractionDigits: 0 })} دقیقه مطالعه</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
