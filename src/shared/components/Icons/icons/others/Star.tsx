import { cn } from "@shared/libs/utils";
const Star = ({
  styles,
  className,
  fill,
}: {
  styles: React.CSSProperties;
  className: string;
  fill?: string;
}) => {
  const fillClassName = fill ? fill : "";
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={styles}
      className={cn("text-primary", className)}
    >
      <mask
        id="mask0_19466_659"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="32"
      >
        <rect width="32" height="32" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_19466_659)">
        <path
          d="M14.6667 28V19.2L8.46667 25.4333L6.56667 23.5333L12.8 17.3333H4V14.6667H12.8L6.56667 8.46667L8.46667 6.56667L14.6667 12.8V4H17.3333V12.8L23.5333 6.56667L25.4333 8.46667L19.2 14.6667H28V17.3333H19.2L25.4333 23.5333L23.5333 25.4333L17.3333 19.2V28H14.6667Z"
          fill={fill || "#3C8B63"}
          className={fillClassName}
        />
      </g>
    </svg>
  );
};

export default Star;
