import { cn } from "@shared/libs/utils";

const Chavaron = ({
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
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={styles}
        >
            <mask
                id="mask0_21137_1409"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
            >
                <rect width="24" height="24" fill={"#D9D9D9"} />
            </mask>
            <g mask="url(#mask0_21137_1409)">
                <path
                    d="M14.0004 17.6537L8.34668 11.9999L14.0004 6.34619L15.0542 7.39994L10.4542 11.9999L15.0542 16.5999L14.0004 17.6537Z"
                    fill={fill || "#484649"}
                    className={className}
                />
            </g>
        </svg>
    );
};

export default Chavaron;
