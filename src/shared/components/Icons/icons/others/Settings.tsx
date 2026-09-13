import * as React from "react";
import { cn } from "@shared/libs/utils";
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  styles?: React.CSSProperties;
  className?: string;
  fill?: string;
  size?: number;
}
const Settings = ({
  styles,
  className,
  fill = "currentColor",
  size = 24,
  ...props
}: IconProps) => {
  return React.cloneElement(<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}><mask id="prefix__a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="#D9D9D9" d="M0 0h24v24H0z" /></mask><g mask="url(#prefix__a)"><path fill="#787878" d="m9.694 21.5-.381-3.046a5.333 5.333 0 0 1-1.579-.896L4.913 18.75l-2.308-4 2.44-1.844a5 5 0 0 1-.048-.448 7 7 0 0 1 0-.882q.015-.22.049-.482L2.606 9.25l2.307-3.98 2.811 1.182a6.4 6.4 0 0 1 .773-.524 5 5 0 0 1 .806-.382l.39-3.046h4.616l.381 3.056q.45.163.814.381.365.218.736.515l2.85-1.183 2.308 3.981-2.48 1.873q.055.243.06.453t.004.424q0 .204-.01.415-.009.21-.069.481l2.46 1.854-2.308 4-2.815-1.202q-.37.296-.758.524a4.6 4.6 0 0 1-.792.372l-.38 3.056zM11 20h1.966l.36-2.679a5.6 5.6 0 0 0 1.399-.568q.634-.369 1.222-.947l2.484 1.044.985-1.7-2.17-1.635q.126-.387.17-.761a6.3 6.3 0 0 0 0-1.508 4 4 0 0 0-.17-.742l2.189-1.654-.985-1.7-2.513 1.06a5.3 5.3 0 0 0-1.203-.949 5.2 5.2 0 0 0-1.418-.582L13.001 4h-1.984l-.331 2.67a5.2 5.2 0 0 0-1.413.553q-.649.374-1.237.962L5.551 7.15l-.984 1.7 2.16 1.61a3.7 3.7 0 0 0-.176.74 6.3 6.3 0 0 0 0 1.575q.05.375.166.74l-2.15 1.635.984 1.7 2.475-1.05q.57.585 1.218.958t1.433.573zm1.012-5q1.248 0 2.124-.876A2.9 2.9 0 0 0 15.013 12q0-1.248-.876-2.124A2.9 2.9 0 0 0 12.013 9q-1.263 0-2.132.876A2.9 2.9 0 0 0 9.013 12q0 1.248.868 2.124.87.876 2.132.876" /></g></svg>, {
    className: cn(className),
    style: styles,
    width: size,
    height: size,
    fill,
    ...props
  });
};
export default Settings;