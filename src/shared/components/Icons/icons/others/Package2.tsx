import * as React from "react";
import { cn } from "@shared/libs/utils";
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  styles?: React.CSSProperties;
  className?: string;
  fill?: string;
  size?: number;
}
const Package2 = ({
  styles,
  className,
  fill = "currentColor",
  size = 24,
  ...props
}: IconProps) => {
  return React.cloneElement(<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}><mask id="prefix__a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="#D9D9D9" d="M0 0h24v24H0z" /></mask><g mask="url(#prefix__a)"><path fill="#787878" d="M11.34 19.492v-7.139L5.09 8.735V15.7q0 .076.038.144a.33.33 0 0 0 .116.115zm1.5 0 6.096-3.533a.33.33 0 0 0 .115-.115.3.3 0 0 0 .039-.144V8.734l-6.25 3.62zm-1.654 1.636-6.692-3.852a1.78 1.78 0 0 1-.904-1.561V8.13a1.77 1.77 0 0 1 .904-1.561l6.692-3.852a1.78 1.78 0 0 1 1.808 0l6.692 3.852a1.78 1.78 0 0 1 .904 1.561v7.585a1.77 1.77 0 0 1-.904 1.561l-6.692 3.852a1.78 1.78 0 0 1-1.808 0m4.76-12.305 2.319-1.331-6.021-3.483a.3.3 0 0 0-.154-.048.3.3 0 0 0-.154.048L9.765 5.26zM12.09 11.06l2.325-1.346-6.175-3.57-2.325 1.347z" /></g></svg>, {
    className: cn(className),
    style: styles,
    width: size,
    height: size,
    fill,
    ...props
  });
};
export default Package2;