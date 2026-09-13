import IconButton from "@/src/shared/components/ui/IconButton";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/src/shared/components/ui/Popover";

const SORT_OPTIONS = ["جدیدترین", "جدیدترین", "جدیدترین"];

const Sort = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <IconButton icon="sort" />
            </PopoverTrigger>
            <PopoverContent side="left">
                <span className="text-outline">مرتب‌سازی بر اساس:</span>
                <ul className="[&_li]:text-label-md [&_li]:p-2 [&_li]:cursor-pointer">
                    {SORT_OPTIONS.map((option, index) => (
                        <li key={index}>{option}</li>
                    ))}
                </ul>
            </PopoverContent>
        </Popover>
    );
};

export default Sort;
