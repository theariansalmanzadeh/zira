import { cn } from "@shared/libs/utils";

const Google = ({
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
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={styles}
      className={cn(className, "text-primary")}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.3335 8.52248C16.3335 7.93157 16.2805 7.36339 16.182 6.81793H8.3335V10.0414H12.8183C12.6252 11.0831 12.038 11.9657 11.1555 12.5566V14.6475H13.8486C15.4244 13.1967 16.3335 11.0604 16.3335 8.52248Z"
        fill="#4285F4"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.3332 16.6664C10.5832 16.6664 12.4696 15.9202 13.8484 14.6474L11.1552 12.5565C10.409 13.0565 9.45441 13.352 8.3332 13.352C6.16275 13.352 4.32562 11.8861 3.67032 9.91638H0.88623V12.0755C2.25744 14.799 5.07562 16.6664 8.3332 16.6664Z"
        fill="#34A853"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.67045 9.91731C3.50379 9.41731 3.40909 8.88322 3.40909 8.33398C3.40909 7.78473 3.50379 7.25064 3.67045 6.75064V4.59155H0.886364C0.32197 5.71655 0 6.98928 0 8.33398C0 9.67867 0.32197 10.9514 0.886364 12.0764L3.67045 9.91731Z"
        fill="#FBBC05"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.3332 3.31439C9.55669 3.31439 10.6552 3.73485 11.5188 4.56061L13.909 2.17045C12.4658 0.825757 10.5794 0 8.3332 0C5.07562 0 2.25744 1.86742 0.88623 4.59091L3.67032 6.75C4.32562 4.7803 6.16275 3.31439 8.3332 3.31439Z"
        fill="#EA4335"
      />
    </svg>
  );
};

export default Google;
