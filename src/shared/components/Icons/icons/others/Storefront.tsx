import * as React from "react";
import { cn } from "@shared/libs/utils";
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  styles?: React.CSSProperties;
  className?: string;
  fill?: string;
  size?: number;
}
const Storefront = ({
  styles,
  className,
  fill = "currentColor",
  size = 24,
  ...props
}: IconProps) => {
  return React.cloneElement(<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}><mask id="prefix__a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="#D9D9D9" d="M0 0h24v24H0z" /></mask><g mask="url(#prefix__a)"><path fill="#787878" d="M20.764 10.973v7.97q0 .756-.525 1.282-.525.525-1.282.525H5.072q-.757 0-1.282-.525a1.75 1.75 0 0 1-.525-1.283v-7.988a3.03 3.03 0 0 1-.907-1.288q-.303-.791-.013-1.708l1.012-3.304q.2-.63.679-1.018.478-.386 1.144-.386h13.65q.666 0 1.136.37.471.368.687 1.015l1.03 3.323q.291.917-.012 1.703a3.3 3.3 0 0 1-.907 1.312m-6.55-.723q.82 0 1.232-.501t.338-1.076l-.608-3.923h-2.412V8.7q0 .63.427 1.09t1.024.46m-4.5 0q.69 0 1.12-.46t.43-1.09V4.75H8.854l-.608 3.961q-.08.533.335 1.036t1.135.503m-4.45 0q.557 0 .956-.387a1.7 1.7 0 0 0 .495-.974l.588-4.139H5.18a.42.42 0 0 0-.26.072.43.43 0 0 0-.144.216l-.962 3.254q-.198.644.187 1.301t1.264.657m13.5 0q.813 0 1.243-.637.43-.638.208-1.32l-1.012-3.274a.38.38 0 0 0-.144-.207.47.47 0 0 0-.26-.062h-2.073l.588 4.139q.095.585.495.974.4.387.956.387m-13.692 9h13.885q.135 0 .22-.087a.3.3 0 0 0 .088-.22V11.66a1.3 1.3 0 0 1-.5.089 2.7 2.7 0 0 1-1.188-.244q-.513-.244-.993-.783-.421.47-.996.748a3 3 0 0 1-1.312.279 2.8 2.8 0 0 1-1.2-.264 3.8 3.8 0 0 1-1.061-.763 3.25 3.25 0 0 1-1.05.762 2.9 2.9 0 0 1-1.189.265q-.676 0-1.27-.245a2.7 2.7 0 0 1-1.041-.782q-.632.63-1.163.829a3 3 0 0 1-1.037.198q-.119 0-.243-.014a.9.9 0 0 1-.258-.075v7.281a.3.3 0 0 0 .087.221.3.3 0 0 0 .221.087" /></g></svg>, {
    className: cn(className),
    style: styles,
    width: size,
    height: size,
    fill,
    ...props
  });
};
export default Storefront;