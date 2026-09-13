import { cn } from "@shared/libs/utils";

const Sort = ({
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
            className={cn(className, "text-primary")}
        >
            <g clipPath="url(#clip0_21137_1131)">
                <mask
                    id="mask0_21137_1131"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                >
                    <rect width="20" height="20" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_21137_1131)">
                    <path
                        d="M8.56107 14.7329V13.4829H11.4217V14.7329H8.56107ZM5.33211 10.7745V9.52454H14.6509V10.7745H5.33211ZM2.91211 6.8162V5.5662H17.0788V6.8162H2.91211Z"
                        fill="#484649"
                    />
                </g>
            </g>
            <defs>
                <clipPath id="clip0_21137_1131">
                    <rect width="20" height="20" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default Sort;
