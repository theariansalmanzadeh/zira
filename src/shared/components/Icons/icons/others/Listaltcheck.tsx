import * as React from "react";
import { cn } from "@shared/libs/utils";
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  styles?: React.CSSProperties;
  className?: string;
  fill?: string;
  size?: number;
}
const Listaltcheck = ({
  styles,
  className,
  fill = "currentColor",
  size = 24,
  ...props
}: IconProps) => {
  return React.cloneElement(<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}><mask id="prefix__a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="#D9D9D9" d="M0 0h24v24H0z" /></mask><g mask="url(#prefix__a)"><path fill="#787878" d="M5.293 19.203v-14 11.292-2.076zm.308 1.5q-.758 0-1.283-.525a1.75 1.75 0 0 1-.525-1.283V5.511q0-.758.525-1.283t1.283-.525h13.384q.758 0 1.283.525t.525 1.283v7.98h-1.5v-7.98a.3.3 0 0 0-.096-.212.3.3 0 0 0-.212-.096H5.601a.3.3 0 0 0-.212.096.3.3 0 0 0-.096.212v13.384q0 .116.096.212a.3.3 0 0 0 .212.096h6.673v1.5zm11.994 1-3.146-3.136 1.069-1.054 2.077 2.077 4.154-4.154 1.053 1.07zm-9.244-8.615a.86.86 0 0 0 .63-.254q.255-.255.254-.63a.86.86 0 0 0-.254-.632.86.86 0 0 0-.63-.253.86.86 0 0 0-.631.253.86.86 0 0 0-.254.631q0 .378.254.63.255.255.63.255m0-3.885a.86.86 0 0 0 .63-.254q.255-.254.254-.63a.86.86 0 0 0-.254-.631.86.86 0 0 0-.63-.254.86.86 0 0 0-.631.254.86.86 0 0 0-.254.63q0 .378.254.631.255.255.63.254m3.038 3.75h5.692v-1.5H11.39zm0-3.885h5.692v-1.5H11.39z" /></g></svg>, {
    className: cn(className),
    style: styles,
    width: size,
    height: size,
    fill,
    ...props
  });
};
export default Listaltcheck;