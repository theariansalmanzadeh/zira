import { cn } from "@shared/libs/utils";
const Map = ({
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
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={styles}
      className={cn(className, "text-primary")}
    >
      <mask
        id="mask0_19175_13265"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="36"
        height="36"
      >
        <rect width="36" height="36" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_19175_13265)">
        <path
          d="M22.49 30.6921L13.49 27.5421L7.03437 30.04C6.59212 30.2113 6.18249 30.1622 5.80549 29.893C5.42849 29.6237 5.23999 29.2555 5.23999 28.7882V9.11537C5.23999 8.81912 5.31937 8.55324 5.47812 8.31774C5.63662 8.08224 5.85924 7.91162 6.14599 7.80587L13.49 5.30762L22.49 8.45762L28.9456 5.95974C29.3879 5.78849 29.7975 5.83024 30.1745 6.08499C30.5515 6.33974 30.74 6.69599 30.74 7.15374V26.9421C30.74 27.2479 30.6535 27.5161 30.4805 27.7469C30.3073 27.9776 30.0726 28.1459 29.7766 28.2516L22.49 30.6921ZM21.365 27.9404V10.3904L14.615 8.03049V25.5805L21.365 27.9404ZM23.615 27.9404L28.49 26.3249V8.54987L23.615 10.3904V27.9404ZM7.48999 27.4499L12.365 25.5805V8.03049L7.48999 9.67487V27.4499Z"
          fill={fill || "#141414"}
        />
      </g>
    </svg>
  );
};

export default Map;
