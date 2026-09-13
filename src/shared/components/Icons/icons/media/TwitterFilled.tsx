import { cn } from "@shared/libs/utils";

const TwitterFilled = ({
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
        d="M26.8955 10H30.4284L22.71 18.8217L31.7901 30.826H24.6804L19.1119 23.5455L12.7402 30.826H9.20509L17.4607 21.3902L8.75012 10H16.0403L21.0738 16.6547L26.8955 10ZM25.6555 28.7114H27.6132L14.9766 12.0036H12.8758L25.6555 28.7114Z"
        fill="#F2F2F2"
      />
    </svg>
  );
};

export default TwitterFilled;
