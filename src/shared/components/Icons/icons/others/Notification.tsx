import * as React from "react";
import { cn } from "@shared/libs/utils";
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  styles?: React.CSSProperties;
  className?: string;
  fill?: string;
  size?: number;
}
const Notification = ({
  styles,
  className,
  fill = "currentColor",
  size = 24,
  ...props
}: IconProps) => {
  return React.cloneElement(<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}><mask id="prefix__a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="#D9D9D9" d="M0 0h24v24H0z" /></mask><g mask="url(#prefix__a)"><path fill="#484649" d="M4.5 18.885v-1.5h1.808V9.923q0-2.017 1.245-3.567a5.52 5.52 0 0 1 3.197-1.983V3.75q0-.52.364-.885Q11.48 2.5 12 2.5t.885.365.366.885v.623a5.52 5.52 0 0 1 3.197 1.983q1.245 1.55 1.245 3.567v7.462H19.5v1.5zm7.498 2.807q-.746 0-1.276-.53a1.74 1.74 0 0 1-.53-1.277h3.616q0 .747-.532 1.277-.531.53-1.278.53m-4.19-4.307h8.384V9.923q0-1.737-1.228-2.964Q13.737 5.73 12 5.73T9.036 6.959Q7.808 8.186 7.808 9.923z" /></g></svg>, {
    className: cn(className),
    style: styles,
    width: size,
    height: size,
    fill,
    ...props
  });
};
export default Notification;