import { cn } from "@shared/libs/utils";

const RightArrow = ({
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
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={styles}
      className={cn("text-primary", className)}
    >
      <g clipPath="url(#clip0_19876_3002)">
        <mask
          id="mask0_19876_3002"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="20"
          height="20"
        >
          <rect width="20" height="20" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_19876_3002)">
          <path
            d="M3.64575 9.375H13.7516L9.00471 4.62813L9.89575 3.75L16.1458 10L9.89575 16.25L9.00471 15.3719L13.7516 10.625H3.64575V9.375Z"
            fill={fill || "#484649"}
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_19876_3002">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RightArrow;
