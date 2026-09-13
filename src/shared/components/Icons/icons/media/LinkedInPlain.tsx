import { cn } from "@shared/libs/utils";

const LinkedInPlain = ({
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
        d="M0 12C0 5.37258 5.37258 0 12 0H28C34.6274 0 40 5.37258 40 12V28C40 34.6274 34.6274 40 28 40H12C5.37258 40 0 34.6274 0 28V12Z"
        fill="#292929"
      />
      <path
        d="M14.7948 30.2052V16.572H10.2674V30.2052H14.7953H14.7948ZM12.532 14.7109C14.1105 14.7109 15.0932 13.6641 15.0932 12.3558C15.0637 11.0177 14.1105 10 12.562 10C11.0125 10 10.0005 11.0177 10.0005 12.3556C10.0005 13.6639 10.9828 14.7108 12.5024 14.7108H12.5317L12.532 14.7109ZM17.3008 30.2052H21.8279V22.5926C21.8279 22.1857 21.8575 21.7777 21.9771 21.4871C22.3042 20.6727 23.0491 19.8296 24.3001 19.8296C25.9379 19.8296 26.5935 21.0797 26.5935 22.9126V30.2052H31.1205V22.3883C31.1205 18.201 28.8873 16.2524 25.9086 16.2524C23.4666 16.2524 22.394 17.6185 21.7981 18.549H21.8283V16.5725H17.301C17.3601 17.8514 17.3007 30.2057 17.3007 30.2057L17.3008 30.2052Z"
        fill="#F2F2F2"
      />
    </svg>
  );
};

export default LinkedInPlain;
