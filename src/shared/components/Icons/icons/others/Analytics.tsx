import * as React from "react";
import { cn } from "@shared/libs/utils";
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  styles?: React.CSSProperties;
  className?: string;
  fill?: string;
  size?: number;
}
const Analytics = ({
  styles,
  className,
  fill = "currentColor",
  size = 24,
  ...props
}: IconProps) => {
  return React.cloneElement(<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}><mask id="prefix__a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="#D9D9D9" d="M0 0h24v24H0z" /></mask><g mask="url(#prefix__a)"><path fill="#787878" d="M7.658 16.953h1.5v-6.5h-1.5zm3.885 0h1.5v-9.5h-1.5zm3.885 0h1.5v-3.5h-1.5zM5.6 20.703q-.758 0-1.283-.525a1.75 1.75 0 0 1-.525-1.283V5.511q0-.758.525-1.283t1.283-.525h13.384q.758 0 1.283.525t.525 1.283v13.384q0 .759-.525 1.283-.525.525-1.283.525zm0-1.5h13.384a.3.3 0 0 0 .212-.096.3.3 0 0 0 .096-.212V5.511a.3.3 0 0 0-.096-.212.3.3 0 0 0-.212-.096H5.601a.3.3 0 0 0-.212.096.3.3 0 0 0-.096.212v13.384q0 .116.096.212a.3.3 0 0 0 .212.096" /></g></svg>, {
    className: cn(className),
    style: styles,
    width: size,
    height: size,
    fill,
    ...props
  });
};
export default Analytics;