import * as React from "react";
import { cn } from "@shared/libs/utils";
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  styles?: React.CSSProperties;
  className?: string;
  fill?: string;
  size?: number;
}
const Receipt = ({
  styles,
  className,
  fill = "currentColor",
  size = 24,
  ...props
}: IconProps) => {
  return React.cloneElement(<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}><mask id="prefix__a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="#D9D9D9" d="M0 0h24v24H0z" /></mask><g mask="url(#prefix__a)"><path fill="#484649" d="M3.042 21.19V2.423l1.385 1.23 1.423-1.23 1.423 1.23 1.423-1.23 1.423 1.23 1.423-1.23 1.423 1.23 1.423-1.23 1.423 1.23 1.423-1.23 1.423 1.23 1.385-1.23V21.19l-1.385-1.23-1.423 1.23-1.423-1.23-1.423 1.23-1.423-1.23-1.423 1.23-1.423-1.23-1.423 1.23-1.423-1.23-1.423 1.23-1.423-1.23zm2.75-4.941h11.5v-1.5h-11.5zm0-3.693h11.5v-1.5h-11.5zm0-3.692h11.5v-1.5h-11.5zm-1.25 10.042h14v-14.2h-14z" /></g></svg>, {
    className: cn(className),
    style: styles,
    width: size,
    height: size,
    fill,
    ...props
  });
};
export default Receipt;