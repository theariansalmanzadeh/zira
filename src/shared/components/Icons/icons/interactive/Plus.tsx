import { cn } from "@shared/libs/utils";

const Plus = ({
  styles,
  className,
  fill,
}: {
  styles: React.CSSProperties;
  className: string;
  fill?: string;
}) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={styles}
      className={cn(className, "text-primary")}
    >
      <mask
        id="mask0_19458_13253"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="28"
        height="28"
      >
        <rect width="28" height="28" fill={fill || "#D9D9D9"} />
      </mask>
      <g mask="url(#mask0_19458_13253)">
        <path
          d="M13.1251 14.8751H6.41675L6.41675 13.1251H13.1251V6.41675L14.8751 6.41675V13.1251H21.5834V14.8751H14.8751V21.5834H13.1251V14.8751Z"
          fill={fill || "#141414"}
        />
      </g>
    </svg>
  );
};

export default Plus;
