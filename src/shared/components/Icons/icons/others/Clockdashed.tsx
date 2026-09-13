import { cn } from "@/src/shared/libs/utils";
import * as React from "react";
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  styles?: React.CSSProperties;
  className?: string;
  fill?: string;
  size?: number;
}
const Clockdashed = ({
  styles,
  className,
  fill = "currentColor",
  size = 24,
  ...props
}: IconProps) => {
  return React.cloneElement(<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}><mask id="prefix__a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="#D9D9D9" d="M0 0h24v24H0z" /></mask><g mask="url(#prefix__a)"><path fill="#141414" d="m15.3 16.345-4.05-4.05V7.25h1.5v4.455l3.595 3.595zM3.4 16.047a8.7 8.7 0 0 1-.588-1.606 10 10 0 0 1-.28-1.69h1.516q.065.66.236 1.3.172.64.448 1.246zM2.53 11.25a9.6 9.6 0 0 1 .285-1.698q.22-.84.608-1.624l1.307.75A7 7 0 0 0 4.28 9.93a8.6 8.6 0 0 0-.232 1.32zm4.106 8.592a10 10 0 0 1-1.356-1.136q-.623-.626-1.132-1.358l1.307-.76a8 8 0 0 0 1.931 1.93zM5.481 7.387l-1.332-.75q.51-.733 1.132-1.351.624-.618 1.356-1.128l.75 1.323a8.5 8.5 0 0 0-1.906 1.906m5.77 14.083a9.6 9.6 0 0 1-1.698-.285 8.4 8.4 0 0 1-1.624-.607l.75-1.308q.606.286 1.251.453.645.166 1.32.231zM8.679 4.73l-.75-1.307a8.4 8.4 0 0 1 1.624-.608 9.6 9.6 0 0 1 1.697-.285v1.516q-.675.064-1.32.232a7 7 0 0 0-1.25.452m4.072 16.739v-1.516q.675-.064 1.32-.232.645-.165 1.25-.452l.75 1.308a8.4 8.4 0 0 1-1.623.607 9.6 9.6 0 0 1-1.697.285M15.32 4.73a7 7 0 0 0-1.25-.452 8.6 8.6 0 0 0-1.32-.232V2.53a9.6 9.6 0 0 1 1.697.285q.84.22 1.624.608zm2.043 15.112-.75-1.323a8.5 8.5 0 0 0 1.906-1.906l1.323.75q-.51.732-1.128 1.358-.619.627-1.351 1.12M18.52 7.378a8 8 0 0 0-.877-1.024 9 9 0 0 0-1.029-.873l.75-1.323q.732.495 1.351 1.108.618.614 1.113 1.346zm1.434 3.873a8 8 0 0 0-.236-1.32 7.6 7.6 0 0 0-.458-1.261l1.317-.766q.375.799.6 1.639.228.84.293 1.708zm.624 4.82-1.308-.75q.286-.605.453-1.25.166-.645.231-1.32h1.516a9.6 9.6 0 0 1-.285 1.697 8.4 8.4 0 0 1-.607 1.624" /></g></svg>, {
    className: cn(className),
    style: styles,
    width: size,
    height: size,
    fill,
    ...props
  });
};
export default Clockdashed;