import { cn } from "@shared/libs/utils";

const YoutubePlain = ({
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
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={styles}
      className={cn(className, "text-primary")}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.94 13.9849C31.6541 12.91 30.8083 12.0621 29.7322 11.7715C27.7866 11.25 19.9801 11.25 19.9801 11.25C19.9801 11.25 12.1776 11.25 10.228 11.7715C9.15592 12.0581 8.31015 12.906 8.02029 13.9849C7.50012 15.9355 7.50012 20.0079 7.50012 20.0079C7.50012 20.0079 7.50012 24.0803 8.02029 26.0309C8.30618 27.1058 9.15195 27.9537 10.228 28.2443C12.1776 28.7658 19.9801 28.7658 19.9801 28.7658C19.9801 28.7658 27.7866 28.7658 29.7322 28.2443C30.8043 27.9577 31.6501 27.1098 31.94 26.0309C32.4601 24.0803 32.4601 20.0079 32.4601 20.0079C32.4601 20.0079 32.4601 15.9355 31.94 13.9849ZM23.9707 20.0079L17.4865 23.7618V16.2539L23.9707 20.0079Z"
        fill="#141414"
      />
    </svg>
  );
};

export default YoutubePlain;
