import { cn } from "@shared/libs/utils";

const Hamburger = ({
  styles,
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fill,
}: {
  styles: React.CSSProperties;
  className: string;
  fill?: string;
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={styles}
      className={cn(className, "text-primary")}
    >
      <mask
        id="mask0_19876_2259"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_19876_2259)">
        <path
          d="M3.5 17.6342V16.1345H20.5V17.6342H3.5ZM3.5 12.7497V11.2497H20.5V12.7497H3.5ZM3.5 7.86498V6.36523H20.5V7.86498H3.5Z"
          fill={fill || "#484649"}
        />
      </g>
    </svg>
  );
};

export default Hamburger;
