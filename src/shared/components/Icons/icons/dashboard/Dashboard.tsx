import { cn } from "@shared/libs/utils";

const Dashboard = ({
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
        id="mask0_19961_272"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_19961_272)">
        <path
          d="M13.25 9V3.5H20.5V9H13.25ZM3.5 12.5V3.5H10.75V12.5H3.5ZM13.25 20.5V11.5H20.5V20.5H13.25ZM3.5 20.5V15H10.75V20.5H3.5ZM5 11H9.25V5H5V11ZM14.75 19H19V13H14.75V19ZM14.75 7.5H19V5H14.75V7.5ZM5 19H9.25V16.5H5V19Z"
          fill={fill || "#3C8B63"}
        />
      </g>
    </svg>
  );
};

export default Dashboard;
