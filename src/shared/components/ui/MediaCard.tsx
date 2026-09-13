import { Card, CardContent, CardHeader } from "@shared/components/ui/Card";
import { cn } from "@shared/libs/utils";
import Link from "next/link";
import { Badge } from "./Badge";

export interface MediaCardProps {
  title: string;
  date: string | Date;
  blogLink: string;
  blogImg?: string | undefined | null;
  duration?: string;
  className?: string;
  tags?: string[];
}

const MediaCard: React.FC<MediaCardProps> = ({
  title,
  blogLink,
  blogImg,
  date,
  duration,
  className,
  tags,
}) => {
  return (
    <Card
      className={cn(
        "p-0!",
        "overflow-hidden",
        " bg-surface-container-lowest",
        "w-full",
        "max-w-full!",
        className
      )}
    >
      <Link href={blogLink}>
        <CardHeader className="bg-surface-container-highest relative rounded-b-card-lg! min-h-[200px] overflow-hidden">
          <div className="w-full flex-col-items-start gap-layout rounded-card-lg bg-surface-container-high" />
          {tags && (
            <div className="absolute top-2xl right-2xl flex-row-items-center gap-1">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="default"
                  className="text-on-surface-variant text-sm border-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {blogImg && <img src={blogImg} alt="" className="absolute top-0 bottom-0" />}
        </CardHeader>
        <CardContent className="bg-surface-container-lowest p-lg pt-lg">
          <p className="text-label-lg font-semibold text-on-surface">{title}</p>
          <div className="flex-row-items-start justify-end gap-1">
            <p className="text-sm text-on-surface-variant text-right mt-lg">
              {typeof date === "string" ? date : date.getFullYear()}
            </p>
            {duration && (
              <>
                <div className="w-1 h-1 bg-on-surface-variant rounded-full self-end" />
                <p className="text-sm text-on-surface-variant text-right mt-lg">
                  {duration} read
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default MediaCard;
