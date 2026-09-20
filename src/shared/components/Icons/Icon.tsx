import { ICON_PATHS } from "./generated/iconPaths";
import { type IconLabel } from "@shared/types/icon";
import { cn } from "@shared/libs/utils";

type IconProps = {
  fill?: string;
  styles?: React.CSSProperties;
  className?: string;
  label: IconLabel;
  size?: number;
};

function isSvgFillValue(value: string) {
  return (
    value === "currentColor" ||
    value === "none" ||
    value.startsWith("#") ||
    value.startsWith("rgb")
  );
}

export const Icon = ({
  fill = "",
  styles = {},
  className = "",
  label,
  size = 24,
}: IconProps) => {
  const iconData = ICON_PATHS[label as keyof typeof ICON_PATHS];

  if (!iconData) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Icon "${label}" not found in ICON_PATHS`);
    }
    return null;
  }

  const fillClassName = fill && !isSvgFillValue(fill) ? fill : undefined;
  const svgFill = fill && isSvgFillValue(fill) ? fill : "currentColor";
  const isStrokeIcon = svgFill === "none";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={iconData.viewBox}
      width={size}
      height={size}
      fill={svgFill}
      stroke={isStrokeIcon ? "currentColor" : undefined}
      strokeWidth={isStrokeIcon ? 2 : undefined}
      strokeLinecap={isStrokeIcon ? "round" : undefined}
      strokeLinejoin={isStrokeIcon ? "round" : undefined}
      className={cn("shrink-0 size-6", className, fillClassName)}
      style={styles}
      aria-hidden
    >
      {iconData.paths.map((pathD, index) => (
        <path key={`${label}-${index}`} d={pathD} />
      ))}
    </svg>
  );
};
