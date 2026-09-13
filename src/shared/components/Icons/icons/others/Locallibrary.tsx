import * as React from "react";
import { cn } from "@shared/libs/utils";
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  styles?: React.CSSProperties;
  className?: string;
  fill?: string;
  size?: number;
}
const Locallibrary = ({
  styles,
  className,
  fill = "currentColor",
  size = 24,
  ...props
}: IconProps) => {
  return React.cloneElement(<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}><mask id="prefix__a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="#D9D9D9" d="M0 0h24v24H0z" /></mask><g mask="url(#prefix__a)"><path fill="#787878" d="M12.293 22.012a13 13 0 0 0-3.923-2.384 13.8 13.8 0 0 0-4.577-.924V8.531a12.5 12.5 0 0 1 4.605 1.004 13.5 13.5 0 0 1 3.895 2.508 13.5 13.5 0 0 1 3.895-2.508 12.5 12.5 0 0 1 4.605-1.004v10.173q-2.412.077-4.585.924a13 13 0 0 0-3.915 2.384m0-1.927q1.575-1.165 3.35-1.87t3.65-.93v-7.092a11.8 11.8 0 0 0-3.664 1.288q-1.773.963-3.336 2.527-1.563-1.564-3.336-2.527a11.8 11.8 0 0 0-3.664-1.288v7.092q1.875.225 3.65.93a14.8 14.8 0 0 1 3.35 1.87m0-11.093q-1.491 0-2.553-1.062T8.678 5.377 9.74 2.824t2.553-1.062 2.553 1.062 1.062 2.553-1.062 2.553-2.553 1.062m0-1.5q.873 0 1.494-.621t.621-1.494-.621-1.494a2.04 2.04 0 0 0-1.494-.621q-.873 0-1.494.621a2.04 2.04 0 0 0-.621 1.494q0 .873.621 1.494t1.494.621" /></g></svg>, {
    className: cn(className),
    style: styles,
    width: size,
    height: size,
    fill,
    ...props
  });
};
export default Locallibrary;